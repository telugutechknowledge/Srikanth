export enum Law {
  CPC = 'CPC',
  BNS = 'BNS',
  BNSS = 'BNSS',
  BSA = 'BSA',
  NI = 'NI',
  HMA = 'HMA',
  MVA = 'MVA',
  DV = 'DV',
  MWPSC = 'MWPSC',
}

export interface QueryState {
  selectedLaws: Law[];
  audience: string;
  query: string;
  queryFocus: string;
  outputLanguage: string;
}
