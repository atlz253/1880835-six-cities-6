import { render } from '@testing-library/react';
import { Loader } from '.';

describe(Loader.name, () => {
  test('should render', () => {
    const result = render(<Loader />);
    expect(result.getByTestId('loader')).toBeInTheDocument();
  });
});
