import { Option, Select } from '..';

export function getSelectMock({ open }: { open?: boolean } = {}) {
  const options = [
    { value: 'first', render: vi.fn(() => 'first') },
    { value: 'second', render: vi.fn(() => 'second'), selected: true },
    { value: 'third', render: vi.fn(() => 'third') },
  ] satisfies Option[];
  return {
    getOptions: () => options,
    getSelectedOption: () => options.find((o) => o.selected),
    setSelectedOption: vi.fn(() => {}),
    open: Boolean(open),
    setOpen: vi.fn(),
  } satisfies Select;
}
