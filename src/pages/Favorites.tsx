import { Favorites as FavoritesView } from '../domain/offer/components/favorites';
import { Header } from '../domain/ui/components/Header';
import { useOffersQuery } from '../domain/offer';
import { Loader } from '../domain/ui/components/Loader';
import { Link, Navigate } from 'react-router-dom';
import routes from '../domain/router/constants/ROUTES';
import { setErrorMessage } from '../domain/error/features/setErrorMessage';
import { useAuthCheck } from '../domain/auth/hooks/use-auth-check';

export function Favorites() {
  useAuthCheck();
  const { data: offers, isLoading, isError, error } = useOffersQuery();

  if (isLoading || offers === undefined) {
    return <Loader />;
  }

  if (isError) {
    setErrorMessage(error?.cause?.message);
    return <Navigate to={routes.error} />;
  }

  return (
    <div className="page" data-testid="favorites-page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <FavoritesView />
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={routes.cities}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}
