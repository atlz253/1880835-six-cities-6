import { renderHook } from '@testing-library/react';
import { useCommentPostQuery } from '.';
import { getEmptyState } from '../../../../config/redux/slice/comments/state';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { getProviderWrapperWithStore } from '../../../../hocs/redux/get-provider-wrapper-with-store';
import { getEmptyQueryState } from '../../../../config/redux/thunk';
import { PostedComment } from '../../types';

describe(useCommentPostQuery.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should return comment post query', () => {
    const store = mockStoreCreator({ comments: getEmptyState() });
    const { result } = renderHook(() => useCommentPostQuery(), {
      wrapper: getProviderWrapperWithStore(store),
    });
    expect(result.current).toEqual(getEmptyQueryState<PostedComment>());
  });
});
