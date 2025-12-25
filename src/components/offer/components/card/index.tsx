import { MouseEvent, useMemo } from 'react';
import { capitalize } from '../../../../utils/string';
import { Link, useNavigate } from 'react-router-dom';
import CardRatingClassNames from './constants/rating-class-names';
import classNames from 'classnames';
import { useAuthStatus } from '../../../../components/auth';
import { stopPropagation } from '../../../../utils/event';
import { Offer } from '../..';
import { addOfferWithIdToFavorites } from '../../features/add-offer-with-id-to-favorites';
import { removeOfferWithIdFromFavorites } from '../../features/remove-offer-with-id-from-favorites';
import { Rating } from '../../../rating/components/rating';
import RouterPaths from '../../../router/constants/router-paths';

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
  const navigate = useNavigate();
  const handleFavoriteButtonClick = () => {
    if (!isAuth) {
      navigate(RouterPaths.login);
    } else if (isFavorite) {
      removeOfferWithIdFromFavorites(id);
    } else {
      addOfferWithIdToFavorites(id);
    }
  };
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
        <Link to={RouterPaths.offer({ id })}>
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
          <button
            className={[
              'place-card__bookmark-button button',
              isFavorite ? 'place-card__bookmark-button--active' : null,
            ]
              .filter((e) => e !== null)
              .join(' ')}
            type="button"
            onClick={stopPropagation(handleFavoriteButtonClick)}
            data-testid="favorite-button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <Rating rating={rating} classNames={CardRatingClassNames} />
        <h2 className="place-card__name">
          <Link to={RouterPaths.offer({ id })}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}
