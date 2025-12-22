import { fireEvent, render, screen } from '@testing-library/react';
import { AuthForm } from '.';
import { getCredentialsMock } from '../../mock/get-credentials-mock';
import { Provider } from 'react-redux';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { getEmptyState } from '../../../../config/redux/slice/auth/state';
import { Mock } from 'vitest';
import { login } from '../../features/login';

describe(AuthForm.name, () => {
  const mockStoreCreator = getMockStoreCreator();
  const mockedLogin = login as unknown as Mock;

  beforeAll(() => {
    vi.mock('../../features/login', () => ({
      login: vi.fn(),
    }));
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render', () => {
    render(<AuthForm />);
    expect(screen.getByTestId('auth-form')).toBeInTheDocument();
  });

  test('inputs should work', () => {
    const credentials = getCredentialsMock();
    render(<AuthForm />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(emailInput, { target: { value: credentials.email } });
    fireEvent.change(passwordInput, {
      target: { value: credentials.password },
    });
    expect(emailInput).toHaveValue(credentials.email);
    expect(passwordInput).toHaveValue(credentials.password);
  });

  test('should call login', () => {
    const credentials = getCredentialsMock();
    const store = mockStoreCreator({ auth: getEmptyState() });
    render(
      <Provider store={store}>
        <AuthForm />
      </Provider>
    );
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-button');
    fireEvent.change(emailInput, { target: { value: credentials.email } });
    fireEvent.change(passwordInput, {
      target: { value: credentials.password },
    });
    fireEvent.click(loginButton);
    expect(mockedLogin).toHaveBeenCalledTimes(1);
  });

  test('sign in button should be disabled if email or password empty', () => {
    const credentials = getCredentialsMock();
    render(<AuthForm />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-button');
    expect(loginButton.hasAttribute('disabled')).toEqual(true);
    fireEvent.change(emailInput, { target: { value: credentials.email } });
    expect(loginButton.hasAttribute('disabled')).toEqual(true);
    fireEvent.change(passwordInput, {
      target: { value: credentials.password },
    });
    expect(loginButton.hasAttribute('disabled')).toEqual(false);
    fireEvent.change(emailInput, { target: { value: '' } });
    expect(loginButton.hasAttribute('disabled')).toEqual(true);
  });

  test('sign in button should be disabled if email invalid', () => {
    const credentials = getCredentialsMock();
    render(<AuthForm />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-button');
    fireEvent.change(emailInput, { target: { value: 'invalid email' } });
    fireEvent.change(passwordInput, {
      target: { value: credentials.password },
    });
    expect(loginButton.hasAttribute('disabled')).toEqual(true);
  });

  test('sign in button should be disabled if password invalid', () => {
    const credentials = getCredentialsMock();
    render(<AuthForm />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-button');
    fireEvent.change(emailInput, { target: { value: credentials.email } });
    fireEvent.change(passwordInput, {
      target: { value: 'invalid' },
    });
    expect(loginButton.hasAttribute('disabled')).toEqual(true);
    fireEvent.change(passwordInput, {
      target: { value: '123' },
    });
    expect(loginButton.hasAttribute('disabled')).toEqual(true);
    fireEvent.change(passwordInput, {
      target: { value: 'v1' },
    });
    expect(loginButton.hasAttribute('disabled')).toEqual(false);
  });
});
