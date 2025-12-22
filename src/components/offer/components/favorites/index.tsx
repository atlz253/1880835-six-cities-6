import { useMemo } from 'react';
import { setErrorMessage } from '../../../error/features/set-error-message';
import { Navigate } from 'react-router-dom';
import classNames from 'classnames';
import { Card } from '../../../../components/offer/components/card';
import { OfferMeta } from '../..';
import RouterPaths from '../../../router/constants/router-paths';
import { Loader } from '../../../ui/components/loader';
import { useFavoriteOffersQuery } from '../../hooks/use-favorite-offers-query';

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
  const isFavoritesEmpty = offers === undefined || offers.length === 0;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    setErrorMessage(error?.cause?.message);
    return <Navigate to={RouterPaths.error} />;
  }

  return (
    <section
      className={classNames(
        'favorites',
        isFavoritesEmpty && 'favorites--empty'
      )}
    >
      {isFavoritesEmpty ? (
        <>
          <h1 className="visually-hidden">Favorites (empty)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">
              Save properties to narrow down search or plan your future trips.
            </p>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </section>
  );
}
