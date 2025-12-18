import { render, screen } from '@testing-library/react';
import { Offer } from '.';
import { getEmptyState as getEmptyAuthState } from '../../config/redux/slice/auth/state';
import { getEmptyState as getEmptyCommentsState } from '../../config/redux/slice/comments/state';
import { getEmptyState as getEmptyOffersState } from '../../config/redux/slice/offers/state';
import { getFulfilledState } from '../../config/redux/thunk';
import { getMockStoreCreator } from '../../config/redux/utils/test';
import { getPostedCommentsMock } from '../../domain/comment/mocks/get-posted-comments-mock';
import { getOfferDetailsMock } from '../../domain/offer/mocks/get-offer-details-mock';
import { getOffersMetaMocks } from '../../domain/offer/mocks/get-offers-meta-mocks';
import ROUTES from '../../domain/router/constants/ROUTES';
import { Provider } from 'react-redux';
import { MockAppRouter } from '../../domain/router/utils/test/components';

describe(Offer.name, () => {
  const mockStoreCreator = getMockStoreCreator();

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
});
