import { useState } from 'react';
import { createOnChangeHandler } from '../../../../utils/react/form/create-on-change-handler';
import { preventDefault } from '../../../../utils/event';
import {
  isNotFoundError,
  isUnauthorizedError,
  isValidationError,
} from '../../../../config/redux/thunk';
import { Navigate } from 'react-router-dom';
import limits from '../../../../components/comment/components/comment-form/constants/limits';
import RouterPaths from '../../../router/constants/router-paths';
import { postComment } from '../../features/post-comment';
import { resetCommentPostQuery } from '../../features/reset-comment-post-query';
import { Comment } from '../../types';
import { useCommentPostQuery } from '../../hooks/use-comment-post-query';
import { RatingInput } from '../../../rating/components/rating-input';

const getEmptyCommentState = (): Partial<Comment> => ({ comment: '' });

export function CommentForm({ offerId }: { offerId?: string }) {
  const [comment, setComment] = useState<Partial<Comment>>(
    getEmptyCommentState()
  );
  const { isLoading, isError, error } = useCommentPostQuery();

  const handleInputChange = createOnChangeHandler((builder) =>
    builder
      .addCase('review', (value) => setComment({ ...comment, comment: value }))
      .addCase('rating', (value) =>
        setComment({
          ...comment,
          rating: parseInt(value, 10),
        })
      )
  );

  const handleFormSubmit = preventDefault(() => {
    if ([offerId, comment.comment, comment.rating].includes(undefined)) {
      throw new Error('Invalid form state');
    } else {
      postComment({
        offerId: offerId as string,
        comment: comment as Comment,
      });
      setComment(getEmptyCommentState());
    }
  });

  if (isError) {
    if (isValidationError(error)) {
      // eslint-disable-next-line no-alert
      alert(`Validation error: ${error?.cause?.message}`);
      resetCommentPostQuery();
    } else if (isUnauthorizedError(error)) {
      return <Navigate to={RouterPaths.login} />;
    } else if (isNotFoundError(error)) {
      return <Navigate to={RouterPaths.notFound} />;
    }
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      data-testid="comment-form"
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <RatingInput rating={comment.rating} onChange={handleInputChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment.comment}
        onChange={handleInputChange}
        data-testid="comment-input"
        maxLength={limits.commentMaxCharacters}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          onClick={handleFormSubmit}
          disabled={
            offerId === undefined ||
            comment.comment === undefined ||
            comment.comment.length < limits.commentMinCharacters ||
            comment.rating === undefined ||
            isLoading
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
}
