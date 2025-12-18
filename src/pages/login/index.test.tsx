import { render, screen } from '@testing-library/react';
import { Login } from '.';
import { getEmptyState } from '../../config/redux/slice/auth/state';
import { getMockStoreCreator } from '../../config/redux/utils/test';
import ROUTES from '../../domain/router/constants/ROUTES';
import { Provider } from 'react-redux';
import { MockAppRouter } from '../../domain/router/utils/test/components';

describe(Login.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test(`should render login page on ${ROUTES.login}`, () => {
    const store = mockStoreCreator({ auth: getEmptyState() });
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[ROUTES.login]} />
      </Provider>
    );
    expect(screen.getAllByText('Sign in')[0]).toBeInTheDocument();
  });
});
