import { memo, MouseEvent } from 'react';
import { Card } from '../../../../components/offer/components/card';
import { OfferMeta } from '../../types';

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
