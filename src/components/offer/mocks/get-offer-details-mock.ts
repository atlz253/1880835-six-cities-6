import { getCitiesMock } from '../../../components/city/mocks/get-cities-mocks';
import { getUserMock } from '../../user/mocks/get-user-mock';
import { OfferDetails } from '../types';

export function getOfferDetailsMock(): OfferDetails {
  return {
    id: '0',
    title: 'Offer',
    type: 'apartment',
    price: 1000,
    city: getCitiesMock().Paris,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 30,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4,
    description: 'cool apartment',
    bedrooms: 4,
    goods: ['TV', 'chips'],
    host: getUserMock(),
    images: [
      'https://placehold.jp/150x150.png',
      'https://placehold.jp/3d4070/ffffff/150x150.png',
    ],
    maxAdults: 10,
  };
}
