import { render, screen } from '@testing-library/react';
import { Rating } from '.';

describe(Rating.name, () => {
  test('should render', () => {
    render(<Rating rating={3} />);
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });
});
