import { renderHook } from '@testing-library/react';
import { useOfferCommentsQuery } from '.';
import { getEmptyState } from '../../../../config/redux/slice/comments/state';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { getProviderWrapperWithStore } from '../../../../hocs/redux/get-provider-wrapper-with-store';
import { extractActionTypes } from '../../../../config/redux/utils/action';
import { offerCommentsThunk } from '../../../../config/redux/slice/comments/action';
import { getEmptyQueryState } from '../../../../config/redux/thunk';
import { PostedComment } from '../../types';

describe(useOfferCommentsQuery.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should dispatch offer comments thunk', () => {
    const offerId = 'test';
    const store = mockStoreCreator({ comments: getEmptyState() });
    renderHook(() => useOfferCommentsQuery(offerId), {
      wrapper: getProviderWrapperWithStore(store),
    });
    expect(extractActionTypes(store.getActions())).toEqual([
      offerCommentsThunk.pending.type,
    ]);
  });

  test('should return offer comments query', () => {
    const offerId = 'test';
    const store = mockStoreCreator({ comments: getEmptyState() });
    const { result } = renderHook(() => useOfferCommentsQuery(offerId), {
      wrapper: getProviderWrapperWithStore(store),
    });
    expect(result.current).toEqual(getEmptyQueryState<PostedComment[]>());
  });
});
