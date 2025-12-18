import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react';

export interface Select {
  getOptions: () => SelectOption[];
  getSelectedOption: () => SelectOption | undefined;
  setSelectedOption:
    | Dispatch<SetStateAction<Option | undefined>>
    | Dispatch<SetStateAction<Option>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface SelectOption extends Option {
  render: () => ReactNode;
}

export interface Option {
  value: string;
  selected?: boolean;
  render: (props: { option: Option; select: Select }) => ReactNode;
}

export function useSelect({
  options,
  selectedOption,
  setSelectedOption,
}: {
  options: Option[];
  selectedOption?: Option;
  setSelectedOption:
    | Dispatch<SetStateAction<Option | undefined>>
    | Dispatch<SetStateAction<Option>>;
}): Select {
  const [open, setOpen] = useState(false);
  const selectOptions: SelectOption[] = useMemo(
    () =>
      options.map((option) => ({
        ...option,
        render: () =>
          option.render({
            option,
            select: {
              getOptions: () => selectOptions,
              getSelectedOption: () =>
                selectedOption
                  ? selectOptions.find((o) => o.value === selectedOption.value)
                  : undefined,
              open,
              setOpen,
              setSelectedOption,
            },
          }),
      })),
    [options, open, selectedOption, setSelectedOption]
  );
  return {
    getOptions: () => selectOptions,
    getSelectedOption: () =>
      selectedOption
        ? selectOptions.find((o) => o.value === selectedOption.value)
        : undefined,
    open,
    setOpen,
    setSelectedOption,
  };
}
