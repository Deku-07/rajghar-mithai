import { useEffect, useRef, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { label: 'Home', id: 'hero' },
  { label: 'Our Collection', id: 'collection' },
  { label: 'Signature Mithai', id: 'signature' },
  { label: 'Our Story', id: 'story' },
  { label: 'The Craft', id: 'craft' },
  { label: 'Contact', id: 'contact' },
];

export const Header = ({ cartCount, onOpenCart, onNavigate }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 56);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        ref={headerRef}
        onMouseMove={handleMouseMove}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? 'bg-[#3D0812]/90 backdrop-blur-xl border-b border-[#C6A15B]/25 py-3.5 shadow-[0_14px_40px_rgba(16,2,5,0.65)]'
            : 'bg-transparent border-b border-transparent py-6'
        }`}
      >
        {/* Mouse-reactive gold shimmer accent along the header */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500"
          style={{
            background: `radial-gradient(420px circle at ${mousePos.x}% ${mousePos.y}%, rgba(229, 204, 145, 0.11), transparent 65%)`,
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] opacity-60"
          style={{
            background: `radial-gradient(280px circle at ${mousePos.x}% 100%, rgba(229, 204, 145, 0.8), transparent 70%)`,
          }}
        />

        <div className="relative mx-auto flex max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-10">
          {/* Brand Crest & Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#C6A15B]/55 bg-[#510D19]/70 transition-transform duration-500 group-hover:rotate-45 group-hover:border-[#E5CC91]">
              <svg viewBox="0 0 36 36" className="h-5 w-5 text-[#E5CC91]">
                <path
                  d="M18 4 L21 15 L32 18 L21 21 L18 32 L15 21 L4 18 L15 15 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <circle cx="18" cy="18" r="2.2" fill="currentColor" />
              </svg>
            </span>
            <div>
              <span className="block font-display text-lg tracking-[0.28em] text-[#F5EBDD] transition-colors group-hover:text-[#E5CC91] sm:text-xl">
                RAJGHAR
              </span>
              <span className="hidden font-mono text-[9px] tracking-[0.26em] text-[#C6A15B]/80 uppercase sm:block">
                Jaipur · Est. 1894
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="group relative py-1 font-sans text-xs font-medium tracking-[0.2em] text-[#F5EBDD]/85 uppercase transition-colors duration-300 hover:text-[#E5CC91]"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-0 left-1/2 h-[1px] w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#E5CC91] to-transparent transition-all duration-400 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Actions: Bag & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCart}
              aria-label="Open Royal Coffret Bag"
              className="group relative flex items-center gap-2.5 rounded-full border border-[#C6A15B]/45 bg-[#510D19]/65 px-4 py-2 text-xs tracking-[0.18em] text-[#E5CC91] uppercase transition-all duration-300 hover:border-[#E5CC91] hover:bg-[#701D2A]/80 hover:shadow-[0_0_24px_rgba(198,161,91,0.28)]"
            >
              <ShoppingBag className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span className="hidden sm:inline">Coffret</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C6A15B] px-1.5 font-mono text-[10px] font-semibold text-[#23040A]">
                {cartCount}
              </span>
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open Navigation Menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C6A15B]/35 text-[#E5CC91] transition-colors hover:border-[#E5CC91] hover:bg-[#701D2A]/60 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Immersive Full-Screen Mobile Architectural Menu */}
      <div
        className={`fixed inset-0 z-[80] flex h-[100dvh] flex-col justify-between overflow-y-auto bg-[#25050B]/98 px-6 py-8 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] sm:px-10 sm:py-10 lg:hidden ${
          mobileOpen
            ? 'pointer-events-auto opacity-100 [clip-path:circle(150%_at_92%_5%)]'
            : 'pointer-events-none opacity-0 [clip-path:circle(0%_at_92%_5%)]'
        }`}
      >
        {/* Subtle Jharokha Arch Backdrop */}
        <div className="pointer-events-none absolute inset-6 rounded-t-[200px] border border-[#C6A15B]/15" />

        <div className="relative flex items-center justify-between">
          <span className="font-display text-lg tracking-[0.3em] text-[#E5CC91]">RAJGHAR</span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close Navigation Menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C6A15B]/40 text-[#E5CC91] transition-colors hover:bg-[#701D2A]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="relative flex flex-col gap-5 py-8">
          {NAV_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="group flex items-baseline gap-4 text-left"
              style={{
                transitionDelay: mobileOpen ? `${idx * 60 + 120}ms` : '0ms',
              }}
            >
              <span className="font-mono text-xs text-[#C6A15B]/70">0{idx + 1}</span>
              <span className="font-serif text-3xl tracking-wide text-[#F5EBDD] transition-all duration-300 group-hover:translate-x-3 group-hover:text-[#E5CC91] sm:text-4xl">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="relative border-t border-[#C6A15B]/20 pt-5">
          <p className="font-mono text-[10px] tracking-[0.26em] text-[#C6A15B] uppercase">
            Royal Atelier & Tasting Salons
          </p>
          <p className="mt-1 font-serif text-base italic text-[#F5EBDD]/75">
            Jaipur · New Delhi · Mumbai · London
          </p>
        </div>
      </div>
    </>
  );
};
