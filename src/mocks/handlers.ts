import { http, HttpResponse } from 'msw';
import ApiEndpoints from '../config/axios/constants/api-endpoints';
import { Auth } from '../components/auth/types';
import { Comment, PostedComment } from '../components/comment/types';
import { OfferDetails, OfferMeta } from '../components/offer/types';
import { ValidationErrorResponse } from '../config/axios/types';
import {
  getOfferById,
  mockState,
  updateOfferFavoriteState,
} from './state';

const API_BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';

function getApiUrl(endpoint: string) {
  return `${API_BASE_URL}/${endpoint}`;
}

function getOfferIdFromRequest(request: Request) {
  const match = /\/offers\/([^/]+)/.exec(new URL(request.url).pathname);

  return match?.[1];
}

function getCommentOfferIdFromRequest(request: Request) {
  const match = /\/comments\/([^/]+)/.exec(new URL(request.url).pathname);

  return match?.[1];
}

function getFavoriteStateFromRequest(request: Request) {
  const match = /\/favorite\/([^/]+)\/([01])/.exec(
    new URL(request.url).pathname
  );

  if (match === null) {
    return undefined;
  }

  return {
    offerId: match[1],
    isFavorite: match[2] === '1',
  };
}

function getValidationErrorResponse(message: string): ValidationErrorResponse {
  return {
    errorType: 'VALIDATION_ERROR',
    message,
    details: [
      {
        property: 'comment',
        value: '',
        messages: [message],
      },
    ],
  };
}

export const handlers = [
  http.get(getApiUrl(ApiEndpoints.login), () =>
    HttpResponse.json<Auth>(mockState.auth)
  ),

  http.post(getApiUrl(ApiEndpoints.login), () =>
    HttpResponse.json<Auth>(mockState.auth)
  ),

  http.get(getApiUrl(ApiEndpoints.offers), () =>
    HttpResponse.json<OfferMeta[]>(mockState.offers)
  ),

  http.get(getApiUrl(ApiEndpoints.offer(':offerId')), ({ request }) => {
    const offerId = getOfferIdFromRequest(request);
    const offer = offerId ? mockState.offerDetailsById[offerId] : undefined;

    if (offer === undefined) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json<OfferDetails>(offer);
  }),

  http.get(getApiUrl(ApiEndpoints.nearbyOffers(':offerId')), ({ request }) => {
    const offerId = getOfferIdFromRequest(request);
    const offer = offerId ? getOfferById(offerId) : undefined;

    if (offer === undefined) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json<OfferMeta[]>(
      mockState.offers
        .filter((nearbyOffer) => nearbyOffer.id !== offerId)
        .slice(0, 3)
    );
  }),

  http.get(getApiUrl(ApiEndpoints.favorite), () =>
    HttpResponse.json<OfferMeta[]>(
      mockState.offers.filter((offer) => offer.isFavorite)
    )
  ),

  http.post(
    getApiUrl(ApiEndpoints.offerFavoriteState({
      offerId: ':offerId',
      isFavorite: true,
    })),
    ({ request }) => {
      const favoriteState = getFavoriteStateFromRequest(request);
      const offer = favoriteState
        ? updateOfferFavoriteState(favoriteState)
        : undefined;

      if (offer === undefined) {
        return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json<OfferMeta>(offer);
    }
  ),

  http.post(
    getApiUrl(ApiEndpoints.offerFavoriteState({
      offerId: ':offerId',
      isFavorite: false,
    })),
    ({ request }) => {
      const favoriteState = getFavoriteStateFromRequest(request);
      const offer = favoriteState
        ? updateOfferFavoriteState(favoriteState)
        : undefined;

      if (offer === undefined) {
        return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json<OfferMeta>(offer);
    }
  ),

  http.get(getApiUrl(ApiEndpoints.comments(':offerId')), ({ request }) => {
    const offerId = getCommentOfferIdFromRequest(request);
    const comments = offerId ? mockState.commentsByOfferId[offerId] : undefined;

    if (comments === undefined) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json<PostedComment[]>(comments);
  }),

  http.post(getApiUrl(ApiEndpoints.comments(':offerId')), async ({
    request,
  }) => {
    const offerId = getCommentOfferIdFromRequest(request);
    const comments = offerId ? mockState.commentsByOfferId[offerId] : undefined;

    if (comments === undefined) {
      return new HttpResponse(null, { status: 404 });
    }

    const comment = (await request.json()) as Comment;

    if (comment.comment.length < 50 || comment.comment.length > 300) {
      return HttpResponse.json<ValidationErrorResponse>(
        getValidationErrorResponse('Comment must contain from 50 to 300 characters.'),
        { status: 400 }
      );
    }

    const postedComment = {
      ...comment,
      id: Date.now(),
      date: new Date().toISOString(),
      user: mockState.auth,
    };

    comments.unshift(postedComment);

    return HttpResponse.json<PostedComment>(postedComment);
  }),
];
