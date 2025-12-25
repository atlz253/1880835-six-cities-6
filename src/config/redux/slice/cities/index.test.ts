import { citiesSlice } from '.';
import { getCitiesMock } from '../../../../components/city/mocks/get-cities-mocks';
import { extractActionTypes } from '../../utils/action';
import { getMockStoreCreator } from '../../utils/test';
import { getEmptyState } from './state';

describe('cities slice', () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should set current city', () => {
    const store = mockStoreCreator({ cities: getEmptyState() });
    const city = getCitiesMock().Amsterdam;
    store.dispatch(citiesSlice.actions.setCurrentCity(city));
    expect(extractActionTypes(store.getActions())).toEqual([
      citiesSlice.actions.setCurrentCity.type,
    ]);
    const [action] = store.getActions();
    expect(action.payload).toEqual(city);
  });
});
