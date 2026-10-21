'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui';
import { trackContactSubmit } from '@/lib/analytics';

const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  workEmail: z.string().email('Please enter a valid work email address'),
  phone: z.string().min(8, 'Please enter a valid telephone number'),
  company: z.string().optional(),
  entity: z.string().min(1, 'Please select the operating business'),
  enquiryType: z.string().min(1, 'Please select an enquiry category'),
  message: z.string().min(10, 'Please provide message details (minimum 10 characters)'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must consent to proceed with your enquiry' }),
  }),
  botField: z.string().max(0, 'Spam detected').optional(),
});

type FormData = z.infer<typeof contactFormSchema>;

const enquiryTypeMap: Record<string, string[]> = {
  'general': [
    'General corporate enquiry',
    'Media and press relations',
    'Institutional partnership',
    'Vendor registration',
  ],
  'hrs-aluglaze': [
    'Project enquiry',
    'Product information',
    'Become a channel partner',
    'Technical specifications request',
  ],
  'geotrix': [
    'South India project enquiry',
    'Regional installation services',
    'Bengaluru / Chennai site survey',
    'Technical consultation',
  ],
  'school-of-facade-technologies': [
    'Diploma and certificate courses',
    'Skilling programmes for installers',
    'Corporate upskilling and workshops',
    'Academic admissions inquiry',
  ],
  'hrishikesh-ventures': [
    'Buy a home',
    'Commercial space enquiry',
    'Land and joint venture proposal',
    'Current handover status',
  ],
  'hrishikesh-food-products': [
    'Job work and processing',
    'White label packaging',
    'Own range procurement',
    'Bulk spice export / institutional',
  ],
  'hrishikesh-consumer-products': [
    'Distribution partnership',
    'Retail stockist inquiry',
    'Institutional supply',
    'Consumer brand feedback',
  ],
  'firstgen': [
    'Holding and corporate affairs',
    'Joint venture inquiries',
    'Investor relations',
  ],
  'firstgen-assets': [
    'Commercial and office leasing',
    'Retail property lease',
    'Warehousing and industrial leasing',
    'Heavy equipment and machinery hire',
  ],
  'firstgen-hotels': [
    'Flight Stays booking inquiry',
    'Corporate serviced accommodation',
    'Amuktamalyada event and bulk catering',
  ],
  'firstgen-enterprises': [
    'The Bluprint co-working membership',
    'Material experience centre visit',
    'ShubhVista building material supply',
  ],
  'indian-brand-house': [
    'Brand strategy and identity',
    'Creative and content production',
    'Digital and performance marketing',
    'Project retainers',
  ],
};

export const ContactForm: React.FC = () => {
  const searchParams = useSearchParams();
  const paramEntity = searchParams.get('entity') || 'general';
  const paramProject = searchParams.get('project');

  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      workEmail: '',
      phone: '',
      company: '',
      entity: paramEntity,
      enquiryType: '',
      message: paramProject ? `Inquiring about project specifications for ${paramProject}.` : '',
      consent: false,
      botField: '',
    },
  });

  const selectedEntity = watch('entity');
  const activeEnquiryOptions = enquiryTypeMap[selectedEntity] || enquiryTypeMap['general'];

  useEffect(() => {
    if (paramEntity) {
      setValue('entity', paramEntity);
    }
  }, [paramEntity, setValue]);

  // Set default enquiry type whenever entity changes if not already set or invalid
  useEffect(() => {
    if (activeEnquiryOptions.length > 0) {
      setValue('enquiryType', activeEnquiryOptions[0]);
    }
  }, [selectedEntity, setValue]);

  const onSubmit = async (data: FormData) => {
    setSubmissionStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSubmissionStatus('success');
        setReferenceNumber(resData.referenceId || `HRS-${Date.now().toString(36).toUpperCase()}`);
        trackContactSubmit(data.entity, data.enquiryType);
        reset();
      } else {
        setSubmissionStatus('error');
        setErrorMessage(resData.error || 'Unable to submit enquiry. Please verify details.');
      }
    } catch {
      setSubmissionStatus('error');
      setErrorMessage('Network error encountered. Please check connectivity or call our office directly.');
    }
  };

  if (submissionStatus === 'success') {
    return (
      <div
        id="contact-form-success"
        role="status"
        aria-live="polite"
        className="p-8 md:p-12 border border-[var(--rule)] bg-[var(--paper)] font-sans space-y-6"
      >
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[var(--orange)]" aria-hidden="true" />
          <h2 className="font-serif text-[24px] md:text-[28px] font-normal text-[var(--ink)] m-0">
            Enquiry registered
          </h2>
        </div>

        <p className="text-[17px] leading-[1.6] text-[var(--ink)] max-w-[54ch] m-0">
          Thank you for reaching out. Your communication has been dispatched to the designated commercial desk.
        </p>

        <p className="text-[15px] font-medium text-[var(--ink)] m-0">
          We will respond within one working day.
        </p>

        <div className="pt-4 border-t border-[var(--rule)] text-[13px] text-[var(--muted)]">
          Reference tracking code: <span className="font-mono text-[var(--ink)]">{referenceNumber}</span>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setSubmissionStatus('idle')}
            className="text-[14px] text-[var(--ink)] underline hover:text-[var(--orange)] transition-colors"
          >
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="contact-enquiry-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6 font-sans"
    >
      {/* Honeypot field for bot protection */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="botField">Leave empty</label>
        <input
          id="botField"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('botField')}
        />
      </div>

      {submissionStatus === 'error' && (
        <div
          role="alert"
          className="p-4 border border-[var(--orange)] bg-[#FFF5EE] text-[14px] text-[var(--ink)]"
        >
          {errorMessage || 'Submission failed. Please check form fields below.'}
        </div>
      )}

      {/* Row 1: Full name and Work email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-[14px] font-medium text-[var(--ink)] mb-2">
            Full name <span className="text-[var(--orange)]" aria-hidden="true">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            aria-invalid={errors.fullName ? 'true' : 'false'}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            className={`w-full h-12 px-3.5 bg-[var(--white)] border text-[16px] text-[var(--ink)] font-sans focus:outline-none focus:ring-2 focus:ring-[var(--orange)] transition-colors rounded-[2px] ${
              errors.fullName ? 'border-[var(--orange)]' : 'border-[var(--rule)]'
            }`}
            placeholder="e.g. Subhash Mehta"
            {...register('fullName', {
              required: 'Please enter your full name',
              minLength: { value: 2, message: 'Minimum 2 characters' },
            })}
          />
          {errors.fullName && (
            <span id="fullName-error" className="block text-[13px] text-[var(--orange)] mt-1.5" role="alert">
              {errors.fullName.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="workEmail" className="block text-[14px] font-medium text-[var(--ink)] mb-2">
            Work email <span className="text-[var(--orange)]" aria-hidden="true">*</span>
          </label>
          <input
            id="workEmail"
            type="email"
            autoComplete="email"
            aria-invalid={errors.workEmail ? 'true' : 'false'}
            aria-describedby={errors.workEmail ? 'workEmail-error' : undefined}
            className={`w-full h-12 px-3.5 bg-[var(--white)] border text-[16px] text-[var(--ink)] font-sans focus:outline-none focus:ring-2 focus:ring-[var(--orange)] transition-colors rounded-[2px] ${
              errors.workEmail ? 'border-[var(--orange)]' : 'border-[var(--rule)]'
            }`}
            placeholder="name@company.com"
            {...register('workEmail', {
              required: 'Please enter your work email',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            })}
          />
          {errors.workEmail && (
            <span id="workEmail-error" className="block text-[13px] text-[var(--orange)] mt-1.5" role="alert">
              {errors.workEmail.message}
            </span>
          )}
        </div>
      </div>

      {/* Row 2: Phone and Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-[14px] font-medium text-[var(--ink)] mb-2">
            Phone <span className="text-[var(--orange)]" aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={`w-full h-12 px-3.5 bg-[var(--white)] border text-[16px] text-[var(--ink)] font-sans focus:outline-none focus:ring-2 focus:ring-[var(--orange)] transition-colors rounded-[2px] ${
              errors.phone ? 'border-[var(--orange)]' : 'border-[var(--rule)]'
            }`}
            placeholder="+91 98765 43210"
            {...register('phone', {
              required: 'Please enter your phone number',
              minLength: { value: 8, message: 'Please enter a valid telephone number' },
            })}
          />
          {errors.phone && (
            <span id="phone-error" className="block text-[13px] text-[var(--orange)] mt-1.5" role="alert">
              {errors.phone.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-[14px] font-medium text-[var(--ink)] mb-2">
            Company <span className="text-[var(--muted)] font-normal">(optional)</span>
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            className="w-full h-12 px-3.5 bg-[var(--white)] border border-[var(--rule)] text-[16px] text-[var(--ink)] font-sans focus:outline-none focus:ring-2 focus:ring-[var(--orange)] transition-colors rounded-[2px]"
            placeholder="Organization or firm name"
            {...register('company')}
          />
        </div>
      </div>

      {/* Row 3: Which business are you contacting? (grouped with optgroups) */}
      <div>
        <label htmlFor="entity" className="block text-[14px] font-medium text-[var(--ink)] mb-2">
          Which business are you contacting? <span className="text-[var(--orange)]" aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <select
            id="entity"
            aria-invalid={errors.entity ? 'true' : 'false'}
            aria-describedby={errors.entity ? 'entity-error' : undefined}
            className={`w-full h-12 px-3.5 bg-[var(--white)] border text-[16px] text-[var(--ink)] font-sans focus:outline-none focus:ring-2 focus:ring-[var(--orange)] transition-colors appearance-none cursor-pointer rounded-[2px] ${
              errors.entity ? 'border-[var(--orange)]' : 'border-[var(--rule)]'
            }`}
            {...register('entity', { required: 'Please select an entity' })}
          >
            <option value="general">General Group Enquiry (HRS Corporate)</option>
            <optgroup label="Built Environment">
              <option value="hrs-aluglaze">HRS Aluglaze Ltd (Facade Engineering)</option>
              <option value="geotrix">Geotrix Pvt. Ltd. (South India Facades)</option>
              <option value="school-of-facade-technologies">School of Facade Technologies</option>
              <option value="hrishikesh-ventures">Hrishikesh Ventures (Real Estate Development)</option>
            </optgroup>
            <optgroup label="Food and Consumer">
              <option value="hrishikesh-food-products">Hrishikesh Food Products (Processing & Spices)</option>
              <option value="hrishikesh-consumer-products">Hrishikesh Consumer Products (Brands)</option>
            </optgroup>
            <optgroup label="Hospitality, Leasing & Retail">
              <option value="firstgen">FirstGen (Holding Entity)</option>
              <option value="firstgen-assets">FirstGen Assets (Commercial & Industrial Leasing)</option>
              <option value="firstgen-hotels">FirstGen Hotels (Flight Stays & Amuktamalyada)</option>
              <option value="firstgen-enterprises">FirstGen Enterprises (The Bluprint & ShubhVista)</option>
            </optgroup>
            <optgroup label="Brand Services">
              <option value="indian-brand-house">Indian Brand House (Strategy & Creative)</option>
            </optgroup>
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] text-[12px]">
            ▼
          </div>
        </div>
        {errors.entity && (
          <span id="entity-error" className="block text-[13px] text-[var(--orange)] mt-1.5" role="alert">
            {errors.entity.message}
          </span>
        )}
      </div>

      {/* Row 4: Enquiry type (dynamically adapting) */}
      <div>
        <label htmlFor="enquiryType" className="block text-[14px] font-medium text-[var(--ink)] mb-2">
          Enquiry type <span className="text-[var(--orange)]" aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <select
            id="enquiryType"
            aria-invalid={errors.enquiryType ? 'true' : 'false'}
            aria-describedby={errors.enquiryType ? 'enquiryType-error' : undefined}
            className={`w-full h-12 px-3.5 bg-[var(--white)] border text-[16px] text-[var(--ink)] font-sans focus:outline-none focus:ring-2 focus:ring-[var(--orange)] transition-colors appearance-none cursor-pointer rounded-[2px] ${
              errors.enquiryType ? 'border-[var(--orange)]' : 'border-[var(--rule)]'
            }`}
            {...register('enquiryType', { required: 'Please select an enquiry type' })}
          >
            {activeEnquiryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] text-[12px]">
            ▼
          </div>
        </div>
        {errors.enquiryType && (
          <span id="enquiryType-error" className="block text-[13px] text-[var(--orange)] mt-1.5" role="alert">
            {errors.enquiryType.message}
          </span>
        )}
      </div>

      {/* Row 5: Message */}
      <div>
        <label htmlFor="message" className="block text-[14px] font-medium text-[var(--ink)] mb-2">
          Message <span className="text-[var(--orange)]" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`w-full p-3.5 bg-[var(--white)] border text-[16px] text-[var(--ink)] font-sans focus:outline-none focus:ring-2 focus:ring-[var(--orange)] transition-colors resize-y rounded-[2px] ${
            errors.message ? 'border-[var(--orange)]' : 'border-[var(--rule)]'
          }`}
          placeholder="Please describe project scope, requirements, or specific requests."
          {...register('message', {
            required: 'Please provide message details',
            minLength: { value: 10, message: 'Message must be at least 10 characters' },
          })}
        />
        {errors.message && (
          <span id="message-error" className="block text-[13px] text-[var(--orange)] mt-1.5" role="alert">
            {errors.message.message}
          </span>
        )}
      </div>

      {/* Row 6: Consent Checkbox */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            id="consent"
            type="checkbox"
            className="mt-1 w-4 h-4 text-[var(--ink)] rounded-[2px] border-[var(--rule)] focus:ring-[var(--orange)] accent-[var(--ink)]"
            {...register('consent', {
              required: 'You must consent to proceed with your enquiry',
            })}
          />
          <span className="text-[14px] text-[var(--muted)] leading-[1.5]">
            I consent to HRS Group and its operating companies storing and processing these details to respond to my enquiry.
          </span>
        </label>
        {errors.consent && (
          <span id="consent-error" className="block text-[13px] text-[var(--orange)] mt-1.5" role="alert">
            {errors.consent.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={submissionStatus === 'submitting'}
          className="w-full sm:w-auto min-w-[200px]"
        >
          {submissionStatus === 'submitting' ? 'Submitting enquiry...' : 'Submit enquiry'}
        </Button>
      </div>
    </form>
  );
};
