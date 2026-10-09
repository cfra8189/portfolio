import { useEffect, useRef, useState } from 'react';

const ltlBase = String(import.meta.env.VITE_LUCTHELEO_URL || 'https://luctheleo.com').replace(/\/+$/, '');
const legacyUrl = import.meta.env.VITE_LUCTHELEO_LEGACY_URL || 'https://legacy.luctheleo.com/';

const destinations = [
  ['HOME', 'DESTINATION HUB', '/'],
  ['LUCTHELEO PORTFOLIO', 'INTERNAL PROJECT INDEX', '/portfolio'],
  ['SKIALGIA', 'EXPERIMENTAL CREATIVE WORLD', '/skialgia'],
  ['ABOUT', 'CLARENCE FRANKLIN', '/about'],
  ['CONTACT', 'DIRECT INTAKE', '/consult'],
];

export default function LtlSystemNav() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector('a')?.focus();
    const handleKey = (event) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      requestAnimationFrame(() => triggerRef.current?.focus());
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  return <>
    <button ref={triggerRef} type="button" className="ltl-external-system-trigger" aria-expanded={open} aria-controls="ltl-external-system" onClick={() => setOpen((value) => !value)}>
      <span aria-hidden="true" />{open ? 'CLOSE' : 'SYSTEM'}
    </button>
    {open && <div className="ltl-external-system-overlay" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
      <nav ref={panelRef} id="ltl-external-system" aria-label="LUCTHELEO workspaces">
        <header><span>LUCTHELEO</span><span>NAVIGATE</span></header>
        {destinations.map(([label, note, path], index) => <a key={path} href={`${ltlBase}${path}`}>
          <span>{String(index + 1).padStart(2, '0')}</span><span><strong>{label}</strong><small>{note}</small></span>
        </a>)}
        <a href={legacyUrl}><span>06</span><span><strong>CIRCA 25</strong><small>PREVIOUS SITE</small></span></a>
        <div className="ltl-external-system-current"><span>07</span><span><strong>EXTERNAL PORTFOLIO</strong><small>CURRENT</small></span></div>
      </nav>
    </div>}
  </>;
}
