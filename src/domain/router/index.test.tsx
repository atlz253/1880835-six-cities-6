import { render, screen } from '@testing-library/react';
import ROUTES from './constants/ROUTES';
import { MockAppRouter } from './utils/test/components';
import { getOffersMetaMocks } from '../offer/mocks/get-offers-meta-mocks';
import { getMockStoreCreator } from '../../config/redux/utils/test';
import { Provider } from 'react-redux';
import { getEmptyState as getEmptyAuthState } from '../../config/redux/slice/auth/state';
import { getEmptyState as getEmptyCitiesState } from '../../config/redux/slice/cities/state';
import { getEmptyState as getEmptyOffersState } from '../../config/redux/slice/offers/state';
import { getEmptyState as getEmptyCommentsState } from '../../config/redux/slice/comments/state';
import { getEmptyState as getEmptyErrorState } from '../../config/redux/slice/error/state';
import { getFulfilledState } from '../../config/redux/thunk';
import { getOfferDetailsMock } from '../offer/mocks/get-offer-details-mock';
import { getPostedCommentsMock } from '../comment/mocks/get-posted-comments-mock';
import { getAuthMock } from '../auth/mock/get-auth-mock';

describe('routing', () => {
  const mockStoreCreator = getMockStoreCreator();

  test(`should render login page on ${ROUTES.login}`, () => {
    const store = mockStoreCreator({ auth: getEmptyAuthState() });
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[ROUTES.login]} />
      </Provider>
    );
    expect(screen.getAllByText('Sign in')[0]).toBeInTheDocument();
  });

  test(`should render main page on ${ROUTES.cities}`, async () => {
    const offers = getOffersMetaMocks();
    const store = mockStoreCreator({
      auth: getEmptyAuthState(),
      cities: getEmptyCitiesState(),
      offers: { offers: getFulfilledState(offers) },
    });
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[ROUTES.cities]} />
      </Provider>
    );
    expect((await screen.findAllByText('Cities'))[0]).toBeInTheDocument();
  });

  test(`should render offer page on ${ROUTES.offer({
    id: ':id',
  })}`, async () => {
    const offer = getOfferDetailsMock();
    const nearbyOffers = getOffersMetaMocks();
    const offerComments = getPostedCommentsMock();
    const store = mockStoreCreator({
      auth: getEmptyAuthState(),
      offers: {
        ...getEmptyOffersState(),
        offer: { test: getFulfilledState(offer) },
        nearbyOffers: { test: getFulfilledState(nearbyOffers) },
      },
      comments: {
        ...getEmptyCommentsState(),
        offerComments: { test: getFulfilledState(offerComments) },
      },
    });
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[ROUTES.offer({ id: 'test' })]} />
      </Provider>
    );
    expect(await screen.findByText('Meet the host')).toBeInTheDocument();
  });

  test(`should render favorites page on ${ROUTES.favorites}`, async () => {
    const auth = getAuthMock();
    const offers = getOffersMetaMocks();
    const store = mockStoreCreator({
      auth: { status: true, auth: getFulfilledState(auth) },
      offers: { ...getEmptyOffersState(), offers: getFulfilledState(offers) },
    });
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[ROUTES.favorites]} />
      </Provider>
    );
    expect(await screen.findByTestId('favorites-page')).toBeInTheDocument();
  });

  test(`should render 404 page on ${ROUTES.notFound}`, () => {
    const store = mockStoreCreator();
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[ROUTES.notFound]} />
      </Provider>
    );
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });

  test(`should render error page on ${ROUTES.error}`, () => {
    const store = mockStoreCreator({ error: getEmptyErrorState() });
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[ROUTES.error]} />
      </Provider>
    );
    expect(screen.getByText('App error :(')).toBeInTheDocument();
  });
});
