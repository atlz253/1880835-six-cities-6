import { PostedComment } from '../../types';

export function CommentsList({ comments }: { comments: PostedComment[] }) {
  return (
    <ul className="reviews__list">
      {comments.map((c) => (
        <li key={c.id} className="reviews__item">
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img
                className="reviews__avatar user__avatar"
                src={c.user.avatarUrl}
                width={54}
                height={54}
                alt="Reviews avatar"
              />
            </div>
            <span className="reviews__user-name">{c.user.name}</span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{ width: `${c.rating * 20}%` }} />
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">{c.comment}</p>
            <time
              className="reviews__time"
              dateTime={new Date(c.date).toLocaleDateString('en-CA')}
            >
              {new Date(c.date).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </div>
        </li>
      ))}
    </ul>
  );
}
