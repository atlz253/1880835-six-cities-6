import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '../../../components/router/components/app-routes';

export function Router() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
