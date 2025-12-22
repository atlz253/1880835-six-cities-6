import SortTypes from '../../../constants/sort-types';
import { Option } from '../../../../ui/hooks/use-select';

export default [
  { value: SortTypes.popular, render: () => 'Popular' },
  { value: SortTypes.priceLowToHigh, render: () => 'Price: low to high' },
  { value: SortTypes.priceHighToLow, render: () => 'Price: high to low' },
  { value: SortTypes.topRatedFirst, render: () => 'Top rated first' },
] satisfies Option[];
