import { useRef, useState } from 'react';
import { createOnChangeHandler } from '../../../../utils/react/form/create-on-change-handler';
import { preventDefault } from '../../../../utils/event';
import { isValidPassword } from '../../utils/password';
import { Credentials } from '../../types';
import { login } from '../../features/login';

export function AuthForm() {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleInputChange = createOnChangeHandler((builder) =>
    builder
      .addCase('email', (value) =>
        setCredentials((s) => ({ ...s, email: value }))
      )
      .addCase('password', (value) =>
        setCredentials((s) => ({ ...s, password: value }))
      )
  );

  return (
    <form
      className="login__form form"
      action="#"
      method="post"
      data-testid="auth-form"
      ref={formRef}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleInputChange}
          data-testid="email-input"
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleInputChange}
          data-testid="password-input"
          required
        />
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
        onClick={preventDefault(() => login(credentials))}
        data-testid="login-button"
        disabled={
          !formRef.current?.checkValidity() ||
          !isValidPassword(credentials.password)
        }
      >
        Sign in
      </button>
    </form>
  );
}
