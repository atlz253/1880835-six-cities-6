import { render, screen } from '@testing-library/react';
import { CommentsList } from '.';
import { getPostedCommentsMock } from '../../mocks/get-posted-comments-mock';

describe(CommentsList.name, () => {
  test('should render comments', () => {
    const comments = getPostedCommentsMock();
    render(<CommentsList comments={comments} />);
    expect(screen.getByText(comments[0].comment)).toBeInTheDocument();
  });
});
