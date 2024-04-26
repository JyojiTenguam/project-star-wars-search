import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FilterProvider } from './provider/FilterProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <FilterProvider>
      <App />
    </FilterProvider>,
  );
