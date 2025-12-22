import { render, screen } from '@testing-library/react';
import { Login } from '.';
import { getEmptyState as getEmptyAuthState } from '../../config/redux/slice/auth/state';
import { getMockStoreCreator } from '../../config/redux/utils/test';
import RouterPaths from '../../components/router/constants/router-paths';
import { Provider } from 'react-redux';
import { getEmptyState as getEmptyOffersState } from '../../config/redux/slice/offers/state';
import { MockAppRouter } from '../../components/router/utils/test/components';

describe(Login.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test(`should render login page on ${RouterPaths.login}`, () => {
    const store = mockStoreCreator({
      auth: getEmptyAuthState(),
      offers: getEmptyOffersState(),
    });
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[RouterPaths.login]} />
      </Provider>
    );
    expect(screen.getAllByText('Sign in')[0]).toBeInTheDocument();
  });
});
