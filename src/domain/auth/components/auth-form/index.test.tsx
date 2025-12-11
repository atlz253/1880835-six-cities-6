import { fireEvent, render, screen } from '@testing-library/react';
import { AuthForm } from '.';
import { getCredentialsMock } from '../../mock/get-credentials-mock';
import { Provider } from 'react-redux';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { getEmptyState } from '../../../../config/redux/slice/auth/state';
import { login } from '../../features/login';
import { Mock } from 'vitest';

describe(AuthForm.name, () => {
  const mockStoreCreator = getMockStoreCreator();
  const mockedLogin = login as unknown as Mock;

  beforeAll(() => {
    vi.mock('../../features/login', () => ({ login: vi.fn() }));
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
});
