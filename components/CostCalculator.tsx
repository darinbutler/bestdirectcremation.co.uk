'use client';

import { useState, useMemo } from 'react';
import PhoneCTA from './PhoneCTA';
import CountUp from './CountUp';
import { SITE } from '@/lib/site';

/**
 * Interactive funeral cost calculator. Client-side state, no submission.
 * User picks funeral type, region, and Priority Care need; sees BDC's price
 * compared to the UK average and major competitors, with the savings figure
 * called out prominently.
 *
 * Data: pricing baselines from SunLife Cost of Dying Report 2026 + Apify-
 * verified competitor pricing as of June 2026.
 */

type FuneralType = 'direct' | 'attended' | 'traditional' | 'burial';

const TYPES: { id: FuneralType; label: string; description: string }[] = [
  { id: 'direct',      label: 'Direct cremation',       description: 'Simple cremation, no service at the crematorium' },
  { id: 'attended',    label: 'Attended cremation',     description: 'Brief 20-30 min service with family present' },
  { id: 'traditional', label: 'Traditional cremation',  description: 'Full ceremonial cremation funeral' },
  { id: 'burial',      label: 'Traditional burial',     description: 'Burial with plot, headstone separate' },
];

// Regional cost multipliers (vs national average) — sourced from SunLife 2026
const REGIONS: { id: string; label: string; multiplier: number }[] = [
  { id: 'london',     label: 'London',                    multiplier: 1.14 },
  { id: 'south-east', label: 'South East',                multiplier: 1.05 },
  { id: 'south-west', label: 'South West',                multiplier: 1.02 },
  { id: 'midlands',   label: 'Midlands',                  multiplier: 0.99 },
  { id: 'north',      label: 'North England',             multiplier: 0.96 },
  { id: 'wales',      label: 'Wales',                     multiplier: 0.96 },
  { id: 'scotland',   label: 'Scotland',                  multiplier: 0.95 },
  { id: 'ni',         label: 'Northern Ireland',          multiplier: 0.92 },
];

// Baseline national average prices in 2026 (£)
const BASE_PRICES: Record<FuneralType, number> = {
  direct:      1500,
  attended:    3200,
  traditional: 4510,
  burial:      6500,
};

// BDC pricing — fixed nationally
const BDC_DIRECT_BASE = 1499;
const BDC_PRIORITY_CARE = 250;

// Major UK competitor direct-cremation prices (approx, June 2026)
const COMPETITOR_PRICES: { name: string; price: number; note: string }[] = [
  { name: 'Pure Cremation',     price: 2000, note: 'Centralised' },
  { name: 'Co-op Funeralcare',  price: 1995, note: 'National chain' },
  { name: 'Dignity',            price: 2200, note: 'Vertically integrated' },
  { name: 'Aura',               price: 1745, note: 'Regional' },
];

export default function CostCalculator() {
  const [type, setType] = useState<FuneralType>('direct');
  const [region, setRegion] = useState<string>('midlands');
  const [priorityCare, setPriorityCare] = useState<boolean>(true);

  const multiplier = REGIONS.find(r => r.id === region)?.multiplier || 1;

  // Estimated UK cost for the picked type + region
  const ukAverage = useMemo(() => Math.round(BASE_PRICES[type] * multiplier), [type, multiplier]);

  // BDC price (only meaningful for direct cremation)
  const bdcPrice = priorityCare ? BDC_DIRECT_BASE + BDC_PRIORITY_CARE : BDC_DIRECT_BASE;

  // Savings vs the picked funeral type
  const savings = Math.max(0, ukAverage - bdcPrice);

  return (
    <section className="bg-cream/40 border-y border-stone">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <p className="text-center text-sm uppercase tracking-widest text-gold font-semibold mb-3">
          Funeral cost calculator
        </p>
        <h2 className="text-center font-serif text-2xl md:text-4xl text-green mb-3 max-w-3xl mx-auto leading-tight">
          See your potential saving in 30 seconds
        </h2>
        <p className="text-center text-ink/75 max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed">
          Pick a funeral type and region. We&apos;ll show you the typical UK cost vs Best Direct Cremation&apos;s
          £1,499 all-inclusive price, with major competitors for context.
        </p>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start">

          {/* Controls */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card border border-stone">

            {/* Step 1 — Funeral type */}
            <fieldset className="mb-8">
              <legend className="text-sm font-bold text-green uppercase tracking-wider mb-3">1 · Type of funeral</legend>
              <div className="space-y-2">
                {TYPES.map(t => (
                  <label key={t.id} className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer border-2 transition ${
                    type === t.id ? 'border-gold bg-gold/5' : 'border-transparent hover:bg-cream/50'
                  }`}>
                    <input
                      type="radio"
                      name="funeral-type"
                      value={t.id}
                      checked={type === t.id}
                      onChange={() => setType(t.id)}
                      className="mt-1 accent-gold"
                    />
                    <span>
                      <span className="block font-serif text-green">{t.label}</span>
                      <span className="block text-xs text-ink/65">{t.description}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Step 2 — Region */}
            <fieldset className="mb-8">
              <legend className="text-sm font-bold text-green uppercase tracking-wider mb-3">2 · Where you are</legend>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-stone bg-white font-serif text-green focus:border-gold focus:outline-none"
              >
                {REGIONS.map(r => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </fieldset>

            {/* Step 3 — Priority Care (only relevant for direct cremation) */}
            {type === 'direct' && (
              <fieldset className="mb-2">
                <legend className="text-sm font-bold text-green uppercase tracking-wider mb-3">3 · Collection location</legend>
                <div className="space-y-2">
                  <label className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer border-2 transition ${
                    !priorityCare ? 'border-gold bg-gold/5' : 'border-transparent hover:bg-cream/50'
                  }`}>
                    <input
                      type="radio"
                      name="priority-care"
                      checked={!priorityCare}
                      onChange={() => setPriorityCare(false)}
                      className="mt-1 accent-gold"
                    />
                    <span>
                      <span className="block font-serif text-green">Hospital or coroner&apos;s mortuary</span>
                      <span className="block text-xs text-ink/65">No Priority Care fee — £1,499 all-inclusive</span>
                    </span>
                  </label>
                  <label className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer border-2 transition ${
                    priorityCare ? 'border-gold bg-gold/5' : 'border-transparent hover:bg-cream/50'
                  }`}>
                    <input
                      type="radio"
                      name="priority-care"
                      checked={priorityCare}
                      onChange={() => setPriorityCare(true)}
                      className="mt-1 accent-gold"
                    />
                    <span>
                      <span className="block font-serif text-green">Home, care home or hospice</span>
                      <span className="block text-xs text-ink/65">£250 Priority Care add-on — £1,749 total</span>
                    </span>
                  </label>
                </div>
              </fieldset>
            )}
          </div>

          {/* Result panel */}
          <div className="bg-green text-cream rounded-2xl p-6 md:p-8 shadow-lift">

            {savings > 0 ? (
              // ── SAVINGS MODE: user is beating the regional average ────────
              <>
                <p className="text-xs uppercase tracking-wider text-gold font-bold mb-3">Your estimated saving</p>
                <div className="mb-6">
                  <p className="font-serif text-5xl md:text-6xl text-white leading-none mb-2">
                    <CountUp value={savings} key={savings} />
                  </p>
                  <p className="text-cream/85 text-sm md:text-base">
                    saved vs typical {TYPES.find(t => t.id === type)?.label.toLowerCase()} in {REGIONS.find(r => r.id === region)?.label}
                  </p>
                </div>

                {/* Price card — BDC vs the regional average */}
                <div className="bg-green-dark rounded-xl p-4 mb-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gold font-bold mb-0.5">Best Direct Cremation</p>
                      <p className="font-serif text-2xl md:text-3xl text-white">£{bdcPrice.toLocaleString()}</p>
                      <p className="text-[10px] text-cream/70">{priorityCare ? 'inc. Priority Care' : 'all-inclusive'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-cream/70 font-bold mb-0.5">
                        {TYPES.find(t => t.id === type)?.label}
                      </p>
                      <p className="font-serif text-2xl md:text-3xl text-cream/85">£{ukAverage.toLocaleString()}</p>
                      <p className="text-[10px] text-cream/60">{REGIONS.find(r => r.id === region)?.label} average</p>
                    </div>
                  </div>
                </div>

                {type === 'direct' && (
                  <div className="mb-5">
                    <p className="text-xs uppercase tracking-wider text-gold font-bold mb-2">vs other direct cremation providers</p>
                    <ul className="space-y-1.5">
                      {COMPETITOR_PRICES.map(c => (
                        <li key={c.name} className="flex items-center justify-between text-sm bg-green-dark/50 rounded-lg px-3 py-2">
                          <span className="text-cream/85">{c.name} <span className="text-xs text-cream/55">({c.note})</span></span>
                          <span className="font-serif text-cream">
                            £{c.price.toLocaleString()}{' '}
                            {c.price > bdcPrice && <span className="text-gold text-xs">+£{(c.price - bdcPrice).toLocaleString()}</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              // ── SAME-RANGE MODE: BDC is at/near regional average ──────────
              // Reframe as: locally delivered, transparent, personal — the story is
              // about SERVICE not price. Show only BDC in the price card, plus a
              // benefits list. No competitor breakdown that could reinforce "tie".
              <>
                <p className="text-xs uppercase tracking-wider text-gold font-bold mb-3">Your estimated cost</p>
                <div className="mb-6">
                  <p className="font-serif text-4xl md:text-5xl text-white leading-tight mb-2">
                    Locally delivered.<br />Fixed price.
                  </p>
                  <p className="text-cream/85 text-sm md:text-base leading-relaxed">
                    In {REGIONS.find(r => r.id === region)?.label}, direct cremation typically sits between around{' '}
                    <span className="text-white font-medium">£{Math.round(ukAverage * 0.85).toLocaleString()}</span> and{' '}
                    <span className="text-white font-medium">£{Math.max(...COMPETITOR_PRICES.map(c => c.price)).toLocaleString()}</span>.
                    Best Direct Cremation is at the fair end of that range — with a locally delivered service and no hidden fees at the point of need.
                  </p>
                </div>

                {/* Simplified price card — just BDC. */}
                <div className="bg-green-dark rounded-xl p-5 mb-5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gold font-bold mb-1">Best Direct Cremation</p>
                  <p className="font-serif text-4xl md:text-5xl text-white leading-none mb-1.5">
                    £{bdcPrice.toLocaleString()}
                  </p>
                  <p className="text-xs text-cream/75">
                    {priorityCare ? 'all-inclusive · inc. £250 Priority Care' : 'all-inclusive · max £1,749 with Priority Care'}
                  </p>
                  <div className="border-t border-white/15 mt-4 pt-3">
                    <p className="text-[10px] uppercase tracking-wider text-cream/60 font-bold mb-0.5">
                      Regional context — {REGIONS.find(r => r.id === region)?.label}
                    </p>
                    <p className="text-sm text-cream/85">
                      Typical range £{Math.round(ukAverage * 0.85).toLocaleString()}–£{Math.max(...COMPETITOR_PRICES.map(c => c.price)).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Why BDC — the benefit list that replaces the competitor grid */}
                <div className="mb-5">
                  <p className="text-xs uppercase tracking-wider text-gold font-bold mb-3">What sets us apart</p>
                  <ul className="space-y-2">
                    {[
                      { title: 'Locally delivered', body: 'Vetted independent funeral director in your area — not centralised.' },
                      { title: 'A real person, 24 hours a day', body: 'We answer the phone ourselves. Never a chatbot or overseas call centre.' },
                      { title: 'Transparent maximum price', body: `£1,749 is the ceiling, disclosed upfront. No fees added at the point of need.` },
                      { title: 'NAFD or SAIF accredited', body: 'Every partner funeral director in our UK network is professionally accredited.' },
                    ].map(b => (
                      <li key={b.title} className="flex gap-3 bg-green-dark/50 rounded-lg px-3 py-2.5">
                        <span className="text-gold text-lg leading-none flex-shrink-0">✓</span>
                        <span>
                          <span className="block font-serif text-cream leading-snug">{b.title}</span>
                          <span className="block text-xs text-cream/70 leading-snug mt-0.5">{b.body}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            <div className="border-t border-white/15 pt-5 mt-5">
              <p className="text-sm text-cream/90 mb-4 leading-relaxed">
                Ready to arrange? A real person, 24 hours a day — every call.
              </p>
              <PhoneCTA size="lg" variant="invert" pulse />
              <p className="text-xs italic text-cream/85 mt-2">{SITE.promiseSubtext}</p>
            </div>

            <p className="text-[10px] text-cream/55 mt-5 leading-relaxed">
              Estimates based on SunLife Cost of Dying Report 2026 and publicly available provider pricing
              as of June 2026. Actual cost depends on your specific circumstances and the funeral director used.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
