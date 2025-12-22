import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../../../../components/auth';
import { useAuthCheck } from '../../../../components/auth/hooks/use-auth-check';
import ROUTES from '../../constants/ROUTES';

export function PrivateRoute({ children }: { children: JSX.Element }) {
  useAuthCheck();
  const auth = useAuthStatus();
  return auth ? children : <Navigate to={ROUTES.login} />;
}
