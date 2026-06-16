import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './app-routes';

export function AppRouter() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

  return (
    <BrowserRouter basename={basename}>
      <AppRoutes />
    </BrowserRouter>
  );
}
