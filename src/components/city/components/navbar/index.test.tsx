import { fireEvent, render, screen } from '@testing-library/react';
import { Navbar } from '.';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { Provider } from 'react-redux';
import { getCitiesMockState } from '../../../../config/redux/slice/cities/utils/test';
import { Route, Routes } from 'react-router-dom';
import RouterPaths from '../../../router/constants/router-paths';
import { getCitiesMock } from '../../mocks/get-cities-mocks';
import { CurrentLocation } from '../../../router/components/current-location';
import { MockRouter } from '../../../router/utils/test/components';

describe(Navbar.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should render', () => {
    const store = mockStoreCreator({ ...getCitiesMockState() });
    render(
      <Provider store={store}>
        <MockRouter>
          <Routes>
            <Route
              path={RouterPaths.cities}
              element={<Navbar variant="locations" />}
            />
          </Routes>
        </MockRouter>
      </Provider>
    );
    expect(screen.getByTestId('cities-navbar')).toBeInTheDocument();
  });

  test('links should navigate to other cities', () => {
    const store = mockStoreCreator({ ...getCitiesMockState() });
    const cities = getCitiesMock();
    render(
      <Provider store={store}>
        <MockRouter>
          <CurrentLocation />
          <Routes>
            <Route
              path={RouterPaths.cities}
              element={<Navbar variant="locations" />}
            />
            <Route
              path={RouterPaths.city({ city: ':city' })}
              element={<Navbar variant="locations" />}
            />
          </Routes>
        </MockRouter>
      </Provider>
    );
    const parisLink = screen.getByText(cities.Paris.name);
    fireEvent.click(parisLink);
    expect(screen.getByTestId(CurrentLocation.testId)).toHaveTextContent(
      RouterPaths.city({ city: cities.Paris.name })
    );
  });
});
