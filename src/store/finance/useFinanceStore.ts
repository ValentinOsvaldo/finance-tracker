import { create } from 'zustand';
import { Transaction } from '@/types/finance/finance';

interface FinanceStore {
  balance: number;
  income: number;
  expenses: number;
  transactions: Transaction[];

  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (index: number) => void;
}

export const useFinanceStore = create<FinanceStore>((set, get) => ({
  balance: 0,
  expenses: 0,
  income: 0,
  transactions: [],

  addTransaction: (transaction) => {
    const newList = [...get().transactions, { ...transaction }];

    if (transaction.type === 'income') {
      set({
        balance: get().balance + transaction.amount,
        income: get().income + transaction.amount,
      });
    } else {
      set({
        balance: get().balance - transaction.amount,
        expenses: get().expenses + transaction.amount,
        // income: get().income + transaction.amount,
      });
    }

    set({ transactions: newList });
  },
  removeTransaction: (index: number) => {
    const transactionToDelete = get().transactions[index];
    const newList = get().transactions.filter((_, i) => i !== index);

    if (transactionToDelete.type === 'expense') {
      set({
        expenses: get().expenses - transactionToDelete.amount,
        income: get().income - transactionToDelete.amount,
      });
    } else {
      set({
        balance: get().balance - transactionToDelete.amount,
        income: get().income - transactionToDelete.amount,
      });
    }

    set({ transactions: newList });
  },
}));
