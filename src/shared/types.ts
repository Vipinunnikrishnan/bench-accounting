// Generated by https://quicktype.io

export interface Response {
  totalCount: number;
  page: number;
  transactions: Transaction[];
}

// TODO: Ideally we need all properties in `camelCase`. Here, the API returns `SnakeKase`.
// To keep it simple, continuing the SnakeCase format here instead converting it.
export interface Transaction {
  Date: string;
  Ledger: string;
  Amount: string;
  Company: string;
}
