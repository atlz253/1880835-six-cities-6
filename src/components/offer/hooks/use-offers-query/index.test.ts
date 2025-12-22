import { renderHook } from '@testing-library/react';
import { useOffersQuery } from '.';
import { getEmptyState } from '../../../../config/redux/slice/offers/state';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { getProviderWrapperWithStore } from '../../../../hocs/redux/get-provider-wrapper-with-store';
import { extractActionTypes } from '../../../../config/redux/utils/action';
import { offersThunk } from '../../../../config/redux/slice/offers';
import { getFulfilledState } from '../../../../config/redux/thunk';
import { getOffersMetaMocks } from '../../mocks/get-offers-meta-mocks';

describe(useOffersQuery.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should dispatch offers thunk', () => {
    const store = mockStoreCreator({ offers: getEmptyState() });
    renderHook(() => useOffersQuery(), {
      wrapper: getProviderWrapperWithStore(store),
    });
    expect(extractActionTypes(store.getActions())).toEqual([
      offersThunk.pending.type,
    ]);
  });

  test('should return offers query', () => {
    const offers = getOffersMetaMocks();
    const store = mockStoreCreator({
      offers: { ...getEmptyState(), offers: getFulfilledState(offers) },
    });
    const { result } = renderHook(() => useOffersQuery(), {
      wrapper: getProviderWrapperWithStore(store),
    });
    expect(result.current).toEqual(getFulfilledState(offers));
  });
});
