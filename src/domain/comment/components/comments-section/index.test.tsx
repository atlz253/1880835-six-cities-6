import { render, screen } from '@testing-library/react';
import { CommentsSection } from '.';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { Provider } from 'react-redux';
import { getEmptyState as getEmptyAuthState } from '../../../../config/redux/slice/auth/state';
import { getEmptyState as getEmptyCommentsState } from '../../../../config/redux/slice/comments/state';
import { getPostedCommentsMock } from '../../mocks/get-posted-comments-mock';
import { getFulfilledState } from '../../../../config/redux/thunk';
import { getAuthorizedStateMock } from '../../../../config/redux/slice/auth/utils/test';

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
    comments.forEach((c) =>
      expect(screen.getByText(c.comment)).toBeInTheDocument()
    );
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
});
