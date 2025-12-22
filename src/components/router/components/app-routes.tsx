import { Route, Routes } from 'react-router-dom';
import RouterPaths from '../constants/router-paths';
import { Login } from '../../../pages/login';
import { Main } from '../../../pages/main';
import { Offer } from '../../../pages/offer';
import { Favorites } from '../../../pages/favorites';
import { Page404 } from '../../../pages/404';
import { Error } from '../../../pages/error';
import { PrivateRoute } from './private-route';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={RouterPaths.login} element={<Login />} />
      <Route path={RouterPaths.cities} element={<Main />} />
      <Route path={RouterPaths.city({ city: ':city' })} element={<Main />} />
      <Route path={RouterPaths.offer({ id: ':id' })} element={<Offer />} />
      <Route
        path={RouterPaths.favorites}
        element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        }
      />
      <Route path={RouterPaths.notFound} element={<Page404 />} />
      <Route path={RouterPaths.error} element={<Error />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
