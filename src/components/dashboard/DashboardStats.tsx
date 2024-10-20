import { useFinanceStore } from '@/store/finance/useFinanceStore';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { numberToCurrency } from '@/utilities/numberToCurrency';

export const DashboardStats = () => {
  const { balance, expenses, income } = useFinanceStore();

  return (
    <section className="grid gap-4 md:grid-cols-2 mb-4">
      <Card>
        <CardHeader>
          <CardTitle>Balance</CardTitle>
        </CardHeader>

        <CardContent>
          <div
            className={`text-2xl font-bold ${balance < 0 && 'text-red-500'}`}
          >
            {numberToCurrency(balance)}
          </div>
          {/* <p className="text-xs text-muted-foreground text-green-600">
            +20.1% from last month
          </p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Income</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold">{numberToCurrency(income)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold">{numberToCurrency(expenses)}</div>
        </CardContent>
      </Card>
    </section>
  );
};
