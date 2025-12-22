import { renderHook } from '@testing-library/react';
import { useAuthQuery } from '.';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { getEmptyQueryState } from '../../../../config/redux/thunk';
import { Auth } from '../../types';
import { getEmptyState } from '../../../../config/redux/slice/auth/state';
import { getProviderWrapperWithStore } from '../../../../hocs/redux/get-provider-wrapper-with-store';

describe(useAuthQuery.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should return auth query', () => {
    const store = mockStoreCreator({ auth: getEmptyState() });
    const { result } = renderHook(() => useAuthQuery(), {
      wrapper: getProviderWrapperWithStore(store),
    });
    expect(result.current).toEqual(getEmptyQueryState<Auth>());
  });
});
