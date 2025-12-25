import { fireEvent, render, screen } from '@testing-library/react';
import { Card } from '.';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { getEmptyState } from '../../../../config/redux/slice/auth/state';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { getAuthorizedStateMock } from '../../../../config/redux/slice/auth/utils/test';
import { OfferDetails } from '../..';
import { addOfferWithIdToFavorites } from '../../features/add-offer-with-id-to-favorites';
import { removeOfferWithIdFromFavorites } from '../../features/remove-offer-with-id-from-favorites';
import RouterPaths from '../../../router/constants/router-paths';
import { getOfferDetailsMock } from '../../mocks/get-offer-details-mock';
import { CurrentLocation } from '../../../router/components/current-location';
import {
  MockPageRouter,
  MockRouter,
} from '../../../router/utils/test/components';

describe(Card.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  beforeAll(() => {
    vi.mock('../../features/remove-offer-with-id-from-favorites', () => ({
      removeOfferWithIdFromFavorites: vi.fn(),
    }));
    vi.mock('../../features/add-offer-with-id-to-favorites', () => ({
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
          path={RouterPaths.cities}
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
          path={RouterPaths.cities}
          element={<Card offer={offer} imageURL={offer.images[0]} />}
        />
      </Provider>
    );
    const favoriteButton = screen.getByTestId('favorite-button');
    fireEvent.click(favoriteButton);
    expect(vi.mocked(addOfferWithIdToFavorites)).toBeCalledTimes(1);
  });

  test('remove offer from favorites should work', () => {
    const offer: OfferDetails = { ...getOfferDetailsMock(), isFavorite: true };
    const store = mockStoreCreator({ auth: getAuthorizedStateMock() });
    render(
      <Provider store={store}>
        <MockPageRouter
          path={RouterPaths.cities}
          element={<Card offer={offer} imageURL={offer.images[0]} />}
        />
      </Provider>
    );
    const favoriteButton = screen.getByTestId('favorite-button');
    fireEvent.click(favoriteButton);
    expect(vi.mocked(removeOfferWithIdFromFavorites)).toBeCalledTimes(1);
  });

  test('premium label should be visible if premium offer', () => {
    const offer: OfferDetails = { ...getOfferDetailsMock(), isPremium: true };
    const store = mockStoreCreator({ auth: getAuthorizedStateMock() });
    render(
      <Provider store={store}>
        <MockPageRouter
          path={RouterPaths.cities}
          element={<Card offer={offer} imageURL={offer.images[0]} />}
        />
      </Provider>
    );
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  test('should navigate to login page on favorites button click if not authorized', () => {
    const offer: OfferDetails = { ...getOfferDetailsMock(), isFavorite: false };
    const store = mockStoreCreator({ auth: getEmptyState() });
    render(
      <Provider store={store}>
        <MockRouter>
          <Routes>
            <Route
              path={RouterPaths.cities}
              element={<Card offer={offer} imageURL={offer.images[0]} />}
            />
            <Route path={RouterPaths.login} element={<CurrentLocation />} />
          </Routes>
        </MockRouter>
      </Provider>
    );
    const favoriteButton = screen.getByTestId('favorite-button');
    fireEvent.click(favoriteButton);
    const currentLocation = screen.getByTestId(CurrentLocation.testId);
    expect(currentLocation.textContent).toEqual(RouterPaths.login);
  });
});
