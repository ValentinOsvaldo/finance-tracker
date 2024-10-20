import { Transaction, TransactionModel } from '@/types/finance/finance';

export class TransactionAdapter {
  static createTransaction(transaction: TransactionModel): Transaction {
    return {
      amount: Number(transaction.amount),
      category: transaction.category,
      date: transaction.date || new Date(),
      type: transaction.type,
    };
  }
}
