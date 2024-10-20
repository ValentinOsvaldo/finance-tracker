export type TransactionType = 'income' | 'expense';

export interface Transaction {
  amount:   number;
  category: string;
  date:     Date;
  type:     TransactionType;
}

export interface TransactionModel {
  amount:   number | undefined;
  category: string;
  date:     Date | undefined;
  type:     TransactionType;
}
