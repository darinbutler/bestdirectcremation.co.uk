'use client';

import { useState } from 'react';

/**
 * Funeral Director partner signup form.
 *
 * Uses Web3Forms (https://web3forms.com) — a free, no-API-key form
 * backend. The form submits directly to Web3Forms which then emails
 * the contents to care@bestfunerals.co.uk.
 *
 * SETUP (one-time, by Darin):
 *   1. Go to web3forms.com → "Create your access key"
 *   2. Enter email: care@bestfunerals.co.uk
 *   3. Verify the email
 *   4. Copy the access key
 *   5. Add to .env.local as NEXT_PUBLIC_WEB3FORMS_KEY=xxxx-xxxx-...
 *
 * That's it — no backend, no SMTP credentials, no DNS configuration.
 */

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '';

export default function PartnerSignupForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    formData.append('access_key', ACCESS_KEY);
    formData.append('subject', 'New Funeral Director partner enquiry — bestdirectcremation.co.uk');
    formData.append('from_name', 'Best Direct Cremation website');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Please try again or email care@bestfunerals.co.uk directly.');
    }
  }

  if (!ACCESS_KEY) {
    return (
      <div className="bg-gold/10 border border-gold/30 rounded-2xl p-6 text-sm text-ink/80">
        <p className="font-semibold text-gold-dark mb-2">Form not yet configured</p>
        <p>The form will be active once the Web3Forms access key has been added. In the meantime, please email{' '}
          <a href="mailto:care@bestfunerals.co.uk" className="text-gold underline hover:text-gold-dark">care@bestfunerals.co.uk</a>{' '}
          directly with your funeral director details.
        </p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="bg-green text-cream rounded-2xl p-6 md:p-8 text-center">
        <svg className="w-12 h-12 text-gold mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h3 className="font-serif text-2xl text-white mb-2">Thank you</h3>
        <p className="text-cream/90">
          We&apos;ve received your enquiry and will be in touch within 2 working days. If you need to reach us
          sooner, email{' '}
          <a href="mailto:care@bestfunerals.co.uk" className="text-gold underline hover:text-white">care@bestfunerals.co.uk</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-card border border-stone">
      <p className="text-xs uppercase tracking-wider text-gold font-bold mb-6">Your details</p>

      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <label className="block">
          <span className="block text-sm font-semibold text-green mb-1">Funeral home / business name <span className="text-gold">*</span></span>
          <input required type="text" name="business_name" className="w-full p-3 rounded-lg border-2 border-stone bg-white focus:border-gold focus:outline-none" />
        </label>
        <label className="block">
          <span className="block text-sm font-semibold text-green mb-1">Your name <span className="text-gold">*</span></span>
          <input required type="text" name="contact_name" className="w-full p-3 rounded-lg border-2 border-stone bg-white focus:border-gold focus:outline-none" />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <label className="block">
          <span className="block text-sm font-semibold text-green mb-1">Email <span className="text-gold">*</span></span>
          <input required type="email" name="email" className="w-full p-3 rounded-lg border-2 border-stone bg-white focus:border-gold focus:outline-none" />
        </label>
        <label className="block">
          <span className="block text-sm font-semibold text-green mb-1">Phone <span className="text-gold">*</span></span>
          <input required type="tel" name="phone" className="w-full p-3 rounded-lg border-2 border-stone bg-white focus:border-gold focus:outline-none" />
        </label>
      </div>

      <label className="block mb-5">
        <span className="block text-sm font-semibold text-green mb-1">Business address (full postal address) <span className="text-gold">*</span></span>
        <textarea required name="address" rows={3} className="w-full p-3 rounded-lg border-2 border-stone bg-white focus:border-gold focus:outline-none" />
      </label>

      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <label className="block">
          <span className="block text-sm font-semibold text-green mb-1">Town / city you serve <span className="text-gold">*</span></span>
          <input required type="text" name="service_area" className="w-full p-3 rounded-lg border-2 border-stone bg-white focus:border-gold focus:outline-none" />
        </label>
        <label className="block">
          <span className="block text-sm font-semibold text-green mb-1">Accreditation</span>
          <select name="accreditation" className="w-full p-3 rounded-lg border-2 border-stone bg-white focus:border-gold focus:outline-none">
            <option value="">Select…</option>
            <option value="NAFD">NAFD member</option>
            <option value="SAIF">SAIF member</option>
            <option value="Both">NAFD and SAIF</option>
            <option value="Neither">Neither (please explain below)</option>
          </select>
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <label className="block">
          <span className="block text-sm font-semibold text-green mb-1">Years in business</span>
          <input type="text" name="years_in_business" className="w-full p-3 rounded-lg border-2 border-stone bg-white focus:border-gold focus:outline-none" />
        </label>
        <label className="block">
          <span className="block text-sm font-semibold text-green mb-1">Own mortuary on premises?</span>
          <select name="own_mortuary" className="w-full p-3 rounded-lg border-2 border-stone bg-white focus:border-gold focus:outline-none">
            <option value="">Select…</option>
            <option value="Yes">Yes</option>
            <option value="No — third-party">No — we use a third-party mortuary</option>
            <option value="No — hospital">No — hospital mortuary only</option>
          </select>
        </label>
      </div>

      <label className="block mb-5">
        <span className="block text-sm font-semibold text-green mb-1">Tell us about your funeral home</span>
        <textarea name="message" rows={5} placeholder="Any relevant detail about your business, your team, what makes you a good fit for our network…" className="w-full p-3 rounded-lg border-2 border-stone bg-white focus:border-gold focus:outline-none" />
      </label>

      {/* Honeypot field — bots fill this, humans don't see it */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      <div className="mb-5">
        <label className="flex items-start gap-3 text-sm text-ink/80">
          <input required type="checkbox" name="consent" className="mt-1 accent-gold" />
          <span>I consent to Best Direct Cremation contacting me about partner network opportunities and storing the data I&apos;ve submitted in line with their <a href="/privacy-policy/" className="text-gold underline hover:text-gold-dark">Privacy Policy</a>.</span>
        </label>
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          Submission failed: {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green text-white px-8 py-4 rounded-full font-semibold hover:bg-green-dark transition shadow-lift disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending…' : (
          <>
            Submit enquiry
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </>
        )}
      </button>

      <p className="text-xs text-ink/60 italic mt-4">
        Submissions go directly to care@bestfunerals.co.uk. We respond within 2 working days.
      </p>
    </form>
  );
}
