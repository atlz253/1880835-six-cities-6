import { render, screen } from '@testing-library/react';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { Provider } from 'react-redux';
import { getEmptyState as getEmptyAuthState } from '../../../../config/redux/slice/auth/state';
import { getEmptyState as getEmptyCommentsState } from '../../../../config/redux/slice/comments/state';
import { getFulfilledState } from '../../../../config/redux/thunk';
import { getAuthorizedStateMock } from '../../../../config/redux/slice/auth/utils/test';
import maxComments from '../../../../components/comment/components/comments-section/constants/max-comments';
import { CommentsSection } from '.';
import { getPostedCommentsMock } from '../../mocks/get-posted-comments-mock';

describe(CommentsSection.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should render', () => {
    const offerId = 'offerId';
    const comments = getPostedCommentsMock();
    const store = mockStoreCreator({
      auth: getEmptyAuthState(),
      comments: {
        ...getEmptyCommentsState(),
        offerComments: { [offerId]: getFulfilledState(comments) },
      },
    });
    render(
      <Provider store={store}>
        <CommentsSection offerID={offerId} />
      </Provider>
    );
    expect(screen.getByTestId('comments-section')).toBeInTheDocument();
  });

  test('should render review form if authorized', () => {
    const offerId = 'offerId';
    const comments = getPostedCommentsMock();
    const store = mockStoreCreator({
      auth: getAuthorizedStateMock(),
      comments: {
        ...getEmptyCommentsState(),
        offerComments: { [offerId]: getFulfilledState(comments) },
      },
    });
    render(
      <Provider store={store}>
        <CommentsSection offerID={offerId} />
      </Provider>
    );
    expect(screen.getByTestId('comment-form')).toBeInTheDocument();
  });

  test(`should render only ${maxComments} comments`, () => {
    const offerId = 'offerId';
    const comments = getPostedCommentsMock();
    const store = mockStoreCreator({
      auth: getEmptyAuthState(),
      comments: {
        ...getEmptyCommentsState(),
        offerComments: { [offerId]: getFulfilledState(comments) },
      },
    });
    render(
      <Provider store={store}>
        <CommentsSection offerID={offerId} />
      </Provider>
    );
    expect(comments.length > maxComments).toEqual(true);
    comments
      .slice(0, maxComments)
      .forEach((c) => expect(screen.getByText(c.comment)).toBeInTheDocument());
  });
});
