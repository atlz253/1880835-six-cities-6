import { render } from '@testing-library/react';
import { Map } from '.';
import { useMap } from './hooks/use-map';
import { getPositionsMock } from './mocks/get-positions-mock';

vi.mock('./hooks/use-map', () => ({
  useMap: vi.fn(),
}));

describe('Map', () => {
  test('should render correctly', () => {
    const position = getPositionsMock()[0];
    const { container } = render(<Map position={position} />);
    const mapSection = container.querySelector('.map');
    expect(mapSection).toBeInTheDocument();
  });

  test('should call useMap with correct arguments', () => {
    const position = getPositionsMock()[0];
    render(<Map position={position} />);
    expect(vi.mocked(useMap)).toHaveBeenCalledWith(
      expect.objectContaining({
        position: position,
      })
    );
  });
});
