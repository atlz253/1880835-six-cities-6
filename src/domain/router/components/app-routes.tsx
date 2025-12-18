import { Route, Routes } from 'react-router-dom';
import routes from '../constants/ROUTES';
import { Login } from '../../../pages/login';
import { Main } from '../../../pages/main';
import { Offer } from '../../../pages/offer';
import { Favorites } from '../../../pages/favorites';
import { Page404 } from '../../../pages/404';
import { PrivateRoute } from './private-route';
import { Error } from '../../../pages/error';

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
