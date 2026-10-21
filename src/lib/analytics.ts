// GA4 and Consent-Aware Analytics Layer for HRS Group

export type AnalyticsEvent =
  | { name: 'contact_submit'; params: { entity: string; enquiry_type?: string } }
  | { name: 'job_apply'; params: { job_title: string; entity_slug?: string } }
  | { name: 'newsletter_signup'; params: { location: string } }
  | { name: 'outbound_click'; params: { url: string; label?: string } }
  | { name: 'cta_click'; params: { cta_label: string; destination: string } };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const getGaMeasurementId = (): string | undefined => {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
};

export const trackEvent = (event: AnalyticsEvent) => {
  if (typeof window === 'undefined') return;

  // Check user privacy preference
  const consent = localStorage.getItem('hrs_cookie_consent');
  if (consent === 'rejected') return;

  if (window.gtag) {
    window.gtag('event', event.name, event.params);
  } else {
    // Development or fallback log
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Analytics Event: ${event.name}]`, event.params);
    }
  }
};

export const trackContactSubmit = (entity: string, enquiryType?: string) => {
  trackEvent({
    name: 'contact_submit',
    params: { entity, enquiry_type: enquiryType },
  });
};

export const trackJobApply = (jobTitle: string, entitySlug?: string) => {
  trackEvent({
    name: 'job_apply',
    params: { job_title: jobTitle, entity_slug: entitySlug },
  });
};

export const trackNewsletterSignup = (location: string = 'news_page') => {
  trackEvent({
    name: 'newsletter_signup',
    params: { location },
  });
};

export const trackOutboundClick = (url: string, label?: string) => {
  trackEvent({
    name: 'outbound_click',
    params: { url, label },
  });
};

export const trackCtaClick = (ctaLabel: string, destination: string) => {
  trackEvent({
    name: 'cta_click',
    params: { cta_label: ctaLabel, destination },
  });
};
