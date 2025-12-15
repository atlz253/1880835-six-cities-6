import { fireEvent, render, screen } from '@testing-library/react';
import { Card } from '.';
import { getOfferDetailsMock } from '../../mocks/get-offer-details-mock';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { getEmptyState } from '../../../../config/redux/slice/auth/state';
import { Provider } from 'react-redux';
import { MockPageRouter } from '../../../router/utils/test/components';
import ROUTES from '../../../router/constants/ROUTES';
import { removeOfferWithIdFromFavorites } from '../../features/removeOfferWithIdFromFavorites';
import { addOfferWithIdToFavorites } from '../../features/addOfferWithIdToFavorites';
import { getAuthorizedStateMock } from '../../../../config/redux/slice/auth/utils/test';
import { OfferDetails } from '../../types';

describe(Card.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  beforeAll(() => {
    vi.mock('../../features/removeOfferWithIdFromFavorites', () => ({
      removeOfferWithIdFromFavorites: vi.fn(),
    }));
    vi.mock('../../features/addOfferWithIdToFavorites', () => ({
      addOfferWithIdToFavorites: vi.fn(),
    }));
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render', () => {
    const offer = getOfferDetailsMock();
    const store = mockStoreCreator({ auth: getEmptyState() });
    render(
      <Provider store={store}>
        <MockPageRouter
          path={ROUTES.cities}
          element={<Card offer={offer} imageURL={offer.images[0]} />}
        />
      </Provider>
    );
    expect(screen.getByText(offer.title)).toBeInTheDocument();
  });

  test('add offer to favorites should work', () => {
    const offer: OfferDetails = { ...getOfferDetailsMock(), isFavorite: false };
    const store = mockStoreCreator({ auth: getAuthorizedStateMock() });
    render(
      <Provider store={store}>
        <MockPageRouter
          path={ROUTES.cities}
          element={<Card offer={offer} imageURL={offer.images[0]} />}
        />
      </Provider>
    );
    const favoriteButton = screen.getByTestId('favorite-button');
    fireEvent.click(favoriteButton);
    expect(addOfferWithIdToFavorites).toBeCalledTimes(1);
  });

  test('remove offer from favorites should work', () => {
    const offer: OfferDetails = { ...getOfferDetailsMock(), isFavorite: true };
    const store = mockStoreCreator({ auth: getAuthorizedStateMock() });
    render(
      <Provider store={store}>
        <MockPageRouter
          path={ROUTES.cities}
          element={<Card offer={offer} imageURL={offer.images[0]} />}
        />
      </Provider>
    );
    const favoriteButton = screen.getByTestId('favorite-button');
    fireEvent.click(favoriteButton);
    expect(removeOfferWithIdFromFavorites).toBeCalledTimes(1);
  });

  test('premium label should be visible if premium offer', () => {
    const offer: OfferDetails = { ...getOfferDetailsMock(), isPremium: true };
    const store = mockStoreCreator({ auth: getAuthorizedStateMock() });
    render(
      <Provider store={store}>
        <MockPageRouter
          path={ROUTES.cities}
          element={<Card offer={offer} imageURL={offer.images[0]} />}
        />
      </Provider>
    );
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });
});
