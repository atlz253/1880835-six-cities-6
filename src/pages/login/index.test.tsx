import { render, screen } from '@testing-library/react';
import { Login } from '.';
import { getEmptyState as getEmptyAuthState } from '../../config/redux/slice/auth/state';
import { getMockStoreCreator } from '../../config/redux/utils/test';
import ROUTES from '../../domain/router/constants/ROUTES';
import { Provider } from 'react-redux';
import { MockAppRouter } from '../../domain/router/utils/test/components';
import { getEmptyState as getEmptyOffersState } from '../../config/redux/slice/offers/state';

describe(Login.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test(`should render login page on ${ROUTES.login}`, () => {
    const store = mockStoreCreator({
      auth: getEmptyAuthState(),
      offers: getEmptyOffersState(),
    });
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[ROUTES.login]} />
      </Provider>
    );
    expect(screen.getAllByText('Sign in')[0]).toBeInTheDocument();
  });
});
