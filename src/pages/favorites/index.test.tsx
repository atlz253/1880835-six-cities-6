import { render, screen } from '@testing-library/react';
import { Favorites } from '.';
import { getEmptyState } from '../../config/redux/slice/offers/state';
import { getFulfilledState } from '../../config/redux/thunk';
import { getMockStoreCreator } from '../../config/redux/utils/test';
import { getAuthMock } from '../../domain/auth/mock/get-auth-mock';
import { getOffersMetaMocks } from '../../domain/offer/mocks/get-offers-meta-mocks';
import ROUTES from '../../domain/router/constants/ROUTES';
import { Provider } from 'react-redux';
import { MockAppRouter } from '../../domain/router/utils/test/components';

describe(Favorites.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test(`should render favorites page on ${ROUTES.favorites}`, async () => {
    const auth = getAuthMock();
    const offers = getOffersMetaMocks();
    const store = mockStoreCreator({
      auth: { status: true, auth: getFulfilledState(auth) },
      offers: { ...getEmptyState(), offers: getFulfilledState(offers) },
    });
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[ROUTES.favorites]} />
      </Provider>
    );
    expect(await screen.findByTestId('favorites-page')).toBeInTheDocument();
  });
});
