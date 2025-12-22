import { OfferDetails, OfferMeta } from '../../../../components/offer';
import { ThunkQuery } from '../../thunk/types';

interface OffersSliceState {
  offers?: ThunkQuery<OfferMeta[]>;
  offer: Record<string, ThunkQuery<OfferDetails> | undefined>;
  nearbyOffers: Record<string, ThunkQuery<OfferMeta[]> | undefined>;
  favoriteOffers?: ThunkQuery<OfferMeta[]>;
  favoriteOfferChangeState: Record<string, ThunkQuery<OfferMeta> | undefined>;
}

const getEmptyState = (): OffersSliceState => ({
  offer: {},
  nearbyOffers: {},
  favoriteOfferChangeState: {},
});

export { getEmptyState };
export type { OffersSliceState };
