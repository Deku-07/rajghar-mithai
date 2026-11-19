import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = window.setInterval(() => {
      const increment = current < 70 ? Math.random() * 14 + 6 : Math.random() * 7 + 3;
      current = Math.min(100, current + increment);
      setProgress(Math.floor(current));

      if (current >= 100) {
        window.clearInterval(interval);
        window.setTimeout(() => {
          setExiting(true);
          window.setTimeout(onComplete, 950);
        }, 320);
      }
    }, 55);

    return () => window.clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#23040A] transition-all duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        exiting ? 'pointer-events-none opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(198,161,91,0.13) 0%, rgba(81,13,25,0.45) 45%, rgba(26,3,7,0.98) 85%)',
        }}
      />

      {/* Animated Royal Mandala & Jharokha Crest */}
      <div className="relative flex flex-col items-center">
        <div className="relative h-36 w-36 sm:h-44 sm:w-44">
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <defs>
              <linearGradient id="preloaderGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E5CC91" />
                <stop offset="50%" stopColor="#C6A15B" />
                <stop offset="100%" stopColor="#8B682B" />
              </linearGradient>
            </defs>

            {/* Rotating outer architectural ring */}
            <g className="origin-center animate-[spin_22s_linear_infinite]">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="url(#preloaderGold)"
                strokeWidth="0.7"
                strokeDasharray="4 6"
                opacity="0.65"
              />
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const x1 = 100 + Math.cos(angle) * 82;
                const y1 = 100 + Math.sin(angle) * 82;
                const x2 = 100 + Math.cos(angle) * 92;
                const y2 = 100 + Math.sin(angle) * 92;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#C6A15B"
                    strokeWidth="1"
                    opacity="0.75"
                  />
                );
              })}
            </g>

            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r="74"
              fill="none"
              stroke="rgba(198,161,91,0.16)"
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="100"
              r="74"
              fill="none"
              stroke="url(#preloaderGold)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 74}
              strokeDashoffset={2 * Math.PI * 74 * (1 - progress / 100)}
              transform="rotate(-90 100 100)"
              className="transition-[stroke-dashoffset] duration-150 ease-out"
            />

            {/* Inner Jharokha Arch + Royal Monogram */}
            <path
              d="M68 134 V92 C68 72 83 57 100 46 C117 57 132 72 132 92 V134 Z"
              fill="rgba(81,13,25,0.55)"
              stroke="url(#preloaderGold)"
              strokeWidth="1.1"
            />
            <path
              d="M100 37 L104 43 L100 49 L96 43 Z"
              fill="#E5CC91"
            />
            <text
              x="100"
              y="108"
              textAnchor="middle"
              fill="#E5CC91"
              style={{
                fontFamily: 'Cinzel, Georgia, serif',
                fontSize: '28px',
                letterSpacing: '0.08em',
              }}
            >
              R
            </text>
          </svg>
        </div>

        {/* Brand & Progress Telemetry */}
        <div className="mt-7 flex flex-col items-center gap-2 text-center">
          <p className="font-display text-lg tracking-[0.42em] text-[#E5CC91] sm:text-xl">
            RAJGHAR
          </p>
          <p className="font-serif text-xs italic tracking-[0.22em] text-[#F5EBDD]/70 uppercase">
            The Art of Indian Mithai · Est. 1894
          </p>

          <div className="mt-5 flex items-center gap-4">
            <span className="h-[1px] w-10 bg-[#C6A15B]/40" />
            <span className="font-mono text-xs tracking-[0.3em] text-[#C6A15B]">
              {String(progress).padStart(2, '0')}%
            </span>
            <span className="h-[1px] w-10 bg-[#C6A15B]/40" />
          </div>
        </div>
      </div>
    </div>
  );
};
