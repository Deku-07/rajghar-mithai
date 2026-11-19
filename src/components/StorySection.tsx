import { Crown } from 'lucide-react';

const HERITAGE_PILLARS = [
  {
    metric: '1894',
    label: 'ROYAL PATRONAGE',
    detail: 'Founded by Master Halwai Raghavendra Sharma for the Jaipur Darbar.',
  },
  {
    metric: '04 HRS',
    label: 'COPPER REDUCTION',
    detail: 'Every batch of khoya is slow-simmered in heavy tin-lined copper kadhais.',
  },
  {
    metric: '0.02%',
    label: 'MONGRA SAFFRON',
    detail: 'Only top crimson stigma tips from single-harvest Pampore fields.',
  },
  {
    metric: '100%',
    label: 'ZERO SYNTHETICS',
    detail: 'No artificial essence, no starch fillers, and pure vegetarian silver varq.',
  },
];

export const StorySection = () => {
  return (
    <section
      id="story"
      className="relative overflow-hidden border-y border-[#C6A15B]/20 bg-gradient-to-b from-[#3A0812] via-[#510D19] to-[#32060E] py-28 sm:py-36"
    >
      {/* Subtle Architectural Mandala Watermark */}
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[640px] w-[640px] -translate-y-1/2 opacity-[0.06]">
        <svg viewBox="0 0 200 200" className="h-full w-full text-[#E5CC91]">
          <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="72" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="46" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i * 22.5 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={100 + Math.cos(a) * 20}
                y1={100 + Math.sin(a) * 20}
                x2={100 + Math.cos(a) * 95}
                y2={100 + Math.sin(a) * 95}
                stroke="currentColor"
                strokeWidth="0.4"
              />
            );
          })}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          {/* Left: Royal Narrative */}
          <div className="lg:col-span-7">
            <div className="mb-5 inline-flex items-center gap-3">
              <Crown className="h-4 w-4 text-[#C6A15B]" />
              <span className="font-mono text-[11px] tracking-[0.3em] text-[#C6A15B] uppercase">
                Our Story · Four Generations of Mithai
              </span>
            </div>

            <h2 className="font-display text-4xl leading-[1.08] tracking-[0.04em] text-[#F5EBDD] sm:text-5xl lg:text-6xl">
              BORN IN THE <br />
              <span className="text-antique-gold font-serif italic font-normal">
                Palace Kitchens of Jaipur.
              </span>
            </h2>

            <div className="mt-8 space-y-5 font-serif text-xl leading-relaxed text-[#F5EBDD]/85">
              <p>
                Before electric mixers and commercial syrups, royal mithai was an offering
                of patience—measured by the crackle of wood embers, the scent of warm A2
                ghee, and the gentle shimmer of hand-beaten silver leaf under lantern light.
              </p>
              <p className="text-[#F5EBDD]/75">
                Since 1894, <span className="text-[#E5CC91]">Rajghar</span> has guarded
                handwritten family treatises from the courts of Rajputana, uniting heirloom
                copper-vessel technique with contemporary architectural presentation.
              </p>
            </div>
          </div>

          {/* Right: 4 Architectural Heritage Pillars */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-5">
            {HERITAGE_PILLARS.map((pillar) => (
              <div
                key={pillar.label}
                className="group relative overflow-hidden rounded-2xl border border-[#C6A15B]/25 bg-[#2A050C]/65 p-6 transition-all duration-500 hover:border-[#E5CC91]/65 hover:bg-[#3A0812]/80"
              >
                <div className="font-display text-3xl tracking-wider text-[#E5CC91] sm:text-4xl">
                  {pillar.metric}
                </div>
                <div className="mt-2 font-mono text-[10px] tracking-[0.24em] text-[#D88A32] uppercase">
                  {pillar.label}
                </div>
                <p className="mt-3 font-sans text-xs leading-relaxed text-[#F5EBDD]/75">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
