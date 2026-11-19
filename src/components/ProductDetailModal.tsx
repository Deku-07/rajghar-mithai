import { useEffect, useState } from 'react';
import { Check, Clock, MapPin, Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
import { MithaiProduct, WeightOption } from '../data/mithai';

interface ProductDetailModalProps {
  product: MithaiProduct | null;
  onClose: () => void;
  onAddToBag: (product: MithaiProduct, weight: WeightOption, quantity: number) => void;
}

export const ProductDetailModal = ({
  product,
  onClose,
  onAddToBag,
}: ProductDetailModalProps) => {
  const [selectedWeight, setSelectedWeight] = useState<WeightOption | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (product) {
      setSelectedWeight(product.weightOptions[0]);
      setQuantity(1);
      setJustAdded(false);
    }
  }, [product]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      window.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const activeWeight = selectedWeight || product.weightOptions[0];

  const updatePanFromPoint = (clientX: number, clientY: number, el: HTMLDivElement) => {
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 18;
    setPanOffset({ x, y });
  };

  const handleImageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updatePanFromPoint(e.clientX, e.clientY, e.currentTarget);
  };

  const handleImageTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updatePanFromPoint(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget);
    }
  };

  const handleAdd = () => {
    onAddToBag(product, activeWeight, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center bg-[#180206]/95 backdrop-blur-2xl animate-[fadeIn_0.35s_ease-out]">
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close Product Presentation"
        className="fixed right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[#C6A15B]/45 bg-[#3D0812]/90 text-[#E5CC91] transition-all duration-300 hover:rotate-90 hover:border-[#E5CC91] hover:bg-[#701D2A] sm:right-6 sm:top-6 sm:h-12 sm:w-12"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="grid h-[100dvh] w-full max-w-[1440px] grid-cols-1 overflow-y-auto overscroll-contain lg:grid-cols-12 lg:overflow-hidden">
        {/* Left: Full-Height Sculptural Product Stage */}
        <div
          onMouseMove={handleImageMove}
          onMouseLeave={() => setPanOffset({ x: 0, y: 0 })}
          onTouchMove={handleImageTouch}
          onTouchEnd={() => setPanOffset({ x: 0, y: 0 })}
          className="relative flex min-h-[44vh] items-center justify-center overflow-hidden bg-[#28050C] px-6 pb-8 pt-16 sm:min-h-[50vh] sm:p-14 lg:col-span-6 lg:min-h-full"
        >
          {/* Decorative palace arch framing */}
          <div className="pointer-events-none absolute inset-4 jharokha-arch border border-[#C6A15B]/20 sm:inset-10" />

          <div className="relative h-[300px] w-full max-w-[380px] overflow-hidden jharokha-arch border border-[#C6A15B]/45 shadow-[0_35px_90px_rgba(0,0,0,0.8)] sm:h-[420px] sm:max-w-[440px] lg:h-[520px] lg:max-w-[460px]">
            <img
              src={product.image}
              alt={product.name}
              style={{
                transform: `scale(1.08) translate3d(${-panOffset.x}px, ${-panOffset.y}px, 0)`,
              }}
              className="h-full w-full object-cover transition-transform duration-300 ease-out"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, transparent 50%, rgba(26,3,7,0.75) 100%)',
              }}
            />
            <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.28em] text-[#E5CC91] uppercase">
                {product.archiveNo}
              </span>
              <span className="font-mono text-[10px] tracking-[0.22em] text-[#F5EBDD]/75 uppercase">
                Macro Inspection Active
              </span>
            </div>
          </div>
        </div>

        {/* Right: Curatorial Provenance & Acquisition */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:col-span-6 lg:overflow-y-auto lg:px-14 lg:py-16">
          <div className="flex items-center gap-3">
            <Sparkles className="h-3.5 w-3.5 text-[#D88A32]" />
            <span className="font-mono text-[10px] tracking-[0.28em] text-[#C6A15B] uppercase">
              {product.category} · {product.archiveNo}
            </span>
          </div>

          <h2 className="mt-3 font-display text-3xl leading-tight tracking-[0.04em] text-[#F5EBDD] sm:text-5xl">
            {product.name}
          </h2>
          <p className="mt-1.5 font-serif text-xl italic text-[#E5CC91]">
            {product.subtitle}
          </p>

          <p className="mt-5 font-sans text-sm leading-relaxed text-[#F5EBDD]/82 sm:text-base">
            {product.editorialStory}
          </p>

          {/* Tasting Notes & Provenance Metadata */}
          <div className="mt-7 grid grid-cols-1 gap-4 border-y border-[#C6A15B]/25 py-5 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C6A15B]" />
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-[#C6A15B]/80 uppercase">
                  Provenance
                </p>
                <p className="mt-0.5 font-serif text-base text-[#F5EBDD]">
                  {product.origin}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#C6A15B]" />
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-[#C6A15B]/80 uppercase">
                  Atelier Craft Time
                </p>
                <p className="mt-0.5 font-serif text-base text-[#F5EBDD]">
                  {product.craftDuration}
                </p>
              </div>
            </div>
          </div>

          {/* Tasting Notes */}
          <div className="mt-6">
            <p className="font-mono text-[10px] tracking-[0.24em] text-[#C6A15B] uppercase">
              Palate & Aroma Profile
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {product.tastingNotes.map((note) => (
                <span
                  key={note}
                  className="rounded-full border border-[#C6A15B]/35 bg-[#510D19]/70 px-3.5 py-1 font-serif text-sm italic text-[#E5CC91]"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Pure Ingredients */}
          <div className="mt-6">
            <p className="font-mono text-[10px] tracking-[0.24em] text-[#C6A15B] uppercase">
              Heirloom Ingredients
            </p>
            <ul className="mt-2.5 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {product.ingredients.map((ing) => (
                <li
                  key={ing}
                  className="flex items-center gap-2 font-sans text-xs text-[#F5EBDD]/80"
                >
                  <span className="h-1 w-1 rounded-full bg-[#D88A32]" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Coffret Weight Selection */}
          <div className="mt-7">
            <p className="font-mono text-[10px] tracking-[0.24em] text-[#C6A15B] uppercase">
              Select Royal Coffret Presentation
            </p>
            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {product.weightOptions.map((option) => {
                const isSelected = activeWeight.label === option.label;
                return (
                  <button
                    key={option.label}
                    onClick={() => setSelectedWeight(option)}
                    className={`rounded-xl border px-3.5 py-3 text-left transition-all duration-300 ${
                      isSelected
                        ? 'border-[#E5CC91] bg-[#701D2A]/80 shadow-[0_0_24px_rgba(198,161,91,0.22)]'
                        : 'border-[#C6A15B]/25 bg-[#3B0812]/50 hover:border-[#C6A15B]/60'
                    }`}
                  >
                    <span className="block font-mono text-[10px] tracking-[0.14em] text-[#E5CC91] uppercase">
                      {option.label}
                    </span>
                    <span className="mt-1 block font-serif text-lg text-[#F5EBDD]">
                      ₹{option.price.toLocaleString('en-IN')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity + Acquire Button */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-[#C6A15B]/45 bg-[#3B0812]/70 px-2 py-1.5">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#E5CC91] transition-colors hover:bg-[#701D2A]"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-10 text-center font-mono text-sm text-[#F5EBDD]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#E5CC91] transition-colors hover:bg-[#701D2A]"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="group relative flex flex-1 items-center justify-center gap-3 overflow-hidden rounded-full border border-[#E5CC91] bg-gradient-to-r from-[#C6A15B] via-[#E5CC91] to-[#C6A15B] px-8 py-4 font-sans text-xs font-semibold tracking-[0.22em] text-[#23040A] uppercase shadow-[0_12px_35px_rgba(198,161,91,0.3)] transition-all duration-300 hover:shadow-[0_16px_45px_rgba(229,204,145,0.45)]"
            >
              {justAdded ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Added to Royal Coffret</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  <span>
                    Add to Coffret · ₹{(activeWeight.price * quantity).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </button>
          </div>

          <p className="mt-4 font-serif text-xs italic text-[#F5EBDD]/60">
            {product.shelfNote}
          </p>
        </div>
      </div>
    </div>
  );
};
