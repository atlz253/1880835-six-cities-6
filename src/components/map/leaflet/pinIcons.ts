import { icon } from 'leaflet';

export const defaultIcon = icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [12.5, 39],
});

export const currentIcon = icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [12.5, 39],
});
