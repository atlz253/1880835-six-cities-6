import { Link, Navigate } from 'react-router-dom';
import { AuthForm } from '../../domain/auth/components/auth-form';
import { useAuthQuery } from '../../domain/auth/hooks/use-auth-query';
import ROUTES from '../../domain/router/constants/ROUTES';
import { setErrorMessage } from '../../domain/error/features/setErrorMessage';
import { isValidationError } from '../../config/redux/thunk';
import { Loader } from '../../domain/ui/components/Loader';

export function Login() {
  const { isLoading, isFetched, isError, error } = useAuthQuery();

  if (isError) {
    if (isValidationError(error)) {
      // eslint-disable-next-line no-alert
      alert(`Login validation error: ${error?.cause?.message}`);
    } else {
      setErrorMessage(error?.cause?.message);
      return <Navigate to={ROUTES.error} />;
    }
  }

  if (isFetched && !isError) {
    return <Navigate to={ROUTES.cities} />;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={ROUTES.cities}>
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
            {isLoading ? <Loader /> : <AuthForm />}
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={ROUTES.cities}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
