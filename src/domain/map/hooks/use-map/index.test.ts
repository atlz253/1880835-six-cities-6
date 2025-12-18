import { renderHook } from '@testing-library/react';
import { useMap } from '.';
import { getMutableRefMock } from '../../../../utils/react/test';
import { getPositionsMock } from '../../mocks/get-positions-mock';
import { LatLng, map, marker } from 'leaflet';
import { Mock } from 'vitest';

describe(useMap.name, () => {
  const mockedMap = map as unknown as Mock;
  const mockedMarker = marker as unknown as Mock;

  beforeAll(() => {
    vi.mock('leaflet', async () => {
      const actual = await vi.importActual<object>('leaflet');
      return {
        ...actual,
        map: vi.fn(() => ({
          setView: vi.fn(() => ({
            getCenter: vi.fn(() => new LatLng(0, 0)),
            panTo: vi.fn(),
            setZoom: vi.fn(),
          })),
        })),
        tileLayer: vi.fn(() => ({
          addTo: vi.fn(),
        })),
        marker: vi.fn(),
      };
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should init map', () => {
    const container = document.createElement('div');
    const containerRef = getMutableRefMock(container);
    const position = getPositionsMock()[0];
    renderHook(() => useMap({ position, containerRef }));
    expect(mockedMap).toHaveBeenCalled();
  });

  test('should init markers', () => {
    const container = document.createElement('div');
    const containerRef = getMutableRefMock(container);
    const positions = getPositionsMock();
    renderHook(() =>
      useMap({ position: positions[0], containerRef, markers: positions })
    );
    expect(mockedMarker).toBeCalledTimes(positions.length);
  });
});
