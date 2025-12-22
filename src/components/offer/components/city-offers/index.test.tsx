import { render, screen } from '@testing-library/react';
import CityOffers from '.';
import { getCitiesMock } from '../../../../components/city/mocks/get-cities-mocks';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { getEmptyState } from '../../../../config/redux/slice/auth/state';
import { Provider } from 'react-redux';
import { getOffersMetaMocks } from '../../mocks/get-offers-meta-mocks';
import { MockPageRouter } from '../../../router/utils/test/components';

describe(CityOffers.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should render city offers', () => {
    const city = getCitiesMock().Paris;
    const offers = getOffersMetaMocks();
    const store = mockStoreCreator({ auth: getEmptyState() });
    const setCurrentOfferMock = vi.fn();
    render(
      <Provider store={store}>
        <MockPageRouter
          path="/"
          element={
            <CityOffers
              city={city}
              offers={offers}
              setCurrentOffer={setCurrentOfferMock}
            />
          }
        />
      </Provider>
    );
    expect(
      screen.getByText(`${offers.length} places to stay in ${city.name}`)
    ).toBeInTheDocument();
  });
});
