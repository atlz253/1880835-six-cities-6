import { fireEvent, render, screen } from '@testing-library/react';
import { Navbar } from '.';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { Provider } from 'react-redux';
import { getCitiesMockState } from '../../../../config/redux/slice/cities/utils/test';
import { MockRouter } from '../../../router/utils/test/components';
import { Route, Routes } from 'react-router-dom';
import ROUTES from '../../../router/constants/ROUTES';
import { getCitiesMock } from '../../mocks/get-cities-mocks';
import { CurrentLocation } from '../../../router/components/current-location';

describe(Navbar.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should render', () => {
    const store = mockStoreCreator({ ...getCitiesMockState() });
    render(
      <Provider store={store}>
        <MockRouter>
          <Routes>
            <Route
              path={ROUTES.cities}
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
              path={ROUTES.cities}
              element={<Navbar variant="locations" />}
            />
            <Route
              path={ROUTES.city({ city: ':city' })}
              element={<Navbar variant="locations" />}
            />
          </Routes>
        </MockRouter>
      </Provider>
    );
    const parisLink = screen.getByText(cities.Paris.name);
    fireEvent.click(parisLink);
    expect(screen.getByTestId(CurrentLocation.testId)).toHaveTextContent(
      ROUTES.city({ city: cities.Paris.name })
    );
  });
});
