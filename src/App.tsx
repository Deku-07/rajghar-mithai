import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CollectionSection } from './components/CollectionSection';
import { ContactFooter } from './components/ContactFooter';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { CustomCursor } from './components/CustomCursor';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { Preloader } from './components/Preloader';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SignatureSection } from './components/SignatureSection';
import { StorySection } from './components/StorySection';
import { MITHAI_PRODUCTS, MithaiProduct, WeightOption } from './data/mithai';

export function App() {
  const [loaded, setLoaded] = useState(false);
  const [heroDiving, setHeroDiving] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MithaiProduct | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastText, setToastText] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      key: `${MITHAI_PRODUCTS[0].id}__${MITHAI_PRODUCTS[0].weightOptions[0].label}`,
      product: MITHAI_PRODUCTS[0],
      weight: MITHAI_PRODUCTS[0].weightOptions[0],
      quantity: 1,
    },
  ]);

  const lenisRef = useRef<Lenis | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Pause Lenis background scroll while modal or cart drawer is open on mobile/tablet
  useEffect(() => {
    if (!lenisRef.current) return;
    if (selectedProduct || cartOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [selectedProduct, cartOpen]);

  const scrollToSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleExploreCollection = useCallback(() => {
    setHeroDiving(true);
    window.setTimeout(() => {
      const col = document.getElementById('collection');
      if (col) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(col, { immediate: true });
        } else {
          col.scrollIntoView();
        }
      }
    }, 620);
    window.setTimeout(() => {
      setHeroDiving(false);
    }, 1250);
  }, []);

  const showToast = useCallback((message: string) => {
    setToastText(message);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setToastText(null);
    }, 2800);
  }, []);

  const addToCart = useCallback(
    (product: MithaiProduct, weight: WeightOption, quantity = 1) => {
      const key = `${product.id}__${weight.label}`;
      setCartItems((prev) => {
        const existing = prev.find((item) => item.key === key);
        if (existing) {
          return prev.map((item) =>
            item.key === key ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [...prev, { key, product, weight, quantity }];
      });
      showToast(`${product.name} (${weight.label}) added to Royal Coffret`);
    },
    [showToast]
  );

  const handleQuickAdd = useCallback(
    (product: MithaiProduct) => {
      addToCart(product, product.weightOptions[0], 1);
    },
    [addToCart]
  );

  const handleUpdateQty = useCallback((key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const handleRemoveItem = useCallback((key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#510D19] text-[#F5EBDD]">
      <CustomCursor />

      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      <Header
        cartCount={totalCount}
        onOpenCart={() => setCartOpen(true)}
        onNavigate={scrollToSection}
      />

      <main>
        <HeroSection
          ready={loaded}
          diving={heroDiving}
          onExploreClick={handleExploreCollection}
        />

        <CollectionSection
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickAdd={handleQuickAdd}
        />

        <SignatureSection />

        <StorySection />

        <CraftsmanshipSection />
      </main>

      <ContactFooter onNavigate={scrollToSection} />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToBag={addToCart}
      />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Subtle Royal Acquisition Toast */}
      {toastText && (
        <div className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full border border-[#E5CC91]/60 bg-[#2A050C]/92 px-6 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl">
          <span className="font-mono text-[11px] tracking-[0.18em] text-[#E5CC91] uppercase">
            {toastText}
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
