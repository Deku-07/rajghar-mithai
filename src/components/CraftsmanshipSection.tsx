import { useEffect, useRef, useState } from 'react';
import { Flame } from 'lucide-react';
import { CRAFT_CHAPTERS } from '../data/craft';

export const CraftsmanshipSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [chapterProgress, setChapterProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      const raw = Math.max(0, Math.min(1, -rect.top / scrollable));
      const scaled = raw * CRAFT_CHAPTERS.length;
      const idx = Math.min(CRAFT_CHAPTERS.length - 1, Math.floor(scaled));
      setActiveIndex(idx);
      setChapterProgress(raw);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jumpToChapter = (idx: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollable = rect.height - window.innerHeight;
    const targetY = sectionTop + (idx / CRAFT_CHAPTERS.length) * scrollable + 20;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <section
      id="craft"
      ref={sectionRef}
      className="relative h-[280vh] bg-[#1F0308]"
    >
      {/* Full-Screen Documentary Sticky Cinema Stage */}
      <div className="sticky top-0 flex h-[100dvh] w-full items-center overflow-hidden">
        {/* Layered Cross-Fading Full-Bleed Documentary Photography */}
        {CRAFT_CHAPTERS.map((chapter, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={chapter.id}
              className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-105'
              }`}
            >
              <img
                src={chapter.image}
                alt={chapter.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out"
                style={{
                  transform: isActive
                    ? `scale(${1.03 + (chapterProgress * 0.08)})`
                    : 'scale(1.1)',
                }}
              />
              {/* Editorial dark maroon & chocolate chiaroscuro grading */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(24,3,7,0.92) 0%, rgba(45,6,13,0.72) 48%, rgba(24,3,7,0.35) 100%)',
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(24,3,7,0.65) 0%, transparent 25%, transparent 72%, rgba(24,3,7,0.92) 100%)',
                }}
              />
            </div>
          );
        })}

        {/* Architectural Gold Frame Overlay */}
        <div className="pointer-events-none absolute inset-3 border border-[#C6A15B]/20 sm:inset-8" />

        {/* Documentary Foreground Content */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col justify-between px-5 pb-8 pt-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Flame className="h-4 w-4 shrink-0 text-[#D88A32]" />
              <span className="font-mono text-[9px] tracking-[0.22em] text-[#E5CC91] uppercase sm:text-[11px] sm:tracking-[0.3em]">
                The Art of Craftsmanship
              </span>
            </div>

            {/* Chapter Selector Pills */}
            <div className="flex items-center gap-2">
              {CRAFT_CHAPTERS.map((chap, idx) => (
                <button
                  key={chap.id}
                  onClick={() => jumpToChapter(idx)}
                  className={`min-h-[38px] min-w-[44px] rounded-full border px-3.5 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 sm:px-4 ${
                    idx === activeIndex
                      ? 'border-[#E5CC91] bg-[#E5CC91] text-[#210409] font-semibold'
                      : 'border-[#C6A15B]/35 bg-[#2A050C]/70 text-[#E5CC91]/80 hover:border-[#E5CC91]'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Chapter Editorial Passage */}
          <div className="grid grid-cols-1 items-end gap-6 sm:gap-10 lg:grid-cols-12">
            <div className="max-w-2xl lg:col-span-8">
              {CRAFT_CHAPTERS.map((chapter, idx) => {
                if (idx !== activeIndex) return null;
                return (
                  <div key={chapter.id} className="animate-[fadeIn_0.65s_ease-out]">
                    <span className="font-mono text-[10px] tracking-[0.22em] text-[#D88A32] uppercase sm:text-xs sm:tracking-[0.3em]">
                      {chapter.chapterNo} — {chapter.detailMetric}
                    </span>
                    <h2 className="mt-2 font-display text-3xl leading-[1.06] tracking-[0.04em] text-[#F5EBDD] sm:mt-3 sm:text-5xl lg:text-6xl">
                      {chapter.title}
                    </h2>
                    <p className="mt-1.5 font-serif text-lg italic text-[#E5CC91] sm:mt-2 sm:text-2xl">
                      {chapter.subtitle}
                    </p>
                    <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-[#F5EBDD]/88 sm:mt-6 sm:text-base lg:text-lg">
                      {chapter.narrative}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 sm:mt-7 sm:gap-2.5">
                      {chapter.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full border border-[#C6A15B]/40 bg-[#3B0812]/80 px-3 py-1 font-mono text-[9px] tracking-[0.16em] text-[#E5CC91] uppercase backdrop-blur-md sm:px-4 sm:py-1.5 sm:text-[10px] sm:tracking-[0.18em]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Documentary Progress Rail */}
            <div className="hidden flex-col items-end gap-4 lg:col-span-4 lg:flex">
              <div className="w-64 rounded-2xl border border-[#C6A15B]/30 bg-[#25050B]/80 p-5 backdrop-blur-md">
                <p className="font-mono text-[10px] tracking-[0.24em] text-[#C6A15B] uppercase">
                  Atelier Sequence
                </p>
                <div className="mt-4 space-y-3">
                  {CRAFT_CHAPTERS.map((ch, idx) => (
                    <button
                      key={ch.id}
                      onClick={() => jumpToChapter(idx)}
                      className="flex w-full items-center justify-between text-left"
                    >
                      <span
                        className={`font-serif text-base transition-colors ${
                          idx === activeIndex ? 'text-[#E5CC91]' : 'text-[#F5EBDD]/45'
                        }`}
                      >
                        {ch.title}
                      </span>
                      <span
                        className={`h-[1px] transition-all duration-500 ${
                          idx === activeIndex
                            ? 'w-12 bg-[#E5CC91]'
                            : 'w-4 bg-[#C6A15B]/30'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
