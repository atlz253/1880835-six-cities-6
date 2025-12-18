import { useMemo } from 'react';
import { OfferMeta } from '../../types';
import { Card } from '../card';
import { useFavoriteOffersQuery } from '../../hooks/use-favorite-offers-query';
import { Loader } from '../../../ui/components/Loader';
import { setErrorMessage } from '../../../error/features/setErrorMessage';
import { Navigate } from 'react-router-dom';
import ROUTES from '../../../router/constants/ROUTES';

export function Favorites() {
  const { data: offers, isLoading, isError, error } = useFavoriteOffersQuery();
  const citiesOffers = useMemo<Record<string, OfferMeta[]>>(() => {
    const result: Record<string, OfferMeta[]> = {};
    offers?.forEach((o) =>
      result[o.city.name]
        ? result[o.city.name].push(o)
        : (result[o.city.name] = [o])
    );
    return result;
  }, [offers]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    setErrorMessage(error?.cause?.message);
    return <Navigate to={ROUTES.error} />;
  }

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {Object.entries(citiesOffers).map(([city, cityOffers]) => (
          <li className="favorites__locations-items" key={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {cityOffers.map((offer) => (
                <Card
                  key={offer.id}
                  offer={offer}
                  imageURL={offer.previewImage}
                  variant="favorites"
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
