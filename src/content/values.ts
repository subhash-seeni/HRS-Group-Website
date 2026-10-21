export interface GroupValue {
  number: string;
  name: string;
  description: string;
  extendedDescription?: string;
}

export const groupValues: GroupValue[] = [
  {
    number: '01',
    name: 'Faith',
    description:
      'Long-term commitment to our partners and projects guides decisions beyond short-term commercial cycles.',
    extendedDescription:
      'Our operating horizon extends beyond quarterly cycles. We invest in permanent industrial assets, enduring architectural infrastructure, and multi-year training programs with the conviction that patient compounding delivers stable enterprise value.',
  },
  {
    number: '02',
    name: 'Trust',
    description:
      'Transparent contractual agreements and rigorous delivery standards underpin relationships with clients and suppliers.',
    extendedDescription:
      'Commercial relationships endure through absolute adherence to agreed scopes, transparent billing schedules, and uncompromised compliance with local regulatory frameworks and environmental codes.',
  },
  {
    number: '03',
    name: 'Foundation',
    description:
      'Solid structural engineering and prudent capital planning form the base for every business we operate.',
    extendedDescription:
      'We avoid speculative debt and unhedged expansion. Whether constructing a high-rise curtain wall in Bengaluru or commissioning an automated spice milling line in Bavla, every venture rests on conservative balance sheets and verified technical calculations.',
  },
  {
    number: '04',
    name: 'People',
    description:
      'Technical mastery, installer safety, and regional craft talent drive operational continuity across our facilities.',
    extendedDescription:
      'We prioritize physical site safety, structured technical apprenticeships, and direct employee retention. The specialized fabrication skills required in architectural fenestration and precision food milling require years of disciplined mentorship.',
  },
  {
    number: '05',
    name: 'Process',
    description:
      'Standardised manufacturing tolerances, audited quality controls, and repeatable operating workflows ensure consistent output.',
    extendedDescription:
      'Consistent product quality is engineered through repeatable systems: automated CNC profile cutting, continuous laboratory batch testing, calibrated structural silicone cure times, and audited enterprise workflows.',
  },
  {
    number: '06',
    name: 'Service',
    description:
      'Responsive site assistance and direct executive accountability extend across project lifecycles and consumer retail.',
    extendedDescription:
      'Every operating company provides direct access to decision-makers. From immediate engineering assistance on high-rise job sites to swift resolution of retail stocking needs, executive accountability remains personal and direct.',
  },
];
