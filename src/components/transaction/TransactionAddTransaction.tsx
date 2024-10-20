import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { TransactionModel, TransactionType } from '@/types/finance/finance';
import { TransactionAdapter } from '@/adapter/transaction.adapter';
import { useFinanceStore } from '@/store/finance/useFinanceStore';

const INIT_TRANSACTION = Object.assign<TransactionModel, object>(
  {
    amount: undefined,
    category: '',
    date: undefined,
    type: 'income',
  },
  {}
);

export const TransactionAddTransaction = () => {
  const { addTransaction } = useFinanceStore();
  const [transaction, setTransaction] =
    useState<TransactionModel>(INIT_TRANSACTION);

  const handleAddTransaction = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!transaction.amount || transaction.category.length <= 0) return;

    const transactionMapped = TransactionAdapter.createTransaction(transaction);

    addTransaction(transactionMapped);

    setTransaction(INIT_TRANSACTION);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Add transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddTransaction}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Type</Label>
              <Select
                value={transaction.type}
                onValueChange={(value) =>
                  setTransaction((prevState) => ({
                    ...prevState,
                    type: value as TransactionType,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Category</Label>
              <Input
                // placeholder="Shopping"
                value={transaction.category}
                onChange={(ev) =>
                  setTransaction((prevState) => ({
                    ...prevState,
                    category: ev.target.value,
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !transaction.date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {transaction.date ? (
                      format(transaction.date, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={transaction.date}
                    onSelect={(newDate) =>
                      setTransaction((prevState) => ({
                        ...prevState,
                        date: newDate,
                      }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label>Amount</Label>
              <NumericFormat
                customInput={Input}
                prefix="$"
                thousandSeparator=","
                decimalSeparator="."
                value={transaction.amount ? transaction.amount : ''}
                onValueChange={({ floatValue }) => {
                  setTransaction((prevState) => ({
                    ...prevState,
                    amount: floatValue,
                  }));
                }}
              />
            </div>

            <div>
              <Button>
                <Plus />
                Add transaction
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
