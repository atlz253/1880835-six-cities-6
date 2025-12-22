import { Header } from '../../components/ui/components/header';
import { useOffersQuery } from '../../components/offer';
import { Loader } from '../../components/ui/components/loader';
import { Link, Navigate } from 'react-router-dom';
import RouterPaths from '../../components/router/constants/router-paths';
import { setErrorMessage } from '../../components/error/features/set-error-message';
import classNames from 'classnames';
import { useAuthCheck } from '../../components/auth/hooks/use-auth-check';
import { Favorites as FavoritesView } from '../../components/offer/components/favorites';

export function Favorites() {
  useAuthCheck();
  const { data: offers, isLoading, isError, error } = useOffersQuery();

  if (isLoading || offers === undefined) {
    return <Loader />;
  }

  if (isError) {
    setErrorMessage(error?.cause?.message);
    return <Navigate to={RouterPaths.error} />;
  }

  return (
    <div className="page" data-testid="favorites-page">
      <Header />
      <main
        className={classNames(
          'page__main page__main--favorites',
          offers.length === 0 && 'page__main--favorites-empty'
        )}
      >
        <div className="page__favorites-container container">
          <FavoritesView />
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={RouterPaths.cities}>
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
