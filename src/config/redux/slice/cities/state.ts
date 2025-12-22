import defaultCity from '../../../../components/city/constants/default-city';
import { City } from '../../../../components/city/types';

interface CitiesSliceState {
  currentCity: City;
}

const getEmptyState = (): CitiesSliceState => ({
  currentCity: defaultCity,
});

export { getEmptyState };
export type { CitiesSliceState };
