import { City } from '../types';

export default {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13,
  },
} as const satisfies City;
