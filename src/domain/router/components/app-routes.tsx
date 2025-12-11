import { Route, Routes } from 'react-router-dom';
import routes from '../constants/ROUTES';
import { Login } from '../../../pages/Login';
import { Main } from '../../../pages/Main';
import { Offer } from '../../../pages/Offer';
import { Favorites } from '../../../pages/Favorites';
import { Page404 } from '../../../pages/404';
import { PrivateRoute } from './private-route';
import { Error } from '../../../pages/Error';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.cities} element={<Main />} />
      <Route path={routes.city({ city: ':city' })} element={<Main />} />
      <Route path={routes.offer({ id: ':id' })} element={<Offer />} />
      <Route
        path={routes.favorites}
        element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        }
      />
      <Route path={routes.notFound} element={<Page404 />} />
      <Route path={routes.error} element={<Error />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
