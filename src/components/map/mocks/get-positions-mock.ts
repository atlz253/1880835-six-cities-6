import { Position } from '../types';

export function getPositionsMock() {
  return [
    {
      latitude: 12.3456,
      longitude: 78.9101,
      zoom: 30,
    },
    {
      latitude: 12.3457,
      longitude: 78.9102,
      zoom: 30,
    },
    {
      latitude: 12.3458,
      longitude: 78.9103,
      zoom: 30,
    },
    {
      latitude: 12.3459,
      longitude: 78.9104,
      zoom: 30,
    },
  ] satisfies Position[];
}
