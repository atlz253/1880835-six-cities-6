import { store } from '../../../config/redux';
import { citiesSlice } from '../../../config/redux/slice/cities';
import { City } from '../types';

export function setCurrentCity(city: City) {
  store.dispatch(citiesSlice.actions.setCurrentCity(city));
}
