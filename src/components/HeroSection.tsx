import { ArrowDownRight, Sparkles } from 'lucide-react';
import { HeroCanvas } from './HeroCanvas';

interface HeroSectionProps {
  ready: boolean;
  diving: boolean;
  onExploreClick: () => void;
}

export const HeroSection = ({ ready, diving, onExploreClick }: HeroSectionProps) => {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] w-full items-end overflow-hidden bg-[#28050C] pb-12 pt-24 sm:items-center sm:pb-0 sm:pt-20"
    >
      {/* Interactive WebGL Royal Palace & Golden Thali Canvas */}
      <HeroCanvas diving={diving} />

      {/* Subtle architectural vignette so typography retains editorial legibility */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, transparent 22%, rgba(30, 4, 9, 0.58) 78%, rgba(20, 2, 6, 0.92) 100%)',
        }}
      />
      {/* Bottom gradient scrim on mobile/tablet so headline & CTA stay sharp over the thali */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#200308] via-[#200308]/75 to-transparent sm:hidden"
      />

      {/* Decorative side royal coordinates */}
      <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 -rotate-90 items-center gap-4 lg:flex">
        <span className="h-[1px] w-12 bg-[#C6A15B]/45" />
        <span className="font-mono text-[10px] tracking-[0.35em] text-[#C6A15B]/80 uppercase">
          26.9124° N · 75.7873° E · JAIPUR ATELIER
        </span>
      </div>

      {/* Main Editorial Overlay */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-between px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <div
            className={`mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#C6A15B]/40 bg-[#3B0812]/75 px-3.5 py-1.5 backdrop-blur-md transition-all duration-1000 sm:mb-5 sm:gap-3 sm:px-4 ${
              ready ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#D88A32]" />
            <span className="font-mono text-[9px] tracking-[0.22em] text-[#E5CC91] uppercase sm:text-[10px] sm:tracking-[0.28em]">
              Royal Heritage Confectionery · Est. 1894
            </span>
          </div>

          <h1
            className={`font-display text-[2.65rem] leading-[0.98] tracking-[0.05em] text-[#F5EBDD] transition-all duration-1000 delay-150 sm:text-6xl md:text-7xl lg:text-[5.5rem] ${
              ready ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            AN ART
            <br />
            <span className="text-antique-gold font-serif italic font-normal tracking-[0.02em]">
              OF SWEETNESS.
            </span>
          </h1>

          <p
            className={`mt-4 max-w-xl font-serif text-lg leading-relaxed text-[#F5EBDD]/88 transition-all duration-1000 delay-300 sm:mt-6 sm:text-xl md:text-2xl ${
              ready ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            Centuries of Indian craftsmanship. Reimagined for the modern palate.
          </p>

          <div
            className={`mt-7 flex flex-wrap items-center gap-4 transition-all duration-1000 delay-500 sm:mt-10 sm:gap-6 ${
              ready ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <button
              onClick={onExploreClick}
              data-cursor="ENTER"
              className="group relative inline-flex w-full items-center justify-center gap-4 overflow-hidden rounded-full border border-[#E5CC91]/65 bg-gradient-to-r from-[#510D19] via-[#701D2A] to-[#510D19] px-7 py-4 font-sans text-xs font-medium tracking-[0.22em] text-[#E5CC91] uppercase shadow-[0_12px_40px_rgba(20,3,6,0.7)] transition-all duration-500 hover:border-[#E5CC91] hover:shadow-[0_0_40px_rgba(198,161,91,0.38)] sm:w-auto sm:px-8 sm:tracking-[0.26em]"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#23040A]">
                EXPLORE THE COLLECTION
              </span>
              <ArrowDownRight className="relative z-10 h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-[#23040A]" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#C6A15B] via-[#E5CC91] to-[#C6A15B] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
            </button>

            <span className="hidden items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-[#C6A15B]/80 uppercase sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D88A32]" />
              Move pointer to inspect the Royal Thali
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Hint */}
      <div className="pointer-events-none absolute bottom-6 right-8 hidden flex-col items-center gap-2 sm:flex">
        <span className="font-mono text-[9px] tracking-[0.28em] text-[#C6A15B]/75 uppercase">
          Scroll
        </span>
        <div className="h-12 w-[1px] overflow-hidden bg-[#C6A15B]/25">
          <div className="h-1/2 w-full animate-[pulse_2s_ease-in-out_infinite] bg-[#E5CC91]" />
        </div>
      </div>

      {/* Iris Gold Sweep Transition Overlay when CTA clicked */}
      {diving && (
        <div className="pointer-events-none fixed inset-0 z-[70] animate-iris-sweep bg-[radial-gradient(circle_at_center,#E5CC91_0%,#C6A15B_30%,#510D19_70%,#25050B_100%)]" />
      )}
    </section>
  );
};
