import { renderHook } from '@testing-library/react';
import { Option, useSelect } from '.';

describe(useSelect.name, () => {
  test('should return select model', () => {
    const options: Option[] = [
      { value: 'first', render: () => 'first option' },
      { value: 'second', render: () => <span>JSX option</span> },
      { value: 'third', selected: true, render: () => 'third option' },
    ];
    const { result } = renderHook(() =>
      useSelect({
        options,
        selectedOption: options.find((o) => o.selected),
        setSelectedOption: () => {},
      })
    );
    expect(result.current.getOptions().map((o) => o.value)).toEqual(
      options.map((o) => o.value)
    );
    expect(result.current.getSelectedOption()?.value).toEqual(
      options.find((o) => o.selected)?.value
    );
  });
});
