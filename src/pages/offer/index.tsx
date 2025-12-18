import { Navigate, useParams } from 'react-router-dom';
import { Header } from '../../domain/ui/components/header';
import routes from '../../domain/router/constants/ROUTES';
import classNames from 'classnames';
import { Rating } from '../../domain/rating/components/rating';
import offerRatingClassNames from '../../domain/offer/constants/offerRatingClassNames';
import { CommentsSection } from '../../domain/comment/components/comments-section';
import { Map } from '../../domain/map';
import { Loader } from '../../domain/ui/components/Loader';
import { useOfferQuery } from '../../domain/offer/hooks/use-offer-query';
import { useNearbyOffersQuery } from '../../domain/offer/hooks/use-nearby-offers-query';
import { setErrorMessage } from '../../domain/error/features/setErrorMessage';
import { useAuthCheck } from '../../domain/auth/hooks/use-auth-check';
import ERROR_TYPES from '../../config/redux/thunk/constants/ERROR_TYPES';
import CardList from '../../domain/offer/components/card-list';
import { useAuthStatus } from '../../domain/auth';
import { removeOfferWithIdFromFavorites } from '../../domain/offer/features/removeOfferWithIdFromFavorites';
import { addOfferWithIdToFavorites } from '../../domain/offer/features/addOfferWithIdToFavorites';

export function Offer() {
  useAuthCheck();
  const { id } = useParams<{ id: string }>();
  const { data: offer, isLoading, isError, error } = useOfferQuery(id);
  const { data: nearestOffers, isLoading: isNearestOffersLoading } =
    useNearbyOffersQuery({
      offerID: id,
      limit: 3,
    });
  const isAuth = useAuthStatus();

  if (isLoading || offer === undefined) {
    return <Loader />;
  }

  if (isError) {
    if (error?.type === ERROR_TYPES.notFound) {
      return <Navigate to={routes.notFound} />;
    } else {
      setErrorMessage(error?.cause?.message);
      return <Navigate to={routes.error} />;
    }
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((i) => (
                <div key={i} className="offer__image-wrapper">
                  <img className="offer__image" src={i} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                {isAuth && (
                  <button
                    className={classNames(
                      'offer__bookmark-button button',
                      offer.isFavorite ? 'offer__bookmark-button--active' : null
                    )}
                    type="button"
                    onClick={() =>
                      offer.isFavorite
                        ? removeOfferWithIdFromFavorites(offer.id)
                        : addOfferWithIdToFavorites(offer.id)}
                  >
                    <svg
                      className="offer__bookmark-icon"
                      width={31}
                      height={33}
                    >
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                )}
              </div>
              <Rating
                rating={offer.rating}
                classNames={offerRatingClassNames}
                showValue
              />
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((g) => (
                    <li key={g} className="offer__inside-item">
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={classNames(
                      'offer__avatar-wrapper user__avatar-wrapper',
                      offer.host.isPro && 'offer__avatar-wrapper--pro'
                    )}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <CommentsSection className="offer__reviews" offerID={offer.id} />
            </div>
          </div>
          <Map
            className="offer__map"
            position={offer.location}
            currentMarker={offer.location}
            markers={[
              offer.location,
              ...(nearestOffers ? nearestOffers.map((o) => o.location) : []),
            ]}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {isNearestOffersLoading ? (
                <Loader />
              ) : (
                <CardList
                  offers={nearestOffers}
                  onCardClick={() => window.scrollTo(0, 0)}
                />
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
