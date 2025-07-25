import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
