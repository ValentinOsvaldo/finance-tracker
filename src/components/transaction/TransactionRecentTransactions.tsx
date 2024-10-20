import { useFinanceStore } from '@/store/finance/useFinanceStore';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { numberToCurrency } from '@/utilities/numberToCurrency';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';

export const TransactionRecentTransactions = () => {
  const { transactions, removeTransaction } = useFinanceStore();

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Recently movements</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell className="capitalize">
                  {transaction.category}
                </TableCell>
                <TableCell>{numberToCurrency(transaction.amount)}</TableCell>
                <TableCell>
                  <Button
                    variant={'destructive'}
                    size={'icon'}
                    onClick={() => removeTransaction(index)}
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
