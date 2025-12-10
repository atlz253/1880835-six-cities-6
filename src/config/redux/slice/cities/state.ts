import { City } from '../../../../domain/city';
import defaultCity from '../../../../domain/city/constants/default-city';

interface CitiesSliceState {
  currentCity: City;
}

const getEmptyState = (): CitiesSliceState => ({
  currentCity: defaultCity,
});

export { getEmptyState };
export type { CitiesSliceState };
