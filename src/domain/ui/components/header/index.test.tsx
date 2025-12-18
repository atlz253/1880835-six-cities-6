import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from '.';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { Provider } from 'react-redux';
import {
  MockPageRouter,
  MockRouter,
} from '../../../router/utils/test/components';
import { Route, Routes } from 'react-router-dom';
import { CurrentLocation } from '../../../router/components/current-location';
import ROUTES from '../../../router/constants/ROUTES';
import { getEmptyState as getEmptyAuthState } from '../../../../config/redux/slice/auth/state';
import { getEmptyState as getEmptyOffersState } from '../../../../config/redux/slice/offers/state';
import { getAuthorizedStateMock } from '../../../../config/redux/slice/auth/utils/test';
import { getOffersMetaMocks } from '../../../offer/mocks/get-offers-meta-mocks';
import { getFulfilledState } from '../../../../config/redux/thunk';
import { signOut } from '../../../auth/features/signOut';

describe(Header.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  beforeAll(() => {
    vi.mock('../../../auth/features/signOut', () => ({ signOut: vi.fn() }));
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render', () => {
    const store = mockStoreCreator({
      auth: getEmptyAuthState(),
      offers: getEmptyOffersState(),
    });
    render(
      <Provider store={store}>
        <MockPageRouter path="/" element={<Header />} />
      </Provider>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  test('should navigate to login page on click', () => {
    const store = mockStoreCreator({
      auth: getEmptyAuthState(),
      offers: getEmptyOffersState(),
    });
    render(
      <Provider store={store}>
        <MockRouter>
          <Routes>
            <Route path={ROUTES.cities} element={<Header />} />
            <Route path={ROUTES.login} element={<CurrentLocation />} />
          </Routes>
        </MockRouter>
      </Provider>
    );
    const loginButton = screen.getByText('Sign in');
    fireEvent.click(loginButton);
    const currentLocation = screen.getByTestId(CurrentLocation.testId);
    expect(currentLocation.textContent).toEqual(ROUTES.login);
  });

  test('should display favorite offers count if authorized', () => {
    const offers = getOffersMetaMocks();
    const store = mockStoreCreator({
      auth: getAuthorizedStateMock(),
      offers: {
        ...getEmptyOffersState(),
        favoriteOffers: getFulfilledState(offers),
      },
    });
    render(
      <Provider store={store}>
        <MockPageRouter path="/" element={<Header />} />
      </Provider>
    );
    const favoriteCount = screen.getByTestId('favorite-count');
    expect(favoriteCount.textContent).toEqual(offers.length.toString());
  });

  test('sign out button should work', () => {
    const offers = getOffersMetaMocks();
    const store = mockStoreCreator({
      auth: getAuthorizedStateMock(),
      offers: {
        ...getEmptyOffersState(),
        favoriteOffers: getFulfilledState(offers),
      },
    });
    render(
      <Provider store={store}>
        <MockRouter>
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path={ROUTES.login} element={<CurrentLocation />} />
          </Routes>
        </MockRouter>
      </Provider>
    );
    const signOutButton = screen.getByText('Sign out');
    fireEvent.click(signOutButton);
    expect(signOut).toBeCalledTimes(1);
  });

  test('should navigate to favorites page on click', () => {
    const offers = getOffersMetaMocks();
    const store = mockStoreCreator({
      auth: getAuthorizedStateMock(),
      offers: {
        ...getEmptyOffersState(),
        favoriteOffers: getFulfilledState(offers),
      },
    });
    render(
      <Provider store={store}>
        <MockRouter>
          <Routes>
            <Route path={ROUTES.cities} element={<Header />} />
            <Route path={ROUTES.favorites} element={<CurrentLocation />} />
          </Routes>
        </MockRouter>
      </Provider>
    );
    const favoritesLink = screen.getByTestId('favorites-link');
    fireEvent.click(favoritesLink);
    const currentLocation = screen.getByTestId(CurrentLocation.testId);
    expect(currentLocation.textContent).toEqual(ROUTES.favorites);
  });
});
