import { render } from '@testing-library/react';
import { RatingInput } from '.';

describe(RatingInput.name, () => {
  test('should render', () => {
    const result = render(<RatingInput onChange={() => {}} />);
    [5, 4, 3, 2, 1].forEach((r) =>
      expect(result.getByTestId(`${r}-stars`)).toBeInTheDocument()
    );
  });
});
