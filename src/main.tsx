import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PersonalFinanceApp from './PersonalFinanceApp';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersonalFinanceApp />
  </StrictMode>
);
