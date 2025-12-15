import { MouseEvent, useMemo } from 'react';
import { capitalize } from '../../../../utils/string';
import { Offer } from '../../types';
import { Link } from 'react-router-dom';
import routes from '../../../router/constants/ROUTES';
import { Rating } from '../../../rating/components/rating';
import cardRatingClassNames from './constants/ratingClassNames';
import classNames from 'classnames';
import { useAuthStatus } from '../../../auth';
import { removeOfferWithIdFromFavorites } from '../../features/removeOfferWithIdFromFavorites';
import { addOfferWithIdToFavorites } from '../../features/addOfferWithIdToFavorites';
import { stopPropagation } from '../../../../utils/event';

type CardVariant = 'cities' | 'favorites';
function cardVariant(variant: CardVariant) {
  switch (variant) {
    case 'cities':
      return {
        article: 'cities__card',
        imageWrapper: 'cities__image-wrapper',
        cardInfo: '',
        image: {
          width: 260,
          height: 200,
        },
      };
    case 'favorites':
      return {
        article: 'favorites__card',
        imageWrapper: 'favorites__image-wrapper',
        cardInfo: 'favorites__card-info',
        image: {
          width: 150,
          height: 110,
        },
      };
    default:
      throw new Error(`Неизвестный тип карточки: ${variant as string}`);
  }
}

interface CardProps {
  offer: Offer;
  imageURL: string;
  variant?: CardVariant;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
}
export function Card({
  variant,
  imageURL,
  onClick,
  onMouseEnter,
  offer: { id, isFavorite, isPremium, price, rating, title, type },
}: CardProps) {
  const variantInfo = useMemo(
    () => cardVariant(variant ?? 'cities'),
    [variant]
  );
  const isAuth = useAuthStatus();

  return (
    <article
      className={classNames('place-card', variantInfo.article)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={classNames(
          variantInfo.imageWrapper,
          'place-card__image-wrapper'
        )}
      >
        <Link to={routes.offer({ id })}>
          <img
            className="place-card__image"
            src={imageURL}
            width={variantInfo.image.width}
            height={variantInfo.image.height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={classNames(variantInfo.cardInfo, 'place-card__info')}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {isAuth && (
            <button
              className={[
                'place-card__bookmark-button button',
                isFavorite ? 'place-card__bookmark-button--active' : null,
              ]
                .filter((e) => e !== null)
                .join(' ')}
              type="button"
              onClick={stopPropagation(() =>
                isFavorite
                  ? removeOfferWithIdFromFavorites(id)
                  : addOfferWithIdToFavorites(id)
              )}
              data-testid="favorite-button"
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">
                {isFavorite ? 'In bookmarks' : 'To bookmarks'}
              </span>
            </button>
          )}
        </div>
        <Rating rating={rating} classNames={cardRatingClassNames} />
        <h2 className="place-card__name">
          <Link to={routes.offer({ id })}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}
