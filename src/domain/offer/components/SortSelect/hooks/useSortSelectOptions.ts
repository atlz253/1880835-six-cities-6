import { useMemo, useState } from 'react';
import SORT_TYPES from '../../../constants/SORT_TYPES';
import { Option, useSelect } from '../../../../ui/hooks/use-select';

export function useSortSelectOptions() {
  const options = useMemo<Option[]>(
    () => [
      { value: SORT_TYPES.popular, render: () => 'Popular' },
      { value: SORT_TYPES.priceLowToHigh, render: () => 'Price: low to high' },
      { value: SORT_TYPES.priceHighToLow, render: () => 'Price: high to low' },
      { value: SORT_TYPES.topRatedFirst, render: () => 'Top rated first' },
    ],
    []
  );
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const select = useSelect({ options, selectedOption, setSelectedOption });
  return { select, selectedOption };
}
