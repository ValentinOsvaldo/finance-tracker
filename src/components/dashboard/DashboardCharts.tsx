import { useMemo } from 'react';
import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';
import { useFinanceStore } from '@/store/finance/useFinanceStore';

export const DashboardCharts = () => {
  const { expenses, income } = useFinanceStore();

  const pieChart = useMemo(
    () => [
      { title: 'expenses', amount: expenses, fill: 'var(--color-expenses)' },
      { title: 'income', amount: income, fill: 'var(--color-income)' },
    ],
    [expenses, income]
  );

  return (
    <Card className="flex flex-col ">
      <CardHeader className="items-center">
        <CardTitle>Expenses vs Incomes</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{
            amount: {
              label: 'Amount',
            },
            expenses: {
              label: 'Expenses',
              color: 'hsl(var(--chart-1))',
            },
            income: {
              label: 'Income',
              color: 'hsl(var(--chart-2))',
            },
          }}
          // className="mx-auto aspect-square"
        >
          <PieChart>
            <Pie
              data={pieChart}
              dataKey="amount"
              nameKey="title"
              // innerRadius={100}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend
              content={<ChartLegendContent />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
