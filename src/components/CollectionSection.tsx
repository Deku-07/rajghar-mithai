import { useMemo, useRef, useState } from 'react';
import { Plus, Sparkles, ArrowUpRight } from 'lucide-react';
import {
  MITHAI_CATEGORIES,
  MITHAI_PRODUCTS,
  MithaiCategory,
  MithaiProduct,
} from '../data/mithai';

interface CollectionSectionProps {
  onSelectProduct: (product: MithaiProduct) => void;
  onQuickAdd: (product: MithaiProduct) => void;
}

interface MithaiPedestalCardProps {
  product: MithaiProduct;
  index: number;
  onSelect: () => void;
  onQuickAdd: () => void;
}

const MithaiPedestalCard = ({
  product,
  index,
  onSelect,
  onQuickAdd,
}: MithaiPedestalCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const [addedPulse, setAddedPulse] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * 11,
      ry: (px - 0.5) * 13,
      gx: px * 100,
      gy: py * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedPulse(true);
    onQuickAdd();
    window.setTimeout(() => setAddedPulse(false), 900);
  };

  // Asymmetric museum pedestal staggering across tablet & desktop
  const staggerClass =
    index % 3 === 1
      ? 'md:mt-8 lg:mt-16'
      : index % 3 === 2
        ? 'md:mt-0 lg:mt-7'
        : '';

  const archHeightClass =
    product.pedestalOffset === 'tall'
      ? 'aspect-[3/4.1]'
      : product.pedestalOffset === 'medium'
        ? 'aspect-[3/3.75]'
        : 'aspect-[3/3.45]';

  return (
    <article
      className={`group relative flex flex-col ${staggerClass}`}
      style={{ perspective: '1200px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onSelect}
        data-cursor="INSPECT"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect();
          }
        }}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
        className="relative cursor-pointer transition-transform duration-300 ease-out will-change-transform focus:outline-none"
      >
        {/* Top Archive Telemetry Header */}
        <div className="mb-3 flex items-center justify-between px-2">
          <span className="font-mono text-[10px] tracking-[0.28em] text-[#C6A15B]">
            {product.archiveNo}
          </span>
          <span className="font-mono text-[10px] tracking-[0.22em] text-[#F5EBDD]/60 uppercase">
            {product.category}
          </span>
        </div>

        {/* Sculptural Jharokha Arch Jewellery Frame */}
        <div
          className={`relative overflow-hidden jharokha-arch border border-[#C6A15B]/30 bg-[#2C060D] shadow-[0_24px_65px_rgba(14,2,4,0.75)] transition-all duration-500 group-hover:border-[#E5CC91]/75 group-hover:shadow-[0_32px_80px_rgba(198,161,91,0.18)] ${archHeightClass}`}
        >
          {/* Inner Gold Filigree Arch Border */}
          <div className="pointer-events-none absolute inset-2.5 z-20 jharokha-arch border border-[#C6A15B]/20 transition-colors duration-500 group-hover:border-[#E5CC91]/50" />

          {/* Mouse-reactive specular gold sheen */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(360px circle at ${tilt.gx}% ${tilt.gy}%, rgba(229, 204, 145, 0.16), transparent 60%)`,
            }}
          />

          {/* Product Studio Photography — gently scales and subtly rotates like an exhibition jewel */}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:rotate-[1.2deg]"
          />

          {/* Moody vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(40,5,12,0.12) 0%, rgba(40,5,12,0.05) 48%, rgba(28,4,8,0.88) 100%)',
            }}
          />

          {/* Optional Sovereign Seal Badge */}
          {product.featuredBadge && (
            <div className="absolute left-1/2 top-5 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#E5CC91]/45 bg-[#3B0812]/80 px-3.5 py-1 backdrop-blur-md">
              <span className="font-mono text-[9px] tracking-[0.24em] text-[#E5CC91] uppercase">
                {product.featuredBadge}
              </span>
            </div>
          )}

          {/* Hover / Touch Reveal: Key Ingredient Ribbon & Craft Time */}
          <div className="absolute inset-x-4 bottom-4 z-20 flex flex-col gap-2 sm:inset-x-5 sm:bottom-5 lg:translate-y-2 lg:opacity-90 transition-all duration-500 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
            <div className="flex flex-wrap gap-1.5 opacity-95 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100">
              {product.ingredients.slice(0, 2).map((ing) => (
                <span
                  key={ing}
                  className="rounded-full border border-[#C6A15B]/35 bg-[#23040A]/80 px-2.5 py-0.5 font-mono text-[9px] tracking-wider text-[#E5CC91]/90 backdrop-blur-sm"
                >
                  {ing}
                </span>
              ))}
            </div>

            <div className="flex items-end justify-between border-t border-[#C6A15B]/25 pt-3">
              <div>
                <p className="font-mono text-[9px] tracking-[0.22em] text-[#C6A15B] uppercase">
                  From {product.weightOptions[0].grams}g
                </p>
                <p className="font-serif text-xl text-[#E5CC91]">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleQuickAddClick}
                  aria-label={`Add ${product.name} to Coffret`}
                  className={`flex min-h-[40px] items-center gap-1.5 rounded-full border px-4 font-mono text-[10px] tracking-[0.18em] uppercase transition-all duration-300 ${
                    addedPulse
                      ? 'border-[#E5CC91] bg-[#E5CC91] text-[#23040A]'
                      : 'border-[#C6A15B]/55 bg-[#510D19]/85 text-[#E5CC91] hover:border-[#E5CC91] hover:bg-[#C6A15B] hover:text-[#23040A]'
                  }`}
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>{addedPulse ? 'Added' : 'Add'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pedestal Editorial Title & Description */}
        <div className="mt-5 px-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-2xl leading-snug text-[#F5EBDD] transition-colors duration-300 group-hover:text-[#E5CC91] sm:text-[1.75rem]">
              {product.name}
            </h3>
            <ArrowUpRight className="mt-1.5 h-4 w-4 shrink-0 text-[#C6A15B]/60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#E5CC91]" />
          </div>
          <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-[#D88A32] uppercase">
            {product.subtitle}
          </p>
          <p className="mt-2.5 line-clamp-2 font-sans text-sm leading-relaxed text-[#F5EBDD]/72">
            {product.shortDesc}
          </p>
        </div>
      </div>
    </article>
  );
};

export const CollectionSection = ({
  onSelectProduct,
  onQuickAdd,
}: CollectionSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<MithaiCategory>('All Mithai');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All Mithai') return MITHAI_PRODUCTS;
    return MITHAI_PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="collection"
      className="relative overflow-hidden bg-[#510D19] py-28 sm:py-36"
    >
      {/* Ambient silk texture & architectural halo */}
      <div className="silk-grain pointer-events-none absolute inset-0 opacity-80" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[540px] w-[1100px] -translate-x-1/2"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(198,161,91,0.12) 0%, rgba(112,29,42,0.3) 45%, transparent 75%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-8 border-b border-[#C6A15B]/25 pb-12 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <Sparkles className="h-3.5 w-3.5 text-[#D88A32]" />
              <span className="font-mono text-[11px] tracking-[0.3em] text-[#C6A15B] uppercase">
                The Royal Collection · Nine Heirloom Jewels
              </span>
            </div>
            <h2 className="font-display text-4xl leading-[1.06] tracking-[0.04em] text-[#F5EBDD] sm:text-5xl lg:text-6xl">
              CURATED LIKE <br />
              <span className="text-antique-gold font-serif italic font-normal">
                Precious Regalia.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-serif text-lg leading-relaxed text-[#F5EBDD]/80">
            Each confection is handcrafted in small dawn batches using single-origin Goan
            cashews, Pampore saffron, and A2 Gir cow ghee—presented as edible jewels.
          </p>
        </div>

        {/* Category Filter Ribbon — horizontal swipeable on mobile, wrapped on tablet/desktop */}
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="no-scrollbar -mx-6 flex items-center gap-2.5 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 sm:gap-3">
            {MITHAI_CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative min-h-[42px] shrink-0 rounded-full border px-5 py-2.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-all duration-300 ${
                    active
                      ? 'border-[#E5CC91] bg-[#E5CC91] text-[#28050C] font-semibold shadow-[0_0_24px_rgba(229,204,145,0.28)]'
                      : 'border-[#C6A15B]/30 bg-[#3B0812]/55 text-[#F5EBDD]/80 hover:border-[#C6A15B]/70 hover:text-[#E5CC91]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <span className="font-mono text-[11px] tracking-[0.22em] text-[#C6A15B]/80 uppercase sm:ml-auto">
            {String(filteredProducts.length).padStart(2, '0')} Creations
          </span>
        </div>

        {/* Staggered Museum Pedestal Grid */}
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
          {filteredProducts.map((product, index) => (
            <MithaiPedestalCard
              key={product.id}
              product={product}
              index={index}
              onSelect={() => onSelectProduct(product)}
              onQuickAdd={() => onQuickAdd(product)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
