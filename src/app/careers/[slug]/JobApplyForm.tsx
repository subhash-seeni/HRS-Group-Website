'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface Props {
  jobTitle: string;
  jobId: string;
}

export const JobApplyForm: React.FC<Props> = ({ jobTitle, jobId }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentLocation: '',
    experienceYears: '',
    portfolioUrl: '',
    coverNote: '',
    honeypot: '', // bot trap
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      setStatus('success');
      return;
    }

    if (!formData.fullName || !formData.email || !formData.phone) {
      setErrorMessage('Please fill in all required fields.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    // Simulate async submission with direct acknowledgement
    setTimeout(() => {
      setStatus('success');
    }, 800);
  };

  if (status === 'success') {
    return (
      <div className="p-6 border border-emerald-300 bg-emerald-50/50 text-emerald-950 space-y-3">
        <div className="flex items-center gap-2 text-emerald-800">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold">
            Application received
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed m-0">
          Thank you for applying for the <strong>{jobTitle}</strong> position. Your credentials have been routed directly to our division recruitment team. We will contact you within two business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
      {/* Honeypot field (hidden from screen) */}
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

      <div>
        <label htmlFor="fullName" className="block font-semibold text-neutral-700 mb-1">
          Full name *
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          value={formData.fullName}
          onChange={handleChange}
          placeholder="e.g. Ramesh Patel"
          className="w-full h-10 px-3 bg-white border border-[var(--ink)]/20 text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="email" className="block font-semibold text-neutral-700 mb-1">
            Email address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="ramesh@example.com"
            className="w-full h-10 px-3 bg-white border border-[var(--ink)]/20 text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block font-semibold text-neutral-700 mb-1">
            Phone number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full h-10 px-3 bg-white border border-[var(--ink)]/20 text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="currentLocation" className="block font-semibold text-neutral-700 mb-1">
            Current city
          </label>
          <input
            id="currentLocation"
            name="currentLocation"
            type="text"
            value={formData.currentLocation}
            onChange={handleChange}
            placeholder="e.g. Ahmedabad, Bengaluru"
            className="w-full h-10 px-3 bg-white border border-[var(--ink)]/20 text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
          />
        </div>

        <div>
          <label htmlFor="experienceYears" className="block font-semibold text-neutral-700 mb-1">
            Years of experience
          </label>
          <input
            id="experienceYears"
            name="experienceYears"
            type="text"
            value={formData.experienceYears}
            onChange={handleChange}
            placeholder="e.g. 5 years"
            className="w-full h-10 px-3 bg-white border border-[var(--ink)]/20 text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="portfolioUrl" className="block font-semibold text-neutral-700 mb-1">
          LinkedIn profile or online portfolio
        </label>
        <input
          id="portfolioUrl"
          name="portfolioUrl"
          type="url"
          value={formData.portfolioUrl}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/username"
          className="w-full h-10 px-3 bg-white border border-[var(--ink)]/20 text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors"
        />
      </div>

      <div>
        <label htmlFor="coverNote" className="block font-semibold text-neutral-700 mb-1">
          Cover note or career summary
        </label>
        <textarea
          id="coverNote"
          name="coverNote"
          rows={3}
          value={formData.coverNote}
          onChange={handleChange}
          placeholder="Briefly state your technical background and notice period."
          className="w-full p-3 bg-white border border-[var(--ink)]/20 text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] text-white py-3 text-xs font-bold tracking-tight hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50"
      >
        <span>{status === 'submitting' ? 'Submitting...' : 'Submit application'}</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </form>
  );
};

export default JobApplyForm;
