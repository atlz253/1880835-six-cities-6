import { store } from '../../../config/redux';
import { commentsSlice } from '../../../config/redux/slice/comments';

export function resetCommentPostQuery() {
  store.dispatch(commentsSlice.actions.resetCommentPostQueryAction());
}
