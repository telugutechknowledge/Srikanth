export enum Law {
  CPC = 'CPC',
  BNS = 'BNS',
  BNSS = 'BNSS',
  BSA = 'BSA',
}

export interface QueryState {
  selectedLaws: Law[];
  audience: string;
  query: string;
  queryFocus: string;
}
