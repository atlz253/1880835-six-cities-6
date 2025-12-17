import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { Offer, OfferMeta } from '../types';
import { City } from '../../city/types';
import { SortSelect } from './sort-select';
import { useSortSelectOptions } from './sort-select/hooks/useSortSelectOptions';
import { comparatorBySortType } from '../helpers/comparatorBySortType';
import CardList from './card-list';

export default function CityOffers({
  city,
  offers,
  setCurrentOffer,
}: {
  city: City;
  offers: OfferMeta[];
  setCurrentOffer: Dispatch<SetStateAction<Offer | undefined>>;
}) {
  const { select, selectedOption } = useSortSelectOptions();
  const onCardMouseEntry = useCallback(
    ({ offer }: { offer: OfferMeta }) => setCurrentOffer(offer),
    [setCurrentOffer]
  );

  const comparator = useMemo(
    () => comparatorBySortType(selectedOption.value),
    [selectedOption]
  );
  const sortedOffers = useMemo(
    () => [...offers].sort(comparator),
    [comparator, offers]
  );

  if (sortedOffers.length === 0) {
    return (
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">
            We could not find any property available at the moment in Dusseldorf
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {sortedOffers.length} places to stay in {city.name}
      </b>
      <SortSelect select={select} />
      <div className="cities__places-list places__list tabs__content">
        <CardList offers={sortedOffers} onCardMouseEntry={onCardMouseEntry} />
      </div>
    </section>
  );
}
