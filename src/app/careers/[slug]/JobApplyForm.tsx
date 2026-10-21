'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import { trackJobApply } from '@/lib/analytics';

interface Props {
  jobTitle: string;
  jobId: string;
}

export const JobApplyForm: React.FC<Props> = ({ jobTitle, jobId }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [fileName, setFileName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      trackJobApply(jobTitle);
    }, 600);
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-8 border border-[var(--rule)] bg-[var(--paper)] space-y-4 font-sans"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 bg-[var(--orange)]" aria-hidden="true" />
          <h3 className="text-[20px] font-normal text-[var(--ink)] m-0">
            Application submitted
          </h3>
        </div>
        <p className="text-[15px] text-[var(--muted)] leading-[1.6] m-0">
          Thank you for applying for <strong>{jobTitle}</strong>. Our human resources team will review your credentials and contact you within three working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 font-sans">
      <div className="space-y-1">
        <label htmlFor="applicant-name" className="block text-[13px] font-medium text-[var(--ink)]">
          Full name <span className="text-[var(--orange)]">*</span>
        </label>
        <input
          id="applicant-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Subhash Mehta"
          className="w-full h-11 px-3 bg-[var(--white)] border border-[var(--rule)] text-[15px] text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--orange)] rounded-[2px]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="applicant-email" className="block text-[13px] font-medium text-[var(--ink)]">
            Email address <span className="text-[var(--orange)]">*</span>
          </label>
          <input
            id="applicant-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="subhash@example.com"
            className="w-full h-11 px-3 bg-[var(--white)] border border-[var(--rule)] text-[15px] text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--orange)] rounded-[2px]"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="applicant-phone" className="block text-[13px] font-medium text-[var(--ink)]">
            Phone number <span className="text-[var(--orange)]">*</span>
          </label>
          <input
            id="applicant-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full h-11 px-3 bg-[var(--white)] border border-[var(--rule)] text-[15px] text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--orange)] rounded-[2px]"
          />
        </div>
      </div>

      {/* Resume Upload Field */}
      <div className="space-y-1">
        <label htmlFor="resume-upload" className="block text-[13px] font-medium text-[var(--ink)]">
          Upload resume (PDF, DOCX, max 5MB) <span className="text-[var(--orange)]">*</span>
        </label>
        <div className="relative border border-[var(--rule)] p-3 bg-[var(--paper)] rounded-[2px] flex items-center justify-between">
          <input
            id="resume-upload"
            type="file"
            required
            accept=".pdf,.docx,.doc"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setFileName(file.name);
            }}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <span className="text-[14px] text-[var(--muted)]">
            {fileName || 'Choose resume file...'}
          </span>
          <span className="text-[12px] uppercase tracking-wider text-[var(--ink)] border border-[var(--rule)] px-2.5 py-1 bg-[var(--white)]">
            Browse
          </span>
        </div>
      </div>

      {/* Cover note */}
      <div className="space-y-1">
        <label htmlFor="applicant-note" className="block text-[13px] font-medium text-[var(--ink)]">
          Cover note or key qualifications
        </label>
        <textarea
          id="applicant-note"
          rows={4}
          value={coverNote}
          onChange={(e) => setCoverNote(e.target.value)}
          placeholder="Briefly describe your relevant industrial background, notice period, or portfolio links."
          className="w-full p-3 bg-[var(--white)] border border-[var(--rule)] text-[15px] text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--orange)] resize-y rounded-[2px]"
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'submitting'}
          className="w-full sm:w-auto"
        >
          {status === 'submitting' ? 'Submitting application...' : 'Submit application'}
        </Button>
      </div>
    </form>
  );
};
