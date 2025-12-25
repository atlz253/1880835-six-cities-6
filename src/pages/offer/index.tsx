import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/ui/components/header';
import routes from '../../components/router/constants/router-paths';
import classNames from 'classnames';
import { Rating } from '../../components/rating/components/rating';
import OfferRatingClassNames from '../../components/offer/constants/offer-rating-class-names';
import { CommentsSection } from '../../components/comment/components/comments-section';
import { Map } from '../../components/map';
import { Loader } from '../../components/ui/components/loader';
import { setErrorMessage } from '../../components/error/features/set-error-message';
import ErrorTypes from '../../config/redux/thunk/constants/error-types';
import { useAuthStatus } from '../../components/auth';
import { removeOfferWithIdFromFavorites } from '../../components/offer/features/remove-offer-with-id-from-favorites';
import { addOfferWithIdToFavorites } from '../../components/offer/features/add-offer-with-id-to-favorites';
import RouterPaths from '../../components/router/constants/router-paths';
import { useAuthCheck } from '../../components/auth/hooks/use-auth-check';
import CardList from '../../components/offer/components/card-list';
import { useNearbyOffersQuery } from '../../components/offer/hooks/use-nearby-offers-query';
import { useOfferQuery } from '../../components/offer/hooks/use-offer-query';

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
  const navigate = useNavigate();
  const handleFavoriteButtonClick = () => {
    if (offer === undefined) {
      navigate(RouterPaths.error);
    } else if (!isAuth) {
      navigate(RouterPaths.login);
    } else if (offer.isFavorite) {
      removeOfferWithIdFromFavorites(offer.id);
    } else {
      addOfferWithIdToFavorites(offer.id);
    }
  };

  const handleCardClick = () => window.scrollTo(0, 0);

  if (isLoading || offer === undefined) {
    return <Loader />;
  }

  if (isError) {
    if (error?.type === ErrorTypes.notFound) {
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
                <button
                  className={classNames(
                    'offer__bookmark-button button',
                    offer.isFavorite ? 'offer__bookmark-button--active' : null
                  )}
                  type="button"
                  onClick={handleFavoriteButtonClick}
                  data-testid="favorites-button"
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <Rating
                rating={offer.rating}
                classNames={OfferRatingClassNames}
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
                  onCardClick={handleCardClick}
                />
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
