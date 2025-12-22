import cs from 'classnames';

export function Rating({
  rating,
  showValue = false,
  classNames = {},
}: {
  rating: number;
  showValue?: boolean;
  classNames?: Partial<{
    rating: string;
    stars: string;
    value: string;
  }>;
}) {
  return (
    <div className={cs(classNames.rating, 'rating')}>
      <div className={cs(classNames.stars, 'rating__stars')}>
        <span style={{ width: `${rating * 20}%` }} />
        <span className="visually-hidden">Rating</span>
      </div>
      {showValue && (
        <span className={cs(classNames.value, 'rating__value')}>{rating}</span>
      )}
    </div>
  );
}
