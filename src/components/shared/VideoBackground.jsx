import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Volume1, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoBackground = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [isHovered, setIsHovered] = useState(false);
  const [isVfxOn, setIsVfxOn] = useState(true);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationFrameRef = useRef(null);

  // VFX State refs to prevent re-renders in the loop
  const particlesRef = useRef([]);
  const cellsRef = useRef([]);
  const symbols = ['$', '€', '£', '¥', '₩', '₽', '₿'];
  const brandingChars = 'LUCTHELEO'.split('');

  // Initialize Audio Context on first interaction
  const initAudio = useCallback(() => {
    if (audioCtxRef.current || !videoRef.current) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtxRef.current = new AudioContext();
    analyserRef.current = audioCtxRef.current.createAnalyser();
    sourceRef.current = audioCtxRef.current.createMediaElementSource(videoRef.current);

    sourceRef.current.connect(analyserRef.current);
    analyserRef.current.connect(audioCtxRef.current.destination);
    analyserRef.current.fftSize = 256;

    // Pre-populate cells for "Lifelines" effect
    cellsRef.current = Array.from({ length: 15 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      char: brandingChars[Math.floor(Math.random() * brandingChars.length)],
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
  }, []);

  const draw = useCallback(() => {
    if (!canvasRef.current || !analyserRef.current) {
      animationFrameRef.current = requestAnimationFrame(draw);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;

    animationFrameRef.current = requestAnimationFrame(draw);

    if (!isVfxOn) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // --- PROCESS AUDIO DATA ---
    const freqData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqData);

    // 1. KICK DETECTION (Low Bass)
    const kickRange = freqData.slice(0, 2);
    const avgKick = kickRange.reduce((a, b) => a + b, 0) / (kickRange.length || 1);
    const kickThreshold = 140;
    const kickBoost = avgKick > kickThreshold ? (avgKick - kickThreshold) / (255 - kickThreshold) : 0;
    const normalizedKick = Math.min(1.0, kickBoost * 2.0);

    // 2. SNARE/SNAP DETECTION (Mid-High transients)
    const snareRange = freqData.slice(15, 35);
    const avgSnare = snareRange.reduce((a, b) => a + b, 0) / (snareRange.length || 1);
    const snareThreshold = 110;
    const snareBoost = avgSnare > snareThreshold ? (avgSnare - snareThreshold) / (255 - snareThreshold) : 0;
    const normalizedSnare = Math.min(1.0, snareBoost * 2.0);

    // Clear with slightly higher trail for "phantom" feel
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // --- DRAW BACKGROUND VISUALIZER (Static Electricity Lifelines) ---
    // Reactive primarily to the KICK
    if (normalizedKick > 0.05) {
      const jitter = normalizedKick * 12;
      ctx.lineWidth = 0.2;
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + normalizedKick * 0.4})`;

      ctx.beginPath();
      for (let i = 0; i < cellsRef.current.length; i++) {
        const cell = cellsRef.current[i];
        const jX = (Math.random() - 0.5) * jitter;
        const jY = (Math.random() - 0.5) * jitter;

        cell.x += cell.vx * (1 + normalizedKick * 15);
        cell.y += cell.vy * (1 + normalizedKick * 15);

        if (cell.x < 0 || cell.x > canvas.width) cell.vx *= -1;
        if (cell.y < 0 || cell.y > canvas.height) cell.vy *= -1;

        if (i > 0) {
          ctx.lineTo(cell.x + jX, cell.y + jY);
        } else {
          ctx.moveTo(cell.x + jX, cell.y + jY);
        }
      }

      if (normalizedKick > 0.5 && Math.random() > 0.7) {
        const r1 = Math.floor(Math.random() * cellsRef.current.length);
        const r2 = Math.floor(Math.random() * cellsRef.current.length);
        ctx.moveTo(cellsRef.current[r1].x, cellsRef.current[r1].y);
        ctx.lineTo(cellsRef.current[r2].x, cellsRef.current[r2].y);
      }
      ctx.stroke();
    }

    // --- DRAW GLITCH CHARACTERS ---
    // Reactive primarily to the SNARE / SNAP
    cellsRef.current.forEach(cell => {
      if (normalizedSnare > 0.5 && Math.random() < normalizedSnare * 0.15) {
        cell.x = Math.random() * canvas.width;
        cell.y = Math.random() * canvas.height;
      }

      const intensity = Math.max(normalizedSnare, normalizedKick);
      const visibilityChance = 0.1 + intensity * 0.8;

      if (Math.random() < visibilityChance) {
        let brightness = 0.1 + intensity * 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.8, brightness)})`;
        ctx.font = `${14 + normalizedSnare * 10}px 'Roboto Mono', monospace`;

        const beatJitter = intensity * 12;
        const gX = (Math.random() - 0.5) * beatJitter;
        const gY = (Math.random() - 0.5) * beatJitter;

        ctx.fillText(cell.char, cell.x + gX, cell.y + gY);

        if (normalizedSnare > 0.7 && Math.random() > 0.9) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.fillText(cell.char, cell.x + (Math.random() - 0.5) * 40, cell.y + (Math.random() - 0.5) * 15);
        }
      }
    });

  }, [isVfxOn]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [draw]);

  // Sync state with video element on change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = volume;
    }
  }, [isMuted, volume]);

  const toggleMute = (e) => {
    e.preventDefault();
    e.stopPropagation();
    initAudio();
    setIsMuted(!isMuted);
  };

  const toggleVfx = (e) => {
    e.preventDefault();
    e.stopPropagation();
    initAudio();
    setIsVfxOn(!isVfxOn);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    initAudio();
    if (newVolume > 0) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  };

  return (
    <>
      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 -z-[10] w-full h-full overflow-hidden pointer-events-none bg-black">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.3)_0%,_rgba(0,0,0,0.85)_100%)] z-20" />

        {/* Visualizer Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-[15] mix-blend-screen"
        />

        {/* Video Element */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-10"
        >
          <source src="/images/RVR-1.mp4" type="video/mp4" />
        </video>
      </div>

      {/* CONTROLS LAYER */}
      <div
        className="fixed bottom-8 right-8 z-[9999] flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 p-2.5 rounded-full shadow-2xl transition-all duration-500 hover:bg-white/20 hover:scale-105 active:scale-95 cursor-pointer group">
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ width: 0, opacity: 0, marginRight: 0 }}
                animate={{ width: 140, opacity: 1, marginRight: 12 }}
                exit={{ width: 0, opacity: 0, marginRight: 0 }}
                className="overflow-hidden flex items-center gap-4 h-full"
              >
                {/* VFX Toggle */}
                <button
                  onClick={toggleVfx}
                  className={`p-2 rounded-full transition-all duration-300 ${isVfxOn ? 'text-white' : 'text-white/40'}`}
                  title="Toggle Visualizer"
                >
                  <Sparkles size={20} className={isVfxOn ? 'animate-pulse' : ''} />
                </button>

                {/* Volume Slider */}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer accent-white transition-opacity border-none focus:outline-none"
                  style={{
                    backgroundImage: `linear-gradient(to right, white ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="flex items-center justify-center p-2 rounded-full text-white bg-transparent outline-none ring-0 focus:outline-none transition-transform"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={24} strokeWidth={2.5} />
            ) : volume < 0.5 ? (
              <Volume1 size={24} strokeWidth={2.5} />
            ) : (
              <Volume2 size={24} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoBackground;
