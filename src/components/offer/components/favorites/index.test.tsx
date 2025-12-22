import { render, screen } from '@testing-library/react';
import { Favorites } from '.';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { Provider } from 'react-redux';
import { getEmptyState as getEmptyOffersState } from '../../../../config/redux/slice/offers/state';
import { getFulfilledState } from '../../../../config/redux/thunk';
import { getEmptyState as getAuthEmptyState } from '../../../../config/redux/slice/auth/state';
import { getOffersMetaMocks } from '../../mocks/get-offers-meta-mocks';
import { MockPageRouter } from '../../../router/utils/test/components';

describe(Favorites.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should render favorite offers', () => {
    const offers = getOffersMetaMocks();
    const cityNames = Array.from(new Set(offers.map((o) => o.city.name)));
    const store = mockStoreCreator({
      auth: getAuthEmptyState(),
      offers: {
        ...getEmptyOffersState(),
        favoriteOffers: getFulfilledState(offers),
      },
    });
    render(
      <Provider store={store}>
        <MockPageRouter path="/" element={<Favorites />} />
      </Provider>
    );
    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    offers.forEach((o) =>
      expect(screen.getByText(o.title)).toBeInTheDocument()
    );
    cityNames.forEach((n) => expect(screen.getByText(n)).toBeInTheDocument());
  });
});
