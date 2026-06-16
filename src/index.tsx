import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './config/redux';
import { restoreAuthDataFromLocalStorage } from './components/auth/features/restore-auth-data-from-local-storage';
import { AppRouter } from './components/router/components/app-router';

restoreAuthDataFromLocalStorage();

async function enableMocking() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  const { worker } = await import('./mocks/browser');

  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  });
}

enableMocking()
  .catch(() => undefined)
  .then(() => {
    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );

    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </React.StrictMode>
    );
  });
