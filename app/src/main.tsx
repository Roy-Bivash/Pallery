import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from '@/router/Router';
import { ThemeProvider } from './components/providers/theme-provider';

import '@/css/index.css';
import '@/css/font.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router />
    </ThemeProvider>
  </StrictMode>,
)
