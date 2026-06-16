import { Auth } from '../components/auth/types';
import { getAuthMock } from '../components/auth/mock/get-auth-mock';
import { PostedComment } from '../components/comment/types';
import { getPostedCommentsMock } from '../components/comment/mocks/get-posted-comments-mock';
import { OfferDetails, OfferMeta } from '../components/offer/types';
import { getOfferDetailsMock } from '../components/offer/mocks/get-offer-details-mock';
import { getOffersMetaMocks } from '../components/offer/mocks/get-offers-meta-mocks';

interface MockState {
  auth: Auth;
  commentsByOfferId: Record<string, PostedComment[]>;
  offers: OfferMeta[];
  offerDetailsById: Record<string, OfferDetails>;
}

function createOfferDetails(offer: OfferMeta): OfferDetails {
  const detailsMock = getOfferDetailsMock();

  return {
    ...detailsMock,
    ...offer,
    description: `${offer.title} is a comfortable place for a demo stay.`,
    host: detailsMock.host,
    images: detailsMock.images,
    goods: detailsMock.goods,
    bedrooms: detailsMock.bedrooms,
    maxAdults: detailsMock.maxAdults,
  };
}

function createInitialState(): MockState {
  const offers = getOffersMetaMocks();

  return {
    auth: getAuthMock(),
    commentsByOfferId: Object.fromEntries(
      offers.map((offer) => [offer.id, getPostedCommentsMock()])
    ),
    offers,
    offerDetailsById: Object.fromEntries(
      offers.map((offer) => [offer.id, createOfferDetails(offer)])
    ),
  };
}

export const mockState = createInitialState();

export function getOfferById(offerId: string) {
  return mockState.offers.find((offer) => offer.id === offerId);
}

export function updateOfferFavoriteState({
  offerId,
  isFavorite,
}: {
  offerId: string;
  isFavorite: boolean;
}) {
  const offer = getOfferById(offerId);
  const offerDetails = mockState.offerDetailsById[offerId];

  if (offer === undefined || offerDetails === undefined) {
    return undefined;
  }

  offer.isFavorite = isFavorite;
  offerDetails.isFavorite = isFavorite;

  return offer;
}
