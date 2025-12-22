import SORT_TYPES from '../constants/sort-types';
import { Offer } from '../types';

export function getComparatorBySortType(
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
