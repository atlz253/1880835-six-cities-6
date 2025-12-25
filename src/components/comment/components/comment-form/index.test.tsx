import { fireEvent, render, screen } from '@testing-library/react';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { Provider } from 'react-redux';
import { getEmptyState } from '../../../../config/redux/slice/comments/state';
import limits from '../../../../components/comment/components/comment-form/constants/limits';
import { CommentForm } from '.';
import { postComment } from '../../features/post-comment';

describe(CommentForm.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  beforeAll(() => {
    vi.mock('../../features/post-comment', () => ({
      postComment: vi.fn(),
    }));
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render', () => {
    const store = mockStoreCreator({ comments: getEmptyState() });
    render(
      <Provider store={store}>
        <CommentForm />
      </Provider>
    );
    expect(screen.getByText('Your review')).toBeInTheDocument();
  });

  test('submit button should be disabled if review empty', () => {
    const store = mockStoreCreator({ comments: getEmptyState() });
    const offerId = 'test-offer-id';
    render(
      <Provider store={store}>
        <CommentForm offerId={offerId} />
      </Provider>
    );
    const submitButton = screen.getByText('Submit');
    expect(submitButton.hasAttribute('disabled')).toEqual(true);
  });

  test(`submit button should be disabled if characters less than ${limits.commentMinCharacters}`, () => {
    const store = mockStoreCreator({ comments: getEmptyState() });
    const offerId = 'test-offer-id';
    const textareaValue = 'short comment';
    render(
      <Provider store={store}>
        <CommentForm offerId={offerId} />
      </Provider>
    );
    const submitButton = screen.getByText('Submit');
    const ratingRadio = screen.getByTestId('5-stars');
    const textarea = screen.getByTestId('comment-input');
    fireEvent.click(ratingRadio);
    fireEvent.change(textarea, {
      target: {
        value: textareaValue,
      },
    });
    expect(submitButton.hasAttribute('disabled')).toEqual(true);
  });

  test('submit button should be enabled if all fields valid', () => {
    const store = mockStoreCreator({ comments: getEmptyState() });
    const offerId = 'test-offer-id';
    const textareaValue =
      'cool test offer review with more than minimum characters';
    render(
      <Provider store={store}>
        <CommentForm offerId={offerId} />
      </Provider>
    );
    const submitButton = screen.getByText('Submit');
    const ratingRadio = screen.getByTestId('5-stars');
    const textarea = screen.getByTestId('comment-input');
    fireEvent.click(ratingRadio);
    fireEvent.change(textarea, {
      target: {
        value: textareaValue,
      },
    });
    expect(textareaValue.length >= limits.commentMinCharacters).toEqual(true);
    expect(submitButton.hasAttribute('disabled')).toEqual(false);
  });

  test('submit button should post comment', () => {
    const store = mockStoreCreator({ comments: getEmptyState() });
    const offerId = 'test-offer-id';
    const textareaValue = 'cool test offer review with more than 50 characters';
    render(
      <Provider store={store}>
        <CommentForm offerId={offerId} />
      </Provider>
    );
    const submitButton = screen.getByText('Submit');
    const ratingRadio = screen.getByTestId('5-stars');
    const textarea = screen.getByTestId('comment-input');
    fireEvent.click(ratingRadio);
    fireEvent.change(textarea, {
      target: {
        value: textareaValue,
      },
    });
    fireEvent.click(submitButton);
    expect(vi.mocked(postComment)).toBeCalledTimes(1);
  });
});
