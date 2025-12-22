import { store } from '../../../config/redux';
import { postCommentThunk } from '../../../config/redux/slice/comments/action';
import { Comment } from '../types';

export function postComment(body: { offerId: string; comment: Comment }) {
  store.dispatch(postCommentThunk(body));
}
