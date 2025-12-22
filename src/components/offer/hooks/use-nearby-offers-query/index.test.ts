import { renderHook } from '@testing-library/react';
import { useNearbyOffersQuery } from '.';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { getProviderWrapperWithStore } from '../../../../hocs/redux/get-provider-wrapper-with-store';
import { getEmptyState } from '../../../../config/redux/slice/offers/state';
import { extractActionTypes } from '../../../../config/redux/utils/action';
import { nearbyOffersThunk } from '../../../../config/redux/slice/offers';
import { getFulfilledState } from '../../../../config/redux/thunk';
import { getOffersMetaMocks } from '../../mocks/get-offers-meta-mocks';

describe(useNearbyOffersQuery.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should dispatch nearby offers thunk', () => {
    const offerId = 'test';
    const store = mockStoreCreator({ offers: getEmptyState() });
    renderHook(() => useNearbyOffersQuery({ offerID: offerId }), {
      wrapper: getProviderWrapperWithStore(store),
    });
    expect(extractActionTypes(store.getActions())).toEqual([
      nearbyOffersThunk.pending.type,
    ]);
  });

  test('should return nearby offers', () => {
    const offerId = 'test';
    const offers = getOffersMetaMocks();
    const store = mockStoreCreator({
      offers: {
        ...getEmptyState(),
        nearbyOffers: { [offerId]: getFulfilledState(offers) },
      },
    });
    const { result } = renderHook(
      () => useNearbyOffersQuery({ offerID: offerId }),
      {
        wrapper: getProviderWrapperWithStore(store),
      }
    );
    expect(result.current).toEqual(getFulfilledState(offers));
  });

  test('should return nearby offers with length limit', () => {
    const offerId = 'test';
    const offers = getOffersMetaMocks();
    const limit = 3;
    const store = mockStoreCreator({
      offers: {
        ...getEmptyState(),
        nearbyOffers: { [offerId]: getFulfilledState(offers) },
      },
    });
    const { result } = renderHook(
      () => useNearbyOffersQuery({ limit, offerID: offerId }),
      {
        wrapper: getProviderWrapperWithStore(store),
      }
    );
    expect(result.current).toEqual(getFulfilledState(offers.slice(0, limit)));
  });
});
