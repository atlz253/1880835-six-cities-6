import { renderHook } from '@testing-library/react';
import { useFavoriteOffersQuery } from '.';
import { getProviderWrapperWithStore } from '../../../../hocs/redux/get-provider-wrapper-with-store';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { getEmptyState as getEmptyOffersState } from '../../../../config/redux/slice/offers/state';
import { extractActionTypes } from '../../../../config/redux/utils/action';
import { favoriteOffersThunk } from '../../../../config/redux/slice/offers';
import { getEmptyQueryState } from '../../../../config/redux/thunk';
import { getEmptyState as getEmptyAuthState } from '../../../../config/redux/slice/auth/state';
import { OfferMeta } from '../../types';
import { getAuthorizedStateMock } from '../../../../config/redux/slice/auth/utils/test';

describe(useFavoriteOffersQuery.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should dispatch favorite offers thunk if authorized', () => {
    const store = mockStoreCreator({
      offers: getEmptyOffersState(),
      auth: getAuthorizedStateMock(),
    });
    renderHook(() => useFavoriteOffersQuery(), {
      wrapper: getProviderWrapperWithStore(store),
    });
    expect(extractActionTypes(store.getActions())).toEqual([
      favoriteOffersThunk.pending.type,
    ]);
  });

  test('should return favorite offers query', () => {
    const store = mockStoreCreator({
      offers: getEmptyOffersState(),
      auth: getEmptyAuthState(),
    });
    const { result } = renderHook(() => useFavoriteOffersQuery(), {
      wrapper: getProviderWrapperWithStore(store),
    });
    expect(result.current).toEqual(getEmptyQueryState<OfferMeta[]>());
  });
});
