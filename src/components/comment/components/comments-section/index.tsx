import classNames from 'classnames';
import { CommentForm } from '../comment-form';
import { CommentsList } from '../comments-list';
import { Loader } from '../../../ui/components/loader';
import { ReactNode, useMemo } from 'react';
import { useAuthStatus } from '../../../auth';
import maxComments from './constants/max-comments';
import { useOfferCommentsQuery } from '../../hooks/use-offer-comments-query';

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
  const sortedComments = useMemo(
    () =>
      comments
        ?.slice()
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
    [comments]
  );
  const limitedAndSortedComments = useMemo(
    () => sortedComments?.slice(0, maxComments),
    [sortedComments]
  );

  if (isLoading) {
    return (
      <Section>
        <Loader />
      </Section>
    );
  }

  if (
    isError ||
    comments === undefined ||
    limitedAndSortedComments === undefined
  ) {
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
      <CommentsList comments={limitedAndSortedComments} />
      {authStatus && <CommentForm offerId={offerID} />}
    </section>
  );
}
