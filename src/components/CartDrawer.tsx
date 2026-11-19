import { useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { MithaiProduct, WeightOption } from '../data/mithai';

export interface CartItem {
  key: string;
  product: MithaiProduct;
  weight: WeightOption;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearCart: () => void;
}

export const CartDrawer = ({
  open,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) => {
  const [giftNote, setGiftNote] = useState('');
  const [waxSeal, setWaxSeal] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.weight.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setOrderPlaced(true);
    window.setTimeout(() => {
      onClearCart();
      setGiftNote('');
    }, 300);
  };

  const handleClose = () => {
    setOrderPlaced(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-[88] bg-[#160206]/75 backdrop-blur-sm transition-opacity duration-500 ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 bottom-0 z-[90] flex h-[100dvh] w-full max-w-md flex-col border-l border-[#C6A15B]/30 bg-[#2C060D] shadow-[-20px_0_70px_rgba(0,0,0,0.75)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#C6A15B]/25 px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-4 w-4 text-[#E5CC91]" />
            <div>
              <h2 className="font-display text-base tracking-[0.22em] text-[#E5CC91] uppercase">
                Royal Coffret
              </h2>
              <p className="font-mono text-[10px] tracking-[0.18em] text-[#F5EBDD]/60 uppercase">
                Temperature-Controlled Courier
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close Royal Coffret"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C6A15B]/35 text-[#E5CC91] transition-colors hover:border-[#E5CC91] hover:bg-[#510D19]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-6">
          {orderPlaced ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#E5CC91] bg-[#510D19] text-[#E5CC91]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <p className="mt-6 font-mono text-[10px] tracking-[0.28em] text-[#D88A32] uppercase">
                Atelier Reservation Confirmed
              </p>
              <h3 className="mt-2 font-serif text-3xl text-[#F5EBDD]">
                Your Coffret Is Being Handcrafted
              </h3>
              <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-[#F5EBDD]/75">
                Our Jaipur master halwais prepare each reservation fresh at dawn. A royal
                dispatch dossier has been logged for your delivery.
              </p>
              <button
                onClick={handleClose}
                className="mt-8 rounded-full border border-[#E5CC91] px-7 py-3 font-mono text-[11px] tracking-[0.22em] text-[#E5CC91] uppercase transition-colors hover:bg-[#E5CC91] hover:text-[#23040A]"
              >
                Return to Gallery
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C6A15B]/30 bg-[#3B0812]/70 text-[#C6A15B]/70">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <p className="mt-5 font-serif text-2xl text-[#F5EBDD]">
                Your Royal Coffret Awaits
              </p>
              <p className="mt-2 max-w-xs font-sans text-xs leading-relaxed text-[#F5EBDD]/65">
                Explore our handcrafted Kaju Katli, Saffron Rasmalai, and festive jewels to
                compose your bespoke velvet chest.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex gap-4 rounded-2xl border border-[#C6A15B]/25 bg-[#3A0812]/70 p-3.5"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-20 w-16 shrink-0 rounded-xl object-cover border border-[#C6A15B]/25"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-serif text-lg leading-tight text-[#F5EBDD]">
                          {item.product.name}
                        </h4>
                        <p className="mt-0.5 font-mono text-[10px] tracking-[0.14em] text-[#C6A15B] uppercase">
                          {item.weight.label}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.key)}
                        aria-label={`Remove ${item.product.name}`}
                        className="text-[#F5EBDD]/45 transition-colors hover:text-[#E5CC91]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-[#C6A15B]/30 bg-[#25050B] px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQty(item.key, -1)}
                          aria-label="Decrease quantity"
                          className="p-1 text-[#E5CC91] hover:opacity-75"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-4 text-center font-mono text-xs text-[#F5EBDD]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.key, 1)}
                          aria-label="Increase quantity"
                          className="p-1 text-[#E5CC91] hover:opacity-75"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="font-serif text-lg text-[#E5CC91]">
                        ₹{(item.weight.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Royal Gift Note & Wax Seal Option */}
              <div className="mt-6 rounded-2xl border border-[#C6A15B]/25 bg-[#25050B]/70 p-4">
                <label className="flex cursor-pointer items-center justify-between gap-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#E5CC91] uppercase">
                    Complimentary Gold Wax Seal & Ribbon
                  </span>
                  <input
                    type="checkbox"
                    checked={waxSeal}
                    onChange={(e) => setWaxSeal(e.target.checked)}
                    className="h-4 w-4 accent-[#C6A15B]"
                  />
                </label>

                <textarea
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  rows={2}
                  placeholder="Optional calligraphic note for the velvet card..."
                  className="mt-3 w-full rounded-xl border border-[#C6A15B]/25 bg-[#3A0812]/50 px-3.5 py-2.5 font-serif text-sm text-[#F5EBDD] placeholder:text-[#F5EBDD]/40 focus:border-[#E5CC91] focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && !orderPlaced && (
          <div className="border-t border-[#C6A15B]/25 bg-[#25050B] px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-xs tracking-[0.22em] text-[#C6A15B] uppercase">
                Total Tribute
              </span>
              <span className="font-display text-2xl text-[#E5CC91]">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="mt-1 font-sans text-[11px] text-[#F5EBDD]/60">
              Complimentary white-glove chilled dispatch across India & select global cities.
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full rounded-full bg-gradient-to-r from-[#C6A15B] via-[#E5CC91] to-[#C6A15B] py-4 font-sans text-xs font-semibold tracking-[0.24em] text-[#23040A] uppercase shadow-[0_8px_30px_rgba(198,161,91,0.3)] transition-all hover:shadow-[0_12px_40px_rgba(229,204,145,0.45)]"
            >
              Reserve Royal Dispatch
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
