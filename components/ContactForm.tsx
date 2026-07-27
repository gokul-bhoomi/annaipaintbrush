'use client';

import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

import { copy } from '@/lib/copy';

/**
 * Enquiry form.
 *
 * Replaces two near-identical copies of the same logic (ContactForm.js and
 * Modal.js), which each hardcoded the EmailJS service, template and user id,
 * passed a CSS class string to `sendForm`, had no validation beyond the browser
 * default, and swallowed failures in a `.catch(() => () => ...)` that returned
 * a function instead of calling one, so the error toast never fired.
 *
 * NOTE ON THE KEYS: an EmailJS public key is designed to sit in the browser and
 * is visible in the bundle either way. Moving it to an environment variable is
 * about not hardcoding it in two components and being able to rotate it, not
 * about hiding it. Anyone can post to the endpoint, which is why the honeypot
 * below matters.
 */

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'phone', string>>;

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').replace(/\D/g, '');

    if (!name) next.name = copy.contact.required;
    // Email is optional, but must be valid if given.
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      next.email = copy.contact.invalidEmail;
    }
    if (!phone) next.phone = copy.contact.required;
    // Indian mobile numbers are 10 digits, optionally with a 91 country code.
    else if (!/^(91)?[6-9]\d{9}$/.test(phone)) next.phone = copy.contact.invalidPhone;

    return next;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: a field hidden from people but filled in by most bots.
    if (String(data.get('company') ?? '')) {
      setStatus('sent');
      form.reset();
      return;
    }

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstInvalid = form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`);
      firstInvalid?.focus();
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      // Misconfigured build: fail visibly rather than pretending it sent.
      console.error('EmailJS environment variables are missing. See .env.example.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY });
      setStatus('sent');
      form.reset();
    } catch (error) {
      console.error('Enquiry failed to send', error);
      setStatus('error');
    }
  };

  const field =
    'w-full rounded-lg border bg-paper px-4 py-3 text-[0.95rem] text-ink-800 transition-colors placeholder:text-ink-400 focus:outline-none';

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink-700">
          {copy.contact.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={`mt-2 ${field} ${errors.name ? 'border-brand-600' : 'border-line focus:border-ink-400'}`}
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-sm text-brand-700">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-ink-700">
          {copy.contact.mobile}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          className={`mt-2 ${field} ${errors.phone ? 'border-brand-600' : 'border-line focus:border-ink-400'}`}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-2 text-sm text-brand-700">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink-700">
          {copy.contact.emailField}{' '}
          <span className="font-normal text-ink-400">(optional)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={`mt-2 ${field} ${errors.email ? 'border-brand-600' : 'border-line focus:border-ink-400'}`}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-brand-700">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink-700">
          {copy.contact.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={`mt-2 resize-y ${field} border-line focus:border-ink-400`}
        />
      </div>

      {/* Honeypot. Hidden from people, left in the tab order's blind spot and
          announced as unused so screen readers skip it too. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-full bg-ink-900 px-7 py-3.5 text-[0.95rem] font-medium text-paper transition-colors hover:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'sending' ? copy.contact.sending : copy.contact.submit}
        </button>

        {/* Announced to screen readers as the status changes. */}
        <p
          role="status"
          aria-live="polite"
          className={`text-sm ${status === 'error' ? 'text-brand-700' : 'text-ink-500'}`}
        >
          {status === 'sent' && copy.contact.success}
          {status === 'error' && copy.contact.error}
        </p>
      </div>
    </form>
  );
}
