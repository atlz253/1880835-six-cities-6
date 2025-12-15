import { memo, MouseEvent } from 'react';
import { OfferMeta } from '../../types';
import { Card } from '../Card';

const CardList = memo(
  ({
    offers,
    onCardClick,
    onCardMouseEntry,
  }: {
    offers: OfferMeta[];
    onCardClick?: (props: {
      offer: OfferMeta;
      event: MouseEvent<HTMLElement>;
    }) => void;
    onCardMouseEntry?: (props: {
      offer: OfferMeta;
      event: MouseEvent<HTMLElement>;
    }) => void;
  }) => (
    <>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          imageURL={offer.previewImage}
          onClick={
            onCardClick ? (event) => onCardClick({ event, offer }) : undefined
          }
          onMouseEnter={
            onCardMouseEntry
              ? (event) => onCardMouseEntry({ event, offer })
              : undefined
          }
        />
      ))}
    </>
  )
);

CardList.displayName = 'CardList';

export default CardList;
