import { renderHook } from '@testing-library/react';
import { useError } from '../../../../components/error/hooks/use-error';
import { getEmptyState } from '../../../../config/redux/slice/error/state';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { getProviderWrapperWithStore } from '../../../../hocs/redux/get-provider-wrapper-with-store';

describe(useError.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should return error state', () => {
    const errorState = getEmptyState();
    const store = mockStoreCreator({ error: errorState });
    const { result } = renderHook(() => useError(), {
      wrapper: getProviderWrapperWithStore(store),
    });
    expect(result.current).toEqual(errorState);
  });
});
