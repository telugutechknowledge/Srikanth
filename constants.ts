import { Law } from './types';

export const LAWS_OPTIONS = [
  { id: Law.CPC, name: 'CPC', fullName: 'Code of Civil Procedure, 1908' },
  { id: Law.BNS, name: 'BNS', fullName: 'Bharatiya Nyaya Sanhita, 2023' },
  { id: Law.BNSS, name: 'BNSS', fullName: 'Bharatiya Nagarik Suraksha Sanhita, 2023' },
  { id: Law.BSA, name: 'BSA', fullName: 'Bharatiya Sakshya Adhiniyam, 2023' },
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
