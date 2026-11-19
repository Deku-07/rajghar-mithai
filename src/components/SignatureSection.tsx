import { useCallback, useEffect, useRef, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { SIGNATURE_HOTSPOTS } from '../data/craft';
import { ProjectedHotspot, SignatureCanvas } from './SignatureCanvas';

export const SignatureSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [projectedPoints, setProjectedPoints] = useState<ProjectedHotspot[]>([]);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>('varq');

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;
      const raw = -rect.top / totalScrollable;
      setScrollProgress(Math.max(0, Math.min(1, raw)));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHotspotsProject = useCallback((points: ProjectedHotspot[]) => {
    setProjectedPoints(points);
  }, []);

  const activeHotspot = SIGNATURE_HOTSPOTS.find((h) => h.id === activeHotspotId) || null;

  // Synchronized scroll storytelling stages
  const stage =
    scrollProgress < 0.34 ? 0 : scrollProgress < 0.68 ? 1 : 2;

  return (
    <section
      id="signature"
      ref={sectionRef}
      className="relative h-[260vh] bg-[#210409]"
    >
      {/* Sticky Full-Viewport WebGL Stage */}
      <div className="sticky top-0 flex h-[100dvh] w-full items-center overflow-hidden">
        <SignatureCanvas
          scrollProgress={scrollProgress}
          activeHotspotId={activeHotspotId}
          onHotspotsProject={handleHotspotsProject}
        />

        {/* Ambient radial dark vignette for editorial legibility */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 48%, transparent 22%, rgba(22,3,7,0.72) 85%)',
          }}
        />

        {/* Interactive 3D Projected Hotspots — 44x44px touch targets */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {projectedPoints.map((pt, idx) => {
            const info = SIGNATURE_HOTSPOTS[idx];
            if (!pt.visible || !info) return null;
            const isSelected = activeHotspotId === info.id;
            return (
              <button
                key={info.id}
                onClick={() => setActiveHotspotId(isSelected ? null : info.id)}
                style={{
                  transform: `translate3d(${pt.x}px, ${pt.y}px, 0) translate(-50%, -50%)`,
                }}
                aria-label={`Inspect ${info.title}`}
                className="pointer-events-auto absolute left-0 top-0 group focus:outline-none"
              >
                <span className="relative flex h-11 w-11 items-center justify-center">
                  <span
                    className={`absolute inset-1 rounded-full border border-[#E5CC91] ${
                      isSelected ? 'scale-110 bg-[#C6A15B]/30' : 'animate-pulse-ring'
                    }`}
                  />
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-mono transition-all duration-300 ${
                      isSelected
                        ? 'border-[#E5CC91] bg-[#E5CC91] text-[#210409] font-bold scale-110'
                        : 'border-[#E5CC91]/80 bg-[#510D19]/85 text-[#E5CC91] group-hover:bg-[#E5CC91] group-hover:text-[#210409]'
                    }`}
                  >
                    {idx + 1}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Synchronized Editorial Typography */}
        <div className="pointer-events-none relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col justify-between px-4 pb-5 pt-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
            <div className="max-w-xl">
              <div className="mb-2 flex items-center gap-2.5 sm:mb-3 sm:gap-3">
                <Sparkles className="h-3.5 w-3.5 text-[#D88A32]" />
                <span className="font-mono text-[9px] tracking-[0.22em] text-[#C6A15B] uppercase sm:text-[10px] sm:tracking-[0.3em]">
                  Signature Jewel · Interactive 3D Anatomy
                </span>
              </div>

              <h2 className="font-display text-[1.85rem] leading-[1.06] tracking-[0.04em] text-[#F5EBDD] sm:text-5xl lg:text-[3.5rem]">
                NOT JUST A SWEET.
                <br />
                <span className="text-antique-gold font-serif italic font-normal">
                  A PIECE OF HERITAGE.
                </span>
              </h2>
            </div>

            {/* Scroll Telemetry Indicator */}
            <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
              <span className="font-mono text-[9px] tracking-[0.22em] text-[#C6A15B] uppercase sm:text-[10px] sm:tracking-[0.25em]">
                Scroll Choreography · {Math.round(scrollProgress * 100)}%
              </span>
              <div className="h-1 w-28 overflow-hidden rounded-full bg-[#C6A15B]/20 sm:w-44">
                <div
                  className="h-full bg-gradient-to-r from-[#C6A15B] to-[#E5CC91] transition-[width] duration-75"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Split: Scroll-Synced Story Beat + Active Hotspot Card */}
          <div className="grid grid-cols-1 items-end gap-3 sm:gap-6 lg:grid-cols-12">
            {/* Synchronized Narrative Beats — hidden on mobile when a hotspot card is open so the 3D diamond stays unobstructed */}
            <div className={`${activeHotspot ? 'hidden lg:block' : 'block'} lg:col-span-6`}>
              <div className="max-w-lg rounded-2xl border border-[#C6A15B]/25 bg-[#2A050C]/80 p-4 backdrop-blur-md sm:p-6">
                {stage === 0 && (
                  <div className="animate-[fadeIn_0.5s_ease-out]">
                    <span className="font-mono text-[10px] tracking-[0.24em] text-[#D88A32] uppercase">
                      ACT I · THE MARBLE GEOMETRY
                    </span>
                    <p className="mt-1.5 font-serif text-base leading-relaxed text-[#F5EBDD] sm:mt-2 sm:text-xl">
                      Hand-rolled to an exact 4.5 mm profile on cooled Makrana marble and
                      sliced into royal diamonds before the first sun rises over Jaipur.
                    </p>
                  </div>
                )}
                {stage === 1 && (
                  <div className="animate-[fadeIn_0.5s_ease-out]">
                    <span className="font-mono text-[10px] tracking-[0.24em] text-[#D88A32] uppercase">
                      ACT II · PURE CHANDI VARQ & KESAR
                    </span>
                    <p className="mt-1.5 font-serif text-base leading-relaxed text-[#F5EBDD] sm:mt-2 sm:text-xl">
                      Each diamond is draped in 99.9% pure hand-beaten silver leaf and kissed
                      with single-strand Kashmiri saffron steeped in Kannauj rosewater.
                    </p>
                  </div>
                )}
                {stage === 2 && (
                  <div className="animate-[fadeIn_0.5s_ease-out]">
                    <span className="font-mono text-[10px] tracking-[0.24em] text-[#D88A32] uppercase">
                      ACT III · ORBITING PROVENANCE
                    </span>
                    <p className="mt-1.5 font-serif text-base leading-relaxed text-[#F5EBDD] sm:mt-2 sm:text-xl">
                      Goan W180 cashews, unbleached Iranian pistachios, and Mamra almonds—tap
                      any numbered jewel marker to inspect the craft.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Active Hotspot Detail Card (or Reopen Pill on mobile) */}
            <div className="pointer-events-auto lg:col-span-6 lg:flex lg:justify-end">
              {activeHotspot ? (
                <div className="w-full rounded-2xl border border-[#E5CC91]/50 bg-[#3B0812]/90 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl animate-[fadeIn_0.35s_ease-out] sm:max-w-md sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-[9px] tracking-[0.22em] text-[#D88A32] uppercase sm:text-[10px] sm:tracking-[0.24em]">
                        {activeHotspot.label}
                      </span>
                      <h3 className="mt-1 font-serif text-xl text-[#E5CC91] sm:text-2xl">
                        {activeHotspot.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveHotspotId(null)}
                      aria-label="Close hotspot details"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C6A15B]/35 text-[#C6A15B] hover:border-[#E5CC91] hover:text-[#E5CC91]"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="mt-2 font-sans text-xs leading-relaxed text-[#F5EBDD]/84 sm:mt-3 sm:text-sm">
                    {activeHotspot.description}
                  </p>

                  <div className="mt-3.5 flex items-center justify-between border-t border-[#C6A15B]/25 pt-3 sm:mt-4">
                    <span className="font-mono text-[9px] tracking-[0.18em] text-[#C6A15B] uppercase sm:text-[10px]">
                      {activeHotspot.metric}
                    </span>
                    <div className="flex gap-1.5">
                      {SIGNATURE_HOTSPOTS.map((hs, i) => (
                        <button
                          key={hs.id}
                          onClick={() => setActiveHotspotId(hs.id)}
                          className={`h-7 w-7 rounded-full font-mono text-[10px] transition-colors ${
                            hs.id === activeHotspot.id
                              ? 'bg-[#E5CC91] text-[#210409] font-bold'
                              : 'border border-[#C6A15B]/35 text-[#E5CC91]/80 hover:border-[#E5CC91]'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end lg:hidden">
                  <button
                    onClick={() => setActiveHotspotId(SIGNATURE_HOTSPOTS[0].id)}
                    className="rounded-full border border-[#C6A15B]/45 bg-[#3B0812]/85 px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-[#E5CC91] uppercase backdrop-blur-md"
                  >
                    Inspect Craft Hotspots
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
