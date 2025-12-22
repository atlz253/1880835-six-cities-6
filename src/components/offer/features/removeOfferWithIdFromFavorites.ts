import { store } from '../../../config/redux';
import { removeOfferFromFavoritesThunk } from '../../../config/redux/slice/offers';

export function removeOfferWithIdFromFavorites(offerId: string) {
  store.dispatch(removeOfferFromFavoritesThunk(offerId));
}
