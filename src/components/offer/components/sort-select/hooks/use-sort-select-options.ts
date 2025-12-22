import { useMemo, useState } from 'react';
import { Option, useSelect } from '../../../../ui/hooks/use-select';
import SortSelectOptions from '../constants/sort-select-options';

export function useSortSelectOptions() {
  const options = useMemo<Option[]>(() => SortSelectOptions, []);
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const select = useSelect({ options, selectedOption, setSelectedOption });
  return { select, selectedOption };
}
