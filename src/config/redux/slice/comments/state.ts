import { PostedComment } from '../../../../components/comment';
import { getEmptyQueryState, ThunkQuery } from '../../thunk';

export interface CommentsSliceState {
  offerComments: Record<string, ThunkQuery<PostedComment[]> | undefined>;
  commentPost: ThunkQuery<PostedComment>;
}

export function getEmptyState(): CommentsSliceState {
  return {
    offerComments: {},
    commentPost: getEmptyQueryState<PostedComment>(),
  };
}
