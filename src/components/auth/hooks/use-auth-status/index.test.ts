import { renderHook } from '@testing-library/react';
import { useAuthStatus } from '.';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { getEmptyState } from '../../../../config/redux/slice/auth/state';
import { getProviderWrapperWithStore } from '../../../../hocs/redux/get-provider-wrapper-with-store';

describe(useAuthStatus.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should return auth status', () => {
    const store = mockStoreCreator({ auth: getEmptyState() });
    const { result } = renderHook(() => useAuthStatus(), {
      wrapper: getProviderWrapperWithStore(store),
    });
    expect(result.current).toEqual(false);
  });
});
