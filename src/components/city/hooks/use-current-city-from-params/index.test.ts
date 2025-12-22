import { renderHook } from '@testing-library/react';
import { useCurrentCityFromParams } from '.';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { useNavigate, useParams } from 'react-router-dom';
import RouterPaths from '../../../router/constants/router-paths';
import { Mock } from 'vitest';
import { setCurrentCity } from '../../features/set-current-city';
import { getCitiesMock } from '../../mocks/get-cities-mocks';
import { getCitiesMockState } from '../../../../config/redux/slice/cities/utils/test';
import cityNames from '../../constants/city-names';
import { getRouterPageWrapper } from '../../../router/utils/test/components';

describe(useCurrentCityFromParams.name, () => {
  const mockStoreCreator = getMockStoreCreator();
  const mockedUseNavigate = useNavigate as unknown as Mock;
  const mockedUseParams = useParams as unknown as Mock;
  const mockedSetCurrentCity = setCurrentCity as unknown as Mock;
  let navigateMock: ReturnType<typeof vi.fn>;

  beforeAll(() => {
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual<object>('react-router-dom');
      return {
        ...actual,
        useParams: vi.fn(),
        useNavigate: vi.fn(),
      };
    });

    vi.mock('../../features/set-current-city', () => ({
      setCurrentCity: vi.fn(),
    }));
  });

  beforeEach(() => {
    vi.clearAllMocks();
    navigateMock = vi.fn();
    mockedUseNavigate.mockReturnValue(navigateMock);
  });

  test('should do nothing if no query params and current city is default', () => {
    const store = mockStoreCreator(getCitiesMockState());
    mockedUseParams.mockReturnValue({});
    renderHook(() => useCurrentCityFromParams(), {
      wrapper: getRouterPageWrapper({ store, route: RouterPaths.cities }),
    });
    expect(navigateMock).not.toHaveBeenCalled();
    expect(mockedSetCurrentCity).not.toHaveBeenCalled();
  });

  test('should set city from query params as current', () => {
    const store = mockStoreCreator(getCitiesMockState());
    const expectedCityToSwitch = getCitiesMock().Amsterdam;
    mockedUseParams.mockReturnValue({ city: cityNames.Amsterdam });
    renderHook(() => useCurrentCityFromParams(), {
      wrapper: getRouterPageWrapper({ store, route: RouterPaths.cities }),
    });
    expect(navigateMock).not.toHaveBeenCalled();
    expect(mockedSetCurrentCity).toHaveBeenCalledWith(expectedCityToSwitch);
  });

  test('should navigate to not found page if city from params not found', () => {
    const store = mockStoreCreator(getCitiesMockState());
    mockedUseParams.mockReturnValue({ city: 'test' });
    renderHook(() => useCurrentCityFromParams(), {
      wrapper: getRouterPageWrapper({ store, route: RouterPaths.cities }),
    });
    expect(mockedSetCurrentCity).not.toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith(RouterPaths.notFound);
  });
});
