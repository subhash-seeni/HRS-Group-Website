'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { FillButton } from '@/components/motion/FillButton';
import { trackContactSubmit } from '@/lib/analytics';

const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  workEmail: z.string().email('Please enter a valid work email address'),
  phone: z.string().min(8, 'Please enter a valid telephone number'),
  company: z.string().optional(),
  entity: z.string().min(1, 'Please select the operating business'),
  enquiryType: z.string().min(1, 'Please select an enquiry category'),
  message: z.string().min(10, 'Please provide message details (minimum 10 characters)'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to proceed with your enquiry',
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

  // Set default enquiry type whenever entity changes
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
        className="py-10 font-sans space-y-6"
      >
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[var(--orange)] inline-block flex-shrink-0" aria-hidden="true" />
          <span className="text-[14px] text-[var(--muted)]">Enquiry confirmation</span>
        </div>

        <SplitHeading
          as="h2"
          className="text-[32px] md:text-[44px] leading-[1.1] font-normal text-[var(--ink)] m-0 font-serif"
          text="Enquiry registered. We will respond within one working day."
        />

        <p className="text-[17px] leading-[1.6] text-[var(--muted)] max-w-[54ch] m-0">
          Thank you for reaching out. Your communication has been dispatched to the designated commercial desk.
        </p>

        <div className="pt-4 border-t border-[var(--rule)] text-[14px] text-[var(--muted)]">
          Reference tracking code: <span className="font-mono text-[var(--ink)] font-medium">{referenceNumber}</span>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setSubmissionStatus('idle')}
            className="text-[14px] text-[var(--ink)] underline hover:text-[var(--orange)] transition-colors cursor-pointer"
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
      className="space-y-8 font-sans"
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
          className="p-4 border-b-2 border-[var(--orange)] bg-[#FFF5EE] text-[14px] text-[var(--ink)]"
        >
          {errorMessage || 'Submission failed. Please check form fields below.'}
        </div>
      )}

      {/* Row 1: Full name & Work email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative pt-6">
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder=" "
            aria-invalid={errors.fullName ? 'true' : 'false'}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            className={`peer w-full h-11 bg-transparent border-0 border-b pb-2 pt-1 text-[16px] text-[var(--ink)] placeholder-transparent focus:outline-none focus:border-b-2 focus:border-[var(--orange)] transition-colors rounded-none ${
              errors.fullName ? 'border-b-2 border-[var(--orange-deep)]' : 'border-[var(--rule)]'
            }`}
            {...register('fullName', {
              required: 'Please enter your full name',
              minLength: { value: 2, message: 'Minimum 2 characters' },
            })}
          />
          <label
            htmlFor="fullName"
            className="absolute left-0 top-0 text-[13px] text-[var(--muted)] pointer-events-none transition-all duration-200 peer-placeholder-shown:top-7 peer-placeholder-shown:text-[15px] peer-placeholder-shown:text-[var(--muted)] peer-focus:top-0 peer-focus:text-[13px] peer-focus:text-[var(--ink)]"
          >
            Full name <span className="text-[var(--orange)]" aria-hidden="true">*</span>
          </label>
          <AnimatePresence>
            {errors.fullName && (
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                id="fullName-error"
                className="block text-[13px] text-[var(--orange-deep)] mt-1.5"
                role="alert"
              >
                {errors.fullName.message}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="relative pt-6">
          <input
            id="workEmail"
            type="email"
            autoComplete="email"
            placeholder=" "
            aria-invalid={errors.workEmail ? 'true' : 'false'}
            aria-describedby={errors.workEmail ? 'workEmail-error' : undefined}
            className={`peer w-full h-11 bg-transparent border-0 border-b pb-2 pt-1 text-[16px] text-[var(--ink)] placeholder-transparent focus:outline-none focus:border-b-2 focus:border-[var(--orange)] transition-colors rounded-none ${
              errors.workEmail ? 'border-b-2 border-[var(--orange-deep)]' : 'border-[var(--rule)]'
            }`}
            {...register('workEmail', {
              required: 'Please enter your work email',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            })}
          />
          <label
            htmlFor="workEmail"
            className="absolute left-0 top-0 text-[13px] text-[var(--muted)] pointer-events-none transition-all duration-200 peer-placeholder-shown:top-7 peer-placeholder-shown:text-[15px] peer-placeholder-shown:text-[var(--muted)] peer-focus:top-0 peer-focus:text-[13px] peer-focus:text-[var(--ink)]"
          >
            Work email <span className="text-[var(--orange)]" aria-hidden="true">*</span>
          </label>
          <AnimatePresence>
            {errors.workEmail && (
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                id="workEmail-error"
                className="block text-[13px] text-[var(--orange-deep)] mt-1.5"
                role="alert"
              >
                {errors.workEmail.message}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Row 2: Phone & Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative pt-6">
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder=" "
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={`peer w-full h-11 bg-transparent border-0 border-b pb-2 pt-1 text-[16px] text-[var(--ink)] placeholder-transparent focus:outline-none focus:border-b-2 focus:border-[var(--orange)] transition-colors rounded-none ${
              errors.phone ? 'border-b-2 border-[var(--orange-deep)]' : 'border-[var(--rule)]'
            }`}
            {...register('phone', {
              required: 'Please enter your phone number',
              minLength: { value: 8, message: 'Please enter a valid telephone number' },
            })}
          />
          <label
            htmlFor="phone"
            className="absolute left-0 top-0 text-[13px] text-[var(--muted)] pointer-events-none transition-all duration-200 peer-placeholder-shown:top-7 peer-placeholder-shown:text-[15px] peer-placeholder-shown:text-[var(--muted)] peer-focus:top-0 peer-focus:text-[13px] peer-focus:text-[var(--ink)]"
          >
            Phone <span className="text-[var(--orange)]" aria-hidden="true">*</span>
          </label>
          <AnimatePresence>
            {errors.phone && (
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                id="phone-error"
                className="block text-[13px] text-[var(--orange-deep)] mt-1.5"
                role="alert"
              >
                {errors.phone.message}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="relative pt-6">
          <input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder=" "
            className="peer w-full h-11 bg-transparent border-0 border-b border-[var(--rule)] pb-2 pt-1 text-[16px] text-[var(--ink)] placeholder-transparent focus:outline-none focus:border-b-2 focus:border-[var(--orange)] transition-colors rounded-none"
            {...register('company')}
          />
          <label
            htmlFor="company"
            className="absolute left-0 top-0 text-[13px] text-[var(--muted)] pointer-events-none transition-all duration-200 peer-placeholder-shown:top-7 peer-placeholder-shown:text-[15px] peer-placeholder-shown:text-[var(--muted)] peer-focus:top-0 peer-focus:text-[13px] peer-focus:text-[var(--ink)]"
          >
            Company (optional)
          </label>
        </div>
      </div>

      {/* Row 3: Operating business dropdown */}
      <div className="space-y-1.5">
        <label htmlFor="entity" className="block text-[13px] text-[var(--muted)]">
          Which business are you contacting? <span className="text-[var(--orange)]" aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <select
            id="entity"
            aria-invalid={errors.entity ? 'true' : 'false'}
            aria-describedby={errors.entity ? 'entity-error' : undefined}
            className={`w-full h-11 bg-transparent border-0 border-b pb-2 pt-1 text-[16px] text-[var(--ink)] focus:outline-none focus:border-b-2 focus:border-[var(--orange)] transition-colors appearance-none cursor-pointer rounded-none pr-8 ${
              errors.entity ? 'border-b-2 border-[var(--orange-deep)]' : 'border-[var(--rule)]'
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
          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[var(--muted)] text-[12px]">
            ▼
          </div>
        </div>
        <AnimatePresence>
          {errors.entity && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              id="entity-error"
              className="block text-[13px] text-[var(--orange-deep)] mt-1.5"
              role="alert"
            >
              {errors.entity.message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Row 4: Enquiry type dropdown */}
      <div className="space-y-1.5">
        <label htmlFor="enquiryType" className="block text-[13px] text-[var(--muted)]">
          Enquiry type <span className="text-[var(--orange)]" aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <select
            id="enquiryType"
            aria-invalid={errors.enquiryType ? 'true' : 'false'}
            aria-describedby={errors.enquiryType ? 'enquiryType-error' : undefined}
            className={`w-full h-11 bg-transparent border-0 border-b pb-2 pt-1 text-[16px] text-[var(--ink)] focus:outline-none focus:border-b-2 focus:border-[var(--orange)] transition-colors appearance-none cursor-pointer rounded-none pr-8 ${
              errors.enquiryType ? 'border-b-2 border-[var(--orange-deep)]' : 'border-[var(--rule)]'
            }`}
            {...register('enquiryType', { required: 'Please select an enquiry type' })}
          >
            {activeEnquiryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[var(--muted)] text-[12px]">
            ▼
          </div>
        </div>
        <AnimatePresence>
          {errors.enquiryType && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              id="enquiryType-error"
              className="block text-[13px] text-[var(--orange-deep)] mt-1.5"
              role="alert"
            >
              {errors.enquiryType.message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Row 5: Message */}
      <div className="relative pt-6">
        <textarea
          id="message"
          rows={4}
          placeholder=" "
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`peer w-full bg-transparent border-0 border-b pb-2 pt-1 text-[16px] text-[var(--ink)] placeholder-transparent focus:outline-none focus:border-b-2 focus:border-[var(--orange)] transition-colors resize-y rounded-none ${
            errors.message ? 'border-b-2 border-[var(--orange-deep)]' : 'border-[var(--rule)]'
          }`}
          {...register('message', {
            required: 'Please provide message details',
            minLength: { value: 10, message: 'Message must be at least 10 characters' },
          })}
        />
        <label
          htmlFor="message"
          className="absolute left-0 top-0 text-[13px] text-[var(--muted)] pointer-events-none transition-all duration-200 peer-placeholder-shown:top-7 peer-placeholder-shown:text-[15px] peer-placeholder-shown:text-[var(--muted)] peer-focus:top-0 peer-focus:text-[13px] peer-focus:text-[var(--ink)]"
        >
          Message scope & requirements <span className="text-[var(--orange)]" aria-hidden="true">*</span>
        </label>
        <AnimatePresence>
          {errors.message && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              id="message-error"
              className="block text-[13px] text-[var(--orange-deep)] mt-1.5"
              role="alert"
            >
              {errors.message.message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Row 6: Consent Checkbox */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            id="consent"
            type="checkbox"
            className="mt-1 w-4 h-4 text-[var(--ink)] rounded-none border-[var(--rule)] focus:ring-[var(--orange)] accent-[var(--ink)]"
            {...register('consent', {
              required: 'You must consent to proceed with your enquiry',
            })}
          />
          <span className="text-[14px] text-[var(--muted)] leading-[1.5]">
            I consent to HRS Group and its operating companies storing and processing these details to respond to my enquiry.
          </span>
        </label>
        <AnimatePresence>
          {errors.consent && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              id="consent-error"
              className="block text-[13px] text-[var(--orange-deep)] mt-1.5"
              role="alert"
            >
              {errors.consent.message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Submit Button using FillButton */}
      <div className="pt-4">
        <FillButton
          type="submit"
          disabled={submissionStatus === 'submitting'}
          className="w-full sm:w-auto min-w-[220px]"
        >
          {submissionStatus === 'submitting' ? 'Submitting enquiry...' : 'Submit enquiry'}
        </FillButton>
      </div>
    </form>
  );
};
