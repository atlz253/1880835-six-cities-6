import { Link, Navigate } from 'react-router-dom';
import { AuthForm } from '../../components/auth/components/auth-form';
import { useAuthQuery } from '../../components/auth/hooks/use-auth-query';
import RouterPaths from '../../components/router/constants/router-paths';
import { setErrorMessage } from '../../components/error/features/set-error-message';
import { isValidationError } from '../../config/redux/thunk';
import { Loader } from '../../components/ui/components/loader';
import { RandomCityLink } from '../../components/city/components/random-city-link';

export function Login() {
  const {
    isLoading: isAuthLoading,
    isFetched: isAuthFetched,
    isError: isAuthError,
    error: authError,
  } = useAuthQuery();

  if (isAuthError) {
    if (isValidationError(authError)) {
      // eslint-disable-next-line no-alert
      alert(`Login validation error: ${authError?.cause?.message}`);
    } else {
      setErrorMessage(authError?.cause?.message);
      return <Navigate to={RouterPaths.error} />;
    }
  }

  if (isAuthFetched && !isAuthError) {
    return <Navigate to={RouterPaths.cities} />;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={RouterPaths.cities}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            {isAuthLoading ? <Loader /> : <AuthForm />}
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <RandomCityLink className="locations__item-link" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
