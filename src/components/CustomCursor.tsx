import { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'pointer' | 'inspect'>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };
    let rafId = 0;

    const handleMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) setVisible(true);

      const el = (e.target as HTMLElement | null)?.closest('[data-cursor]') as HTMLElement | null;
      const interactive = (e.target as HTMLElement | null)?.closest('a, button, [role="button"], input, select, textarea');

      if (el) {
        const mode = el.getAttribute('data-cursor') || 'EXPLORE';
        setCursorLabel(mode);
        setCursorVariant('inspect');
      } else if (interactive) {
        setCursorLabel('');
        setCursorVariant('pointer');
      } else {
        setCursorLabel('');
        setCursorVariant('default');
      }
    };

    const handleLeave = () => setVisible(false);

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  return (
    <div className="custom-cursor-layer pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <div
        ref={outerRef}
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color,opacity] duration-300 ease-out ${
          !visible ? 'opacity-0' : 'opacity-100'
        } ${
          cursorVariant === 'inspect'
            ? 'h-20 w-20 border-[#E5CC91]/80 bg-[#510D19]/75 backdrop-blur-sm shadow-[0_0_28px_rgba(198,161,91,0.35)]'
            : cursorVariant === 'pointer'
              ? 'h-11 w-11 border-[#E5CC91] bg-[#C6A15B]/15'
              : 'h-8 w-8 border-[#C6A15B]/55 bg-transparent'
        }`}
      >
        {cursorLabel && (
          <span className="font-mono text-[9px] tracking-[0.22em] text-[#E5CC91] uppercase">
            {cursorLabel}
          </span>
        )}
      </div>
      <div
        ref={innerRef}
        className={`fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-[#E5CC91] transition-opacity duration-200 ${
          !visible || cursorVariant === 'inspect' ? 'opacity-0' : 'opacity-90'
        }`}
      />
    </div>
  );
};
