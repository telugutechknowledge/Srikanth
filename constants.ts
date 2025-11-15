import { Law } from './types';

export const LAWS_OPTIONS = [
  { id: Law.CPC, name: 'CPC', fullName: 'Code of Civil Procedure, 1908' },
  { id: Law.BNS, name: 'BNS', fullName: 'Bharatiya Nyaya Sanhita, 2023' },
  { id: Law.BNSS, name: 'BNSS', fullName: 'Bharatiya Nagarik Suraksha Sanhita, 2023' },
  { id: Law.BSA, name: 'BSA', fullName: 'Bharatiya Sakshya Adhiniyam, 2023' },
  { id: Law.NI, name: 'NI Act', fullName: 'Negotiable Instruments Act, 1881' },
  { id: Law.HMA, name: 'HM Act', fullName: 'Hindu Marriage Act, 1955' },
  { id: Law.MVA, name: 'MV Act', fullName: 'Motor Vehicles Act, 1988' },
  { id: Law.DV, name: 'DV Act', fullName: 'Protection of Women from Domestic Violence Act, 2005' },
  { id: Law.MWPSC, name: 'MWPSC Act', fullName: 'Maintenance and Welfare of Parents and Senior Citizens Act, 2007' },
];

export const AUDIENCE_OPTIONS = [
  'Layperson (in simple terms)',
  'Law Student (with details and concepts)',
  'Legal Professional (technical, with citations)',
];

export const QUERY_FOCUS_OPTIONS = [
    'General Explanation',
    'Filing Procedure',
    'Key Elements / Ingredients',
    'Punishments / Remedies',
];

export const OUTPUT_LANGUAGE_OPTIONS = [
    'English',
    'Telugu',
];

export const LANGUAGE_CODE_MAP: { [key: string]: string } = {
    'English': 'en-US',
    'Telugu': 'te-IN',
};
