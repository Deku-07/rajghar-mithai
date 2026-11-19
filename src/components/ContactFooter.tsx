import { useState } from 'react';
import { ArrowUpRight, Check, MapPin, Send } from 'lucide-react';

const SALONS = [
  {
    city: 'JAIPUR FLAGSHIP',
    address: 'Hawa Mahal Heritage Enclave, Johari Bazaar',
    hours: '10:00 AM — 9:30 PM',
  },
  {
    city: 'NEW DELHI SALON',
    address: 'The Chanakya Courtyard, Chanakyapuri',
    hours: '11:00 AM — 9:00 PM',
  },
  {
    city: 'MUMBAI ATELIER',
    address: 'Kala Ghoda Art Precinct, Fort',
    hours: '11:00 AM — 9:30 PM',
  },
  {
    city: 'LONDON MAYFAIR',
    address: 'Mount Street Private Tasting Room (By Appt.)',
    hours: 'Tue — Sun · Private Concierge',
  },
];

interface ContactFooterProps {
  onNavigate: (id: string) => void;
}

export const ContactFooter = ({ onNavigate }: ContactFooterProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [occasion, setOccasion] = useState('Royal Wedding & Trousseau');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
    window.setTimeout(() => {
      setName('');
      setEmail('');
    }, 300);
  };

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-[#C6A15B]/25 bg-[#23040A] pt-24 pb-12"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[960px] -translate-x-1/2"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(198,161,91,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10">
        {/* Top Split: Concierge Inquiry & Tasting Salons */}
        <div className="grid grid-cols-1 gap-14 border-b border-[#C6A15B]/20 pb-20 lg:grid-cols-12">
          {/* Private Concierge / Bespoke Gifting */}
          <div className="lg:col-span-6">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#D88A32] uppercase">
              Royal Concierge & Bespoke Gifting
            </span>
            <h2 className="mt-3 font-display text-3xl leading-tight tracking-[0.04em] text-[#F5EBDD] sm:text-5xl">
              COMMISSION YOUR <br />
              <span className="text-antique-gold font-serif italic font-normal">
                Bespoke Mithai Chest.
              </span>
            </h2>
            <p className="mt-4 max-w-md font-serif text-lg text-[#F5EBDD]/78">
              For royal weddings, diplomatic state gifts, and private festive editions, our
              atelier composes custom monogrammed velvet trunks.
            </p>

            {submitted ? (
              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-[#E5CC91]/50 bg-[#3B0812]/80 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E5CC91] text-[#23040A]">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-serif text-xl text-[#E5CC91]">
                    Dossier Received by the Jaipur Salon
                  </p>
                  <p className="mt-0.5 font-sans text-xs text-[#F5EBDD]/75">
                    Our Head Concierge will respond within 24 hours with a private tasting
                    invitation.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-lg">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Full Name"
                    className="rounded-xl border border-[#C6A15B]/30 bg-[#380711]/70 px-4 py-3.5 font-sans text-sm text-[#F5EBDD] placeholder:text-[#F5EBDD]/45 focus:border-[#E5CC91] focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="rounded-xl border border-[#C6A15B]/30 bg-[#380711]/70 px-4 py-3.5 font-sans text-sm text-[#F5EBDD] placeholder:text-[#F5EBDD]/45 focus:border-[#E5CC91] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="flex-1 rounded-xl border border-[#C6A15B]/30 bg-[#380711]/70 px-4 py-3.5 font-sans text-sm text-[#F5EBDD] focus:border-[#E5CC91] focus:outline-none"
                  >
                    <option value="Royal Wedding & Trousseau">Royal Wedding & Trousseau</option>
                    <option value="Diwali Sovereign Edition">Diwali Sovereign Edition</option>
                    <option value="Private Salon Tasting">Private Salon Tasting</option>
                    <option value="Corporate & Diplomatic Gifting">
                      Corporate & Diplomatic Gifting
                    </option>
                  </select>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-[#E5CC91] bg-[#E5CC91] px-6 py-3.5 font-mono text-xs font-semibold tracking-[0.2em] text-[#23040A] uppercase transition-all hover:bg-[#C6A15B]"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Inquire</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Tasting Salons Grid */}
          <div className="lg:col-span-6">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#C6A15B] uppercase">
              Royal Tasting Salons
            </span>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {SALONS.map((salon) => (
                <div
                  key={salon.city}
                  className="group rounded-2xl border border-[#C6A15B]/20 bg-[#33070F]/60 p-5 transition-colors hover:border-[#E5CC91]/55"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-[0.22em] text-[#E5CC91]">
                      {salon.city}
                    </span>
                    <MapPin className="h-3.5 w-3.5 text-[#C6A15B]/75" />
                  </div>
                  <p className="mt-2.5 font-serif text-lg leading-snug text-[#F5EBDD]">
                    {salon.address}
                  </p>
                  <p className="mt-2 font-mono text-[10px] tracking-[0.14em] text-[#F5EBDD]/55 uppercase">
                    {salon.hours}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Architectural Brand Signature */}
        <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-2xl tracking-[0.32em] text-[#E5CC91]">RAJGHAR</p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.24em] text-[#F5EBDD]/55 uppercase">
              © 2026 Rajghar Heritage Confections Pvt. Ltd. · All Rights Reserved
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            {[
              { label: 'Collection', id: 'collection' },
              { label: 'Signature', id: 'signature' },
              { label: 'Our Story', id: 'story' },
              { label: 'The Craft', id: 'craft' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.2em] text-[#C6A15B] uppercase transition-colors hover:text-[#E5CC91]"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
