import classNames from 'classnames';
import { CommentForm } from '../comment-form';
import { CommentsList } from '../comments-list';
import { useOfferCommentsQuery } from '../../hooks/use-offer-comments-query';
import { Loader } from '../../../ui/components/Loader';
import { ReactNode } from 'react';
import { useAuthStatus } from '../../../auth';

export function CommentsSection({
  offerID,
  className,
}: {
  offerID?: string;
  className?: string;
}) {
  const authStatus = useAuthStatus();
  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useOfferCommentsQuery(offerID);
  const Section = ({ children }: { children: ReactNode }) => (
    <section className={classNames('reviews', className)}>{children}</section>
  );

  if (isLoading) {
    return (
      <Section>
        <Loader />
      </Section>
    );
  }

  if (isError || comments === undefined) {
    return <Section>{error?.cause?.message ?? 'Comments get error'}</Section>;
  }

  return (
    <section
      className={classNames('reviews', className)}
      data-testid="comments-section"
    >
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <CommentsList comments={comments} />
      {authStatus && <CommentForm offerId={offerID} />}
    </section>
  );
}
