import {
  addOfferToFavoritesThunk,
  favoriteOffersThunk,
  nearbyOffersThunk,
  offersThunk,
  offerThunk,
  removeOfferFromFavoritesThunk,
} from '.';
import { getEmptyState } from './state';
import { ENDPOINTS } from '../../../axios';
import HTTP_STATUS from '../../../axios/constants/HTTP_STATUS';
import { expectFulfilledThunkValue } from '../../utils/test';
import { OfferMeta } from '../../../../components/offer';
import { getApiMock } from '../../../axios/utils/test';
import { getMockStoreCreator } from '../../utils/test';
import { getAuthMock } from '../../../../components/auth/mock/get-auth-mock';
import { getFulfilledState } from '../../thunk';
import { getOfferDetailsMock } from '../../../../components/offer/mocks/get-offer-details-mock';
import { getOffersMetaMocks } from '../../../../components/offer/mocks/get-offers-meta-mocks';

describe('offers slice', () => {
  const apiMock = getApiMock();
  const mockStoreCreator = getMockStoreCreator();
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ offers: getEmptyState() });
  });

  describe('offers thunk', () => {
    test('should fetch offers on fulfilled', async () => {
      const offers = getOffersMetaMocks();
      apiMock.onGet(ENDPOINTS.offers).replyOnce(HTTP_STATUS.ok, offers);
      await store.dispatch(offersThunk());
      expectFulfilledThunkValue({
        store: store,
        thunk: offersThunk,
        value: offers,
      });
    });
  });

  describe('offer thunk', () => {
    test('should fetch offer on fulfilled', async () => {
      const offer = getOfferDetailsMock();
      apiMock.onGet(ENDPOINTS.offer(offer.id)).replyOnce(HTTP_STATUS.ok, offer);
      await store.dispatch(offerThunk(offer.id));
      expectFulfilledThunkValue({
        store: store,
        thunk: offerThunk,
        value: offer,
      });
    });
  });

  describe('nearby offers thunk', () => {
    test('should fetch nearby offers on fulfilled', async () => {
      const offerId = 'test';
      const nearbyOffers = getOffersMetaMocks();
      apiMock
        .onGet(ENDPOINTS.nearbyOffers(offerId))
        .replyOnce(HTTP_STATUS.ok, nearbyOffers);
      await store.dispatch(nearbyOffersThunk(offerId));
      expectFulfilledThunkValue({
        store: store,
        thunk: nearbyOffersThunk,
        value: nearbyOffers,
      });
    });
  });

  describe('favorite offers thunk', () => {
    test('should fetch favorite offers on fulfilled', async () => {
      const storeWithAuth = mockStoreCreator({
        offers: getEmptyState(),
        auth: { status: true, auth: getFulfilledState(getAuthMock()) },
      });
      const favoriteOffers = getOffersMetaMocks();
      apiMock
        .onGet(ENDPOINTS.favorite)
        .replyOnce(HTTP_STATUS.ok, favoriteOffers);
      await storeWithAuth.dispatch(favoriteOffersThunk());
      expectFulfilledThunkValue({
        store: storeWithAuth,
        thunk: favoriteOffersThunk,
        value: favoriteOffers,
      });
    });
  });

  describe('add offer to favorites thunk', () => {
    test('should fetch updated offer on fulfilled', async () => {
      const offerMeta: OfferMeta = {
        ...getOffersMetaMocks()[0],
        isFavorite: false,
      };
      apiMock
        .onPost(
          ENDPOINTS.offerFavoriteState({
            offerId: offerMeta.id,
            isFavorite: true,
          })
        )
        .replyOnce(HTTP_STATUS.ok, { ...offerMeta, isFavorite: true });
      await store.dispatch(addOfferToFavoritesThunk(offerMeta.id));
      expectFulfilledThunkValue({
        store: store,
        thunk: addOfferToFavoritesThunk,
        value: { ...offerMeta, isFavorite: true },
      });
    });
  });

  describe('remove offer from favorites thunk', () => {
    test('should fetch updated offer on fulfilled', async () => {
      const offerMeta: OfferMeta = {
        ...getOffersMetaMocks()[0],
        isFavorite: true,
      };
      apiMock
        .onPost(
          ENDPOINTS.offerFavoriteState({
            offerId: offerMeta.id,
            isFavorite: false,
          })
        )
        .replyOnce(HTTP_STATUS.ok, { ...offerMeta, isFavorite: false });
      await store.dispatch(removeOfferFromFavoritesThunk(offerMeta.id));
      expectFulfilledThunkValue({
        store: store,
        thunk: removeOfferFromFavoritesThunk,
        value: { ...offerMeta, isFavorite: false },
      });
    });
  });
});
