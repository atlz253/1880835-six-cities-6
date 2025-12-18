import { fireEvent, render, screen } from '@testing-library/react';
import { Offer } from '.';
import { getEmptyState as getEmptyAuthState } from '../../config/redux/slice/auth/state';
import { getEmptyState as getEmptyCommentsState } from '../../config/redux/slice/comments/state';
import { getEmptyState as getEmptyOffersState } from '../../config/redux/slice/offers/state';
import { getFulfilledState } from '../../config/redux/thunk';
import { getMockStoreCreator } from '../../config/redux/utils/test';
import { getPostedCommentsMock } from '../../domain/comment/mocks/get-posted-comments-mock';
import { getOfferDetailsMock } from '../../domain/offer/mocks/get-offer-details-mock';
import { getOffersMetaMocks } from '../../domain/offer/mocks/get-offers-meta-mocks';
import ROUTES from '../../domain/router/constants/ROUTES';
import { Provider } from 'react-redux';
import {
  MockAppRouter,
  MockRouter,
} from '../../domain/router/utils/test/components';
import { Route, Routes } from 'react-router-dom';
import { CurrentLocation } from '../../domain/router/components/current-location';
import { addOfferWithIdToFavorites } from '../../domain/offer/features/addOfferWithIdToFavorites';
import { getAuthorizedStateMock } from '../../config/redux/slice/auth/utils/test';
import { removeOfferWithIdFromFavorites } from '../../domain/offer/features/removeOfferWithIdFromFavorites';
import { OfferDetails } from '../../domain/offer';

describe(Offer.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  beforeAll(() => {
    vi.mock(
      '../../domain/offer/features/removeOfferWithIdFromFavorites',
      () => ({
        removeOfferWithIdFromFavorites: vi.fn(),
      })
    );
    vi.mock('../../domain/offer/features/addOfferWithIdToFavorites', () => ({
      addOfferWithIdToFavorites: vi.fn(),
    }));
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test(`should render offer page on ${ROUTES.offer({
    id: ':id',
  })}`, async () => {
    const offer = getOfferDetailsMock();
    const nearbyOffers = getOffersMetaMocks();
    const offerComments = getPostedCommentsMock();
    const store = mockStoreCreator({
      auth: getEmptyAuthState(),
      offers: {
        ...getEmptyOffersState(),
        offer: { test: getFulfilledState(offer) },
        nearbyOffers: { test: getFulfilledState(nearbyOffers) },
      },
      comments: {
        ...getEmptyCommentsState(),
        offerComments: { test: getFulfilledState(offerComments) },
      },
    });
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[ROUTES.offer({ id: 'test' })]} />
      </Provider>
    );
    expect(await screen.findByText('Meet the host')).toBeInTheDocument();
  });

  test('should navigate to login page on favorite button click if not authorized', () => {
    const offer = getOfferDetailsMock();
    const nearbyOffers = getOffersMetaMocks();
    const offerComments = getPostedCommentsMock();
    const store = mockStoreCreator({
      auth: getEmptyAuthState(),
      offers: {
        ...getEmptyOffersState(),
        offer: { test: getFulfilledState(offer) },
        nearbyOffers: { test: getFulfilledState(nearbyOffers) },
      },
      comments: {
        ...getEmptyCommentsState(),
        offerComments: { test: getFulfilledState(offerComments) },
      },
    });
    render(
      <Provider store={store}>
        <MockRouter initialEntries={[ROUTES.offer({ id: 'test' })]}>
          <Routes>
            <Route path={ROUTES.offer({ id: ':id' })} element={<Offer />} />
            <Route path={ROUTES.login} element={<CurrentLocation />} />
          </Routes>
        </MockRouter>
      </Provider>
    );
    const favoritesButton = screen.getByTestId('favorites-button');
    fireEvent.click(favoritesButton);
    const currentLocation = screen.getByTestId(CurrentLocation.testId);
    expect(currentLocation.textContent).toEqual(ROUTES.login);
  });

  test('should add offer to favorites on favorites button click', () => {
    const offer: OfferDetails = { ...getOfferDetailsMock(), isFavorite: false };
    const nearbyOffers = getOffersMetaMocks();
    const offerComments = getPostedCommentsMock();
    const store = mockStoreCreator({
      auth: getAuthorizedStateMock(),
      offers: {
        ...getEmptyOffersState(),
        offer: { test: getFulfilledState(offer) },
        nearbyOffers: { test: getFulfilledState(nearbyOffers) },
      },
      comments: {
        ...getEmptyCommentsState(),
        offerComments: { test: getFulfilledState(offerComments) },
      },
    });
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[ROUTES.offer({ id: 'test' })]} />
      </Provider>
    );
    const favoritesButton = screen.getByTestId('favorites-button');
    fireEvent.click(favoritesButton);
    expect(addOfferWithIdToFavorites).toBeCalledTimes(1);
  });

  test('should remove offer from favorites on favorites button click', () => {
    const offer: OfferDetails = { ...getOfferDetailsMock(), isFavorite: true };
    const nearbyOffers = getOffersMetaMocks();
    const offerComments = getPostedCommentsMock();
    const store = mockStoreCreator({
      auth: getAuthorizedStateMock(),
      offers: {
        ...getEmptyOffersState(),
        offer: { test: getFulfilledState(offer) },
        nearbyOffers: { test: getFulfilledState(nearbyOffers) },
      },
      comments: {
        ...getEmptyCommentsState(),
        offerComments: { test: getFulfilledState(offerComments) },
      },
    });
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[ROUTES.offer({ id: 'test' })]} />
      </Provider>
    );
    const favoritesButton = screen.getByTestId('favorites-button');
    fireEvent.click(favoritesButton);
    expect(removeOfferWithIdFromFavorites).toBeCalledTimes(1);
  });
});
