import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './config/redux';
import { restoreAuthDataFromLocalStorage } from './components/auth/features/restoreAuthDataFromLocalStorage';
import { Router } from './components/router/components/Router';

restoreAuthDataFromLocalStorage();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />;
    </Provider>
  </React.StrictMode>
);
