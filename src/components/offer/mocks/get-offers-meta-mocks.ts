import { OfferMeta } from '..';
import { getCitiesMock } from '../../../components/city/mocks/get-cities-mocks';
import offerTypes from '../../../components/offer/constants/offer-types';

export function getOffersMetaMocks(): OfferMeta[] {
  const cities = getCitiesMock();

  return [
    {
      id: '0',
      previewImage: 'https://placehold.jp/150x150.png',
      title: 'Offer mock 0',
      type: offerTypes.apartment,
      price: 100,
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 30,
      },
      isFavorite: false,
      isPremium: false,
      rating: 4,
      city: cities.Paris,
    },
    {
      id: '1',
      previewImage: 'https://placehold.jp/150x150.png',
      title: 'Offer mock 1',
      type: offerTypes.room,
      price: 500,
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 30,
      },
      isFavorite: true,
      isPremium: false,
      rating: 2,
      city: cities.Amsterdam,
    },
    {
      id: '2',
      previewImage: 'https://placehold.jp/150x150.png',
      title: 'Offer mock 2',
      type: offerTypes.apartment,
      price: 100,
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 30,
      },
      isFavorite: false,
      isPremium: true,
      rating: 3,
      city: cities.Dusseldorf,
    },
    {
      id: '3',
      previewImage: 'https://placehold.jp/150x150.png',
      title: 'Offer mock 3',
      type: offerTypes.apartment,
      price: 100,
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 30,
      },
      isFavorite: false,
      isPremium: true,
      rating: 3,
      city: cities.Dusseldorf,
    },
    {
      id: '4',
      previewImage: 'https://placehold.jp/150x150.png',
      title: 'Offer mock 4',
      type: offerTypes.apartment,
      price: 100,
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 30,
      },
      isFavorite: false,
      isPremium: true,
      rating: 3,
      city: cities.Dusseldorf,
    },
  ];
}
