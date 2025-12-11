import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../../../auth';
import routes from '../../constants/ROUTES';
import { useAuthCheck } from '../../../auth/hooks/use-auth-check';

export function PrivateRoute({ children }: { children: JSX.Element }) {
  useAuthCheck();
  const auth = useAuthStatus();
  return auth ? children : <Navigate to={routes.login} />;
}
