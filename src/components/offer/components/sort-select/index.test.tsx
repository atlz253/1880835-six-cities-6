import { fireEvent, render, screen, within } from '@testing-library/react';
import { SortSelect } from '.';
import { getSelectMock } from '../../../ui/hooks/use-select/mocks/get-select-mock';

describe(SortSelect.name, () => {
  test('should render', () => {
    const select = getSelectMock();
    render(<SortSelect select={select} />);
    const options = screen.getByTestId('offers-sort-select-options');
    select
      .getOptions()
      .forEach((o) =>
        expect(within(options).getByText(o.render())).toBeInTheDocument()
      );
  });

  test('should be clickable', () => {
    const select = getSelectMock();
    render(<SortSelect select={select} />);
    const element = screen.getByTestId('offers-sort-select');
    fireEvent.click(element);
    expect(vi.mocked(select.setOpen)).toBeCalledTimes(1);
  });

  test('should select option on click', () => {
    const select = getSelectMock({ open: true });
    render(<SortSelect select={select} />);
    const optionData = select
      .getOptions()
      .find((o) => o !== select.getSelectedOption());
    if (!optionData) {
      throw new Error('unselected option find error');
    }
    const option = screen.getByText(optionData.render());
    fireEvent.click(option);
    expect(select.setSelectedOption.mock.calls).toEqual([[optionData]]);
  });
});
