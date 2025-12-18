import { Offer } from '../../domain/offer/types';
import { Header } from '../../domain/ui/components/header';
import { Map } from '../../domain/map';
import { useMemo, useState } from 'react';
import { Navbar } from '../../domain/city/components/navbar';
import { useOffersQuery } from '../../domain/offer';
import { useCurrentCityFromParams } from '../../domain/city/hooks/use-current-city-from-params';
import { useCurrentCity } from '../../domain/city/hooks/use-current-city';
import { Loader } from '../../domain/ui/components/Loader';
import { Navigate } from 'react-router-dom';
import routes from '../../domain/router/constants/ROUTES';
import CityOffers from '../../domain/offer/components/city-offers';
import { setErrorMessage } from '../../domain/error/features/setErrorMessage';
import { useAuthCheck } from '../../domain/auth/hooks/use-auth-check';
import classNames from 'classnames';

export function Main() {
  useAuthCheck();
  useCurrentCityFromParams();
  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const { data: offers, isLoading, isError, error } = useOffersQuery();
  const currentCity = useCurrentCity();
  const currentCityOffers = useMemo(
    () =>
      currentCity && offers
        ? offers.filter((o) => o.city.name === currentCity.name)
        : [],
    [currentCity, offers]
  );
  const isOffersEmpty = currentCityOffers.length === 0;
  const markers = useMemo(
    () =>
      currentCity
        ? currentCityOffers
            .filter((o) => o.city.name === currentCity.name)
            .map((o) => o.location)
        : [],
    [currentCity, currentCityOffers]
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    setErrorMessage(error?.cause?.message);
    return <Navigate to={routes.error} />;
  }

  return (
    <div
      className={classNames(
        'page page--gray page--main',
        isOffersEmpty && 'page__main--index-empty'
      )}
    >
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <Navbar variant="locations" />
          </section>
        </div>
        <div className="cities">
          <div
            className={classNames(
              'cities__places-container',
              isOffersEmpty && 'cities__places-container--empty',
              'container'
            )}
          >
            {isOffersEmpty ? (
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                    We could not find any property available at the moment in
                    {currentCity.name}
                  </p>
                </div>
              </section>
            ) : (
              <CityOffers
                city={currentCity}
                offers={currentCityOffers}
                setCurrentOffer={setCurrentOffer}
              />
            )}
            <div className="cities__right-section">
              {!isOffersEmpty && (
                <Map
                  className="cities__map"
                  position={currentCity.location}
                  markers={markers}
                  currentMarker={currentOffer?.location}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
