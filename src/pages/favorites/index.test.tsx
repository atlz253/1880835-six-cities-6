import { render, screen } from '@testing-library/react';
import { Favorites } from '.';
import { getEmptyState } from '../../config/redux/slice/offers/state';
import { getFulfilledState } from '../../config/redux/thunk';
import { getMockStoreCreator } from '../../config/redux/utils/test';
import { getAuthMock } from '../../components/auth/mock/get-auth-mock';
import RouterPaths from '../../components/router/constants/router-paths';
import { Provider } from 'react-redux';
import { getOffersMetaMocks } from '../../components/offer/mocks/get-offers-meta-mocks';
import { MockAppRouter } from '../../components/router/utils/test/components';

describe(Favorites.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test(`should render favorites page on ${RouterPaths.favorites}`, () => {
    const auth = getAuthMock();
    const offers = getOffersMetaMocks();
    const store = mockStoreCreator({
      auth: { status: true, auth: getFulfilledState(auth) },
      offers: { ...getEmptyState(), offers: getFulfilledState(offers) },
    });
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[RouterPaths.favorites]} />
      </Provider>
    );
    expect(screen.getByTestId('favorites-page')).toBeInTheDocument();
  });

  test('should empty state if favorite offers not present', () => {
    const auth = getAuthMock();
    const store = mockStoreCreator({
      auth: { status: true, auth: getFulfilledState(auth) },
      offers: { ...getEmptyState(), offers: getFulfilledState([]) },
    });
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[RouterPaths.favorites]} />
      </Provider>
    );
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });
});
