import { render, screen } from '@testing-library/react';
import { Main } from '.';
import { getEmptyState as getEmptyAuthState } from '../../config/redux/slice/auth/state';
import { getEmptyState as getEmptyCitiesState } from '../../config/redux/slice/cities/state';
import { getFulfilledState } from '../../config/redux/thunk';
import { getMockStoreCreator } from '../../config/redux/utils/test';
import ROUTES from '../../components/router/constants/ROUTES';
import { Provider } from 'react-redux';
import { getOffersMetaMocks } from '../../components/offer/mocks/get-offers-meta-mocks';
import { MockAppRouter } from '../../components/router/utils/test/components';

describe(Main.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test(`should render main page on ${ROUTES.cities}`, async () => {
    const offers = getOffersMetaMocks();
    const store = mockStoreCreator({
      auth: getEmptyAuthState(),
      cities: getEmptyCitiesState(),
      offers: { offers: getFulfilledState(offers) },
    });
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[ROUTES.cities]} />
      </Provider>
    );
    expect((await screen.findAllByText('Cities'))[0]).toBeInTheDocument();
  });

  test('should render empty state if offers empty', () => {
    const store = mockStoreCreator({
      auth: getEmptyAuthState(),
      cities: getEmptyCitiesState(),
      offers: { offers: getFulfilledState([]) },
    });
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[ROUTES.cities]} />
      </Provider>
    );
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });
});
