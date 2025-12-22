import SORT_TYPES from '../../../components/offer/constants/SORT_TYPES';
import { Offer } from '../types';

export function comparatorBySortType(
  type: string
): (a: Offer, b: Offer) => number {
  switch (type) {
    case SORT_TYPES.priceHighToLow:
      return (a, b) => b.price - a.price;
    case SORT_TYPES.priceLowToHigh:
      return (a, b) => a.price - b.price;
    case SORT_TYPES.topRatedFirst:
      return (a, b) => b.rating - a.rating;
    default:
    case SORT_TYPES.popular:
      return () => 0;
  }
}
