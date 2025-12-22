import { store } from '../../../config/redux';
import { addOfferToFavoritesThunk } from '../../../config/redux/slice/offers';

export function addOfferWithIdToFavorites(offerId: string) {
  store.dispatch(addOfferToFavoritesThunk(offerId));
}
