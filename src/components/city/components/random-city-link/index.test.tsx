import { fireEvent, render, screen } from '@testing-library/react';
import { RandomCityLink } from '.';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { Provider } from 'react-redux';
import { getEmptyState } from '../../../../config/redux/slice/offers/state';
import { getFulfilledState } from '../../../../config/redux/thunk';
import { Route, Routes } from 'react-router-dom';
import RouterPaths from '../../../router/constants/router-paths';
import defaultCity from '../../constants/default-city';
import { getOffersMetaMocks } from '../../../offer/mocks/get-offers-meta-mocks';
import { CurrentLocation } from '../../../router/components/current-location';
import {
  MockPageRouter,
  MockRouter,
} from '../../../router/utils/test/components';

describe(RandomCityLink.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should pick default city if cities not present', () => {
    const store = mockStoreCreator({
      offers: { ...getEmptyState(), offers: getFulfilledState([]) },
    });
    render(
      <Provider store={store}>
        <MockPageRouter path="/" element={<RandomCityLink />} />
      </Provider>
    );
    expect(screen.getByText(defaultCity.name)).toBeInTheDocument();
  });

  test('should pick random city', () => {
    const offers = getOffersMetaMocks();
    const cities = Array.from(new Set(offers.map((o) => o.city.name)));
    const store = mockStoreCreator({
      offers: { ...getEmptyState(), offers: getFulfilledState(offers) },
    });
    render(
      <Provider store={store}>
        <MockPageRouter path="/" element={<RandomCityLink />} />
      </Provider>
    );
    const link = screen.getByTestId('random-city-link');
    expect(cities.includes(link.textContent ?? '')).toEqual(true);
  });

  test('should navigate to city page on click', () => {
    const offers = getOffersMetaMocks();
    const store = mockStoreCreator({
      offers: { ...getEmptyState(), offers: getFulfilledState(offers) },
    });
    render(
      <Provider store={store}>
        <MockRouter>
          <Routes>
            <Route path="/" element={<RandomCityLink />} />
            <Route
              path={RouterPaths.city({ city: ':city' })}
              element={<CurrentLocation />}
            />
          </Routes>
        </MockRouter>
      </Provider>
    );
    const link = screen.getByTestId('random-city-link');
    fireEvent.click(link);
    const currentLocation = screen.getByTestId(CurrentLocation.testId);
    expect(currentLocation.textContent).toEqual(`/${link.textContent}`);
  });
});
