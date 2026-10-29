'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { entities } from '@/content/entities';
import { Logo } from '@/components/ui/Logo';

export const ContactForm: React.FC = () => {
  const searchParams = useSearchParams();
  const entityParam = searchParams.get('entity');

  const [formData, setFormData] = useState({
    entitySlug: entityParam || 'hrs-group',
    inquiryType: 'commercial',
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (entityParam && (entityParam === 'hrs-group' || entities.some((e) => e.slug === entityParam))) {
      setFormData((prev) => ({ ...prev, entitySlug: entityParam }));
    }
  }, [entityParam]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectEntity = (slug: string) => {
    setFormData((prev) => ({ ...prev, entitySlug: slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      setStatus('success');
      return;
    }

    if (!formData.fullName || !formData.companyName || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    setTimeout(() => {
      setStatus('success');
    }, 800);
  };

  if (status === 'success') {
    const selectedEntityName =
      formData.entitySlug === 'hrs-group'
        ? 'HRS Group Corporate Registry'
        : entities.find((e) => e.slug === formData.entitySlug)?.name || 'HRS Group';

    return (
      <div className="p-8 border border-emerald-300 bg-emerald-50/70 text-emerald-950 space-y-4">
        <div className="flex items-center gap-3 text-emerald-800">
          <CheckCircle2 className="h-6 w-6 shrink-0" />
          <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold">
            Enquiry routed successfully
          </h3>
        </div>
        <p className="text-sm text-emerald-900 leading-relaxed m-0">
          Thank you for contacting <strong>{selectedEntityName}</strong>. Your enquiry has been received directly by the designated operational unit desk. A confirmed commercial or technical acknowledgment will be returned within one working day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 font-sans text-xs">
      {/* Honeypot field */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {status === 'error' && (
        <div className="p-3 border border-red-300 bg-red-50 text-red-800 flex items-center gap-2 text-xs">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Target Business Quick Selector Pills */}
      <div>
        <label className="block font-bold text-neutral-800 mb-2">
          Select target operating business *
        </label>
        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-1.5 border border-neutral-200 bg-white">
          <button
            type="button"
            onClick={() => handleSelectEntity('hrs-group')}
            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
              formData.entitySlug === 'hrs-group'
                ? 'bg-[var(--ink)] text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            HRS Group (Corporate)
          </button>
          {entities.map((e) => (
            <button
              key={e.slug}
              type="button"
              onClick={() => handleSelectEntity(e.slug)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                formData.entitySlug === e.slug
                  ? 'bg-[var(--ink)] text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {e.shortName || e.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inquiryType" className="block font-bold text-neutral-800 mb-1">
            Enquiry category *
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className="w-full h-11 px-3 bg-white border border-neutral-300 text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors cursor-pointer"
          >
            <option value="commercial">Commercial contract / Tender</option>
            <option value="facade-engineering">Facade engineering & fabrication</option>
            <option value="property-leasing">Residential purchase / Commercial leasing</option>
            <option value="retail-distribution">Retail distribution & stockist</option>
            <option value="spice-processing">Spice milling & contract packaging</option>
            <option value="brand-services">Brand strategy & visual identity</option>
            <option value="general">General corporate inquiry</option>
          </select>
        </div>

        <div>
          <label htmlFor="fullName" className="block font-bold text-neutral-800 mb-1">
            Full name *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Vikram Shah"
            className="w-full h-11 px-3 bg-white border border-neutral-300 text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="companyName" className="block font-bold text-neutral-800 mb-1">
            Organization or firm name *
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            required
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. Apex Infra Ltd"
            className="w-full h-11 px-3 bg-white border border-neutral-300 text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-bold text-neutral-800 mb-1">
            Business email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="vikram@apexinfra.com"
            className="w-full h-11 px-3 bg-white border border-neutral-300 text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block font-bold text-neutral-800 mb-1">
          Contact telephone *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 98250 12345"
          className="w-full h-11 px-3 bg-white border border-neutral-300 text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-bold text-neutral-800 mb-1">
          Project scope or technical specifications *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Please describe project location, facade area, leasing requirements, or product scope."
          className="w-full p-3 bg-white border border-neutral-300 text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] text-white py-3.5 text-xs font-bold tracking-tight hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50"
      >
        <span>{status === 'submitting' ? 'Routing enquiry...' : 'Transmit commercial enquiry'}</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </form>
  );
};

export default ContactForm;
