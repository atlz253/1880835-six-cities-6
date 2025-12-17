import { Option } from '../../../../ui/hooks/use-select';
import SORT_TYPES from '../../../constants/SORT_TYPES';

export default [
  { value: SORT_TYPES.popular, render: () => 'Popular' },
  { value: SORT_TYPES.priceLowToHigh, render: () => 'Price: low to high' },
  { value: SORT_TYPES.priceHighToLow, render: () => 'Price: high to low' },
  { value: SORT_TYPES.topRatedFirst, render: () => 'Top rated first' },
] as const satisfies Option[];
