/**
 * Centralized hero statements and curiosity hooks for all main pages.
 * Tone: Declarative, architectural, factual, curiosity-inducing.
 * Strictly adheres to HRS Group guidelines (no buzzwords, no em dashes, no exclamation points).
 */

export interface PageHeroCopy {
  headline: string;
  curiosityHook: string;
  tagline?: string;
  markerLabel?: string;
}

export const heroContent: Record<string, PageHeroCopy> = {
  home: {
    headline: 'Eight companies. Built to endure.',
    curiosityHook: 'Where patient capital meets structural discipline.',
    tagline: 'Western India parent enterprise',
    markerLabel: 'Headquartered in Bodakdev, Ahmedabad',
  },
  about: {
    headline: 'Sixteen years of patient building.',
    curiosityHook: 'How eight independent companies grew from a single discipline in Ahmedabad.',
    tagline: 'The HRS enterprise',
    markerLabel: 'Founded 2008 &bull; Operating across Gujarat and South India',
  },
  businesses: {
    headline: 'Our businesses',
    curiosityHook: 'Eight operating companies. One standard of permanence.',
    tagline: 'Corporate portfolio',
    markerLabel: 'Decentralized operational leadership',
  },
  careers: {
    headline: 'Careers at HRS Group',
    curiosityHook: 'Serious industrial backing. Complete operational autonomy.',
    tagline: 'Work with us',
    markerLabel: 'Engineering, production, and corporate offices',
  },
  news: {
    headline: 'News & announcements',
    curiosityHook: 'Milestones, site handovers, and dispatches from the field.',
    tagline: 'Corporate record',
    markerLabel: 'Verified operational updates',
  },
  contact: {
    headline: 'Contact us',
    curiosityHook: 'Every conversation begins with the desk that builds it.',
    tagline: 'Direct enquiries',
    markerLabel: 'Headquarters and regional desks',
  },
  privacy: {
    headline: 'Privacy policy',
    curiosityHook: 'Clear principles on commercial discretion and operational data.',
    tagline: 'Governance',
    markerLabel: 'Parent group data standards',
  },
  terms: {
    headline: 'Terms of use',
    curiosityHook: 'Standards governing parent documentation and proprietary assets.',
    tagline: 'Legal notice',
    markerLabel: 'Official corporate repository',
  },
};
