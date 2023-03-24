import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import App from 'app/App';
import ErrorBoundary from 'app/providers/ErrorBoundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <ConfigProvider locale={ruRU}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  </ConfigProvider>,
);
