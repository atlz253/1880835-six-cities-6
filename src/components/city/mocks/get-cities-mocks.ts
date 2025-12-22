import cityNames from '../constants/city-names';
import { City } from '../types';

export function getCitiesMock() {
  return {
    Paris: {
      name: cityNames.Paris,
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    Amsterdam: {
      name: cityNames.Amsterdam,
      location: {
        latitude: 12.85661,
        longitude: 3.351499,
        zoom: 14,
      },
    },
    Brussels: {
      name: cityNames.Brussels,
      location: {
        latitude: 44.85661,
        longitude: 3.3541499,
        zoom: 15,
      },
    },
    Cologne: {
      name: cityNames.Cologne,
      location: {
        latitude: 11.85661,
        longitude: 2.3541499,
        zoom: 30,
      },
    },
    Hamburg: {
      name: cityNames.Hamburg,
      location: {
        latitude: 55.85661,
        longitude: 5.3541499,
        zoom: 33,
      },
    },
    Dusseldorf: {
      name: cityNames.Dusseldorf,
      location: {
        latitude: 32.85661,
        longitude: 44.3541499,
        zoom: 35,
      },
    },
  } satisfies { [key in keyof typeof cityNames]: City };
}
