import { DashboardCharts, DashboardStats } from './components/dashboard';
import {
  TransactionAddTransaction,
  TransactionRecentTransactions,
} from './components/transaction';
import { AppBar } from './components/ui/appbar';
import { ThemeProvider } from './provider/theme/ThemeProvider';

export default function PersonalFinanceApp() {
  return (
    <ThemeProvider>
      <AppBar />
      <main className="max-w-screen-md mx-auto p-4">
        <DashboardStats />

        <TransactionAddTransaction />

        <TransactionRecentTransactions />

        <DashboardCharts />
      </main>
    </ThemeProvider>
  );
}
