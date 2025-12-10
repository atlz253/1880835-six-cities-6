import { Link, useNavigate } from 'react-router-dom';
import routes from '../../router/constants/ROUTES';
import { useAuthStatus } from '../../auth/hooks/use-auth-status';
import { preventDefault } from '../../../utils/event';
import { signOut } from '../../auth/features/signOut';
import ROUTES from '../../router/constants/ROUTES';
import { useAuthQuery } from '../../auth/hooks/use-auth-query';
import { useFavoriteOffersQuery } from '../../offer/hooks/use-favorite-offers-query';

export function Header() {
  const { data } = useAuthQuery();
  const isAuth = useAuthStatus();
  const navigate = useNavigate();
  const { data: favoriteOffers } = useFavoriteOffersQuery();

  const onSignOut = preventDefault(() => {
    signOut();
    navigate(ROUTES.login);
  });

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link header__logo-link--active"
              to={routes.cities}
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            {isAuth ? (
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={routes.favorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      {data?.email}
                    </span>
                    <span className="header__favorite-count">
                      {favoriteOffers ? favoriteOffers.length : 0}
                    </span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" onClick={onSignOut}>
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={routes.login}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
