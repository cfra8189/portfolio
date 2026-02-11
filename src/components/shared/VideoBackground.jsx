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

    // Pre-populate cells for "Lifelines" effect (max 30 for performance)
    cellsRef.current = Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      char: brandingChars[Math.floor(Math.random() * brandingChars.length)],
      vx: (Math.random() - 0.5) * 0.3,  // Slower base speed
      vy: (Math.random() - 0.5) * 0.3,
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

    // 1. KICK DETECTION (Low Bass) - For tracking lines (more sensitive)
    const kickRange = freqData.slice(0, 4);
    const avgKick = kickRange.reduce((a, b) => a + b, 0) / (kickRange.length || 1);
    const kickThreshold = 120;
    const kickBoost = avgKick > kickThreshold ? (avgKick - kickThreshold) / (255 - kickThreshold) : 0;
    const normalizedKick = Math.min(1.0, kickBoost * 2.5);

    // 2. SNARE/SNAP DETECTION (Mid-High transients) - For text characters (more sensitive)
    const snareRange = freqData.slice(15, 40);
    const avgSnare = snareRange.reduce((a, b) => a + b, 0) / (snareRange.length || 1);
    const snareThreshold = 90;
    const snareBoost = avgSnare > snareThreshold ? (avgSnare - snareThreshold) / (255 - snareThreshold) : 0;
    const normalizedSnare = Math.min(1.0, snareBoost * 2.5);

    // Fade out previous frame for trailing effect (slower fade for smoother feel)
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // --- FILM GRAIN (Silent Film Effect - Optimized) ---
    const grainCount = 1000; // Fixed count for consistent performance
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let i = 0; i < grainCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.fillRect(x, y, 1, 1);
    }

    // Update cell positions with occasional glitches (reduced frequency)
    cellsRef.current.forEach((cell) => {
      // Rare random glitch teleportation (more subtle)
      if (Math.random() < 0.015) {  // Reduced from 5% to 1.5%
        cell.x = Math.random() * canvas.width;
        cell.y = Math.random() * canvas.height;
      } else {
        cell.x += cell.vx;
        cell.y += cell.vy;
      }

      // Bounce at boundaries
      if (cell.x < 0 || cell.x > canvas.width) cell.vx *= -1;
      if (cell.y < 0 || cell.y > canvas.height) cell.vy *= -1;
    });

    // --- THIN FAINT TRACKING LINES (Bass/Kick Reactive) ---
    if (normalizedKick > 0.03) {
      const lineOpacity = 0.05 + normalizedKick * 0.15;  // Much fainter
      const connectionCount = Math.min(20, Math.floor(3 + normalizedKick * 15));

      ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
      ctx.lineWidth = 0.5 + normalizedKick * 1;
      ctx.shadowBlur = 0;

      for (let i = 0; i < connectionCount; i++) {
        const c1 = cellsRef.current[Math.floor(Math.random() * cellsRef.current.length)];
        const c2 = cellsRef.current[Math.floor(Math.random() * cellsRef.current.length)];

        const dist = Math.hypot(c2.x - c1.x, c2.y - c1.y);
        if (dist < 350) {
          ctx.beginPath();
          ctx.moveTo(c1.x, c1.y);
          ctx.lineTo(c2.x, c2.y);
          ctx.stroke();
        }
      }
    }

    // --- WHITE TEXT CHARACTERS (Snare/Snap Reactive) ---
    cellsRef.current.forEach((cell) => {
      // Characters respond to snare/snap with glitchy appearance
      if (normalizedSnare > 0.1) {
        const snareIntensity = normalizedSnare;

        // Glitch effect: musical teleportation on strong snares (less chaotic)
        if (snareIntensity > 0.5 && Math.random() < snareIntensity * 0.15) {
          cell.x = Math.random() * canvas.width;
          cell.y = Math.random() * canvas.height;
        }

        const size = 14 + snareIntensity * 8;
        const opacity = 0.4 + snareIntensity * 0.6;

        // Very subtle glow
        ctx.shadowBlur = 5 + snareIntensity * 10;
        ctx.shadowColor = `rgba(255, 255, 255, ${snareIntensity * 0.4})`;

        // White character
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.font = `${size}px 'Roboto Mono', monospace`;
        ctx.fillText(cell.char, cell.x, cell.y);

        // Random glitch duplicates
        if (snareIntensity > 0.7 && Math.random() < 0.2) {
          const offsetX = (Math.random() - 0.5) * 50;
          const offsetY = (Math.random() - 0.5) * 30;
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
          ctx.fillText(cell.char, cell.x + offsetX, cell.y + offsetY);
        }
      }
    });

    ctx.shadowBlur = 0;

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
          style={{
            opacity: 0.35,
            filter: 'blur(8px) grayscale(0.4) brightness(0.8) contrast(0.9)',
            transform: 'scale(1.1)'
          }}
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
