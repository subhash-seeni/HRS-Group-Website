'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  'Industrial & Facade Materials',
  'Agricultural & Spice Sourcing',
  'BOGO Retail Brand Distribution',
  'Contract Logistics & Civil Services',
  'Packaging & Printing Supplies',
];

export const PartnerForm: React.FC = () => {
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    city: '',
    gstNumber: '',
    description: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email || !formData.phone) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 800);
  };

  if (status === 'success') {
    return (
      <div className="py-12 text-center space-y-4 font-sans">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[var(--ink)]">
          Partner onboarding application received
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
          Thank you for registering with HRS Group. Our procurement desk will review your business credentials and catalog and contact you within two business days.
        </p>
        <div className="pt-4">
          <button
            type="button"
            onClick={() => {
              setStatus('idle');
              setFormData({
                companyName: '',
                contactPerson: '',
                email: '',
                phone: '',
                city: '',
                gstNumber: '',
                description: '',
              });
            }}
            className="rounded-full bg-[var(--ink)] px-6 py-2.5 text-xs font-bold text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Submit another application
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-sans">
      {/* Category Pills */}
      <div>
        <label className="block text-xs font-semibold text-neutral-700 mb-2">
          Procurement Category <span className="text-[var(--hrs-orange)]">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                category === cat
                  ? 'bg-[var(--ink)] text-white'
                  : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Enterprise Name <span className="text-[var(--hrs-orange)]">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="e.g., Gujarat Extrusions Pvt. Ltd."
            className="w-full border border-[var(--ink)]/20 bg-white px-3.5 py-2.5 text-xs text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Contact Person <span className="text-[var(--hrs-orange)]">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            placeholder="e.g., Kiritbhai Patel"
            className="w-full border border-[var(--ink)]/20 bg-white px-3.5 py-2.5 text-xs text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Corporate Email <span className="text-[var(--hrs-orange)]">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g., procurement@company.in"
            className="w-full border border-[var(--ink)]/20 bg-white px-3.5 py-2.5 text-xs text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Telephone / Mobile <span className="text-[var(--hrs-orange)]">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g., +91 98250 12345"
            className="w-full border border-[var(--ink)]/20 bg-white px-3.5 py-2.5 text-xs text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            City & State
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="e.g., Vadodara, Gujarat"
            className="w-full border border-[var(--ink)]/20 bg-white px-3.5 py-2.5 text-xs text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            GST Registration Number
          </label>
          <input
            type="text"
            value={formData.gstNumber}
            onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
            placeholder="e.g., 24AAAAA0000A1Z5"
            className="w-full border border-[var(--ink)]/20 bg-white px-3.5 py-2.5 text-xs text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-neutral-700 mb-1">
          Catalog, Capacity or Product Scope Description
        </label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Summarize product lines, monthly volume capacity, current institutional clients, or relevant certifications..."
          className="w-full border border-[var(--ink)]/20 bg-white px-3.5 py-2.5 text-xs text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none resize-none"
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-xs text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>Please complete all required fields marked with an asterisk (*).</span>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] text-white px-8 py-3.5 text-xs font-bold tracking-tight hover:bg-neutral-800 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <span>{status === 'submitting' ? 'Submitting registration...' : 'Submit partner application'}</span>
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </form>
  );
};

export default PartnerForm;
