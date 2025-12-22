import { renderHook } from '@testing-library/react';
import { useCurrentCity } from '.';
import { getProviderWrapperWithStore } from '../../../../hocs/redux/get-provider-wrapper-with-store';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { getEmptyState } from '../../../../config/redux/slice/cities/state';
import defaultCity from '../../constants/default-city';

describe(useCurrentCity.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should return current city', () => {
    const store = mockStoreCreator({ cities: getEmptyState() });
    const { result } = renderHook(() => useCurrentCity(), {
      wrapper: getProviderWrapperWithStore(store),
    });
    expect(result.current).toEqual(defaultCity);
  });
});
