const ApiEndpoints = {
  login: 'login',
  offers: 'offers',
  favorite: 'favorite',
  offer: (id: string) => `${ApiEndpoints.offers}/${id}`,
  nearbyOffers: (id: string) => `${ApiEndpoints.offer(id)}/nearby`,
  comments: (id: string) => `comments/${id}`,
  offerFavoriteState: ({
    offerId,
    isFavorite,
  }: {
    offerId: string;
    isFavorite: boolean;
  }) => `${ApiEndpoints.favorite}/${offerId}/${isFavorite ? 1 : 0}`,
} as const;

export default ApiEndpoints;
