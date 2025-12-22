import { ChangeEventHandler, Fragment } from 'react';
import ratingTitles from '../../constants/ratingTitles';

export function RatingInput({
  rating,
  onChange,
}: {
  rating?: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="reviews__rating-form form__rating">
      {([5, 4, 3, 2, 1] as const).map((n) => (
        <Fragment key={n}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            defaultValue={n}
            id={`${n}-stars`}
            type="radio"
            checked={n === rating}
            onChange={onChange}
            data-testid={`${n}-stars`}
          />
          <label
            htmlFor={`${n}-stars`}
            className="reviews__rating-label form__rating-label"
            title={ratingTitles[n]}
          >
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>
        </Fragment>
      ))}
    </div>
  );
}
