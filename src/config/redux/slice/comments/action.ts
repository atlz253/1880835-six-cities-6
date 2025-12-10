import { Comment, PostedComment } from '../../../../domain/comment';
import {
  createAppAsyncThunk,
  getErrorTypeByHTTPStatus,
  getRejectValue,
  serializeError,
} from '../../thunk';
import { ENDPOINTS, ValidationErrorResponse } from '../../../axios';
import ACTION_NAMES from './constants/ACTION_NAMES';
import { AxiosError } from 'axios';
import HTTP_STATUS from '../../../axios/constants/HTTP_STATUS';
import ERROR_TYPES from '../../thunk/constants/ERROR_TYPES';
import { CommentsSliceState } from './state';

export const offerCommentsThunk = createAppAsyncThunk<
  PostedComment[],
  string | undefined,
  { comments: CommentsSliceState }
>(
  ACTION_NAMES.offerComments,
  async (offerID: string | undefined, { rejectWithValue, extra: { api } }) => {
    try {
      return (
        await api.get<PostedComment[]>(ENDPOINTS.comments(offerID as string))
      ).data;
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === HTTP_STATUS.notFound
      ) {
        return rejectWithValue({
          type: ERROR_TYPES.notFound,
          cause: { message: `Comments for offer with ID ${offerID} not found` },
        });
      } else {
        return rejectWithValue(getRejectValue(error));
      }
    }
  },
  {
    condition: (offerID: string | undefined, { getState }) => {
      if (offerID === undefined) {
        return false;
      }
      const { comments } = getState();
      const currentComments = comments.offerComments[offerID];
      return currentComments === undefined;
    },
  }
);

export const postCommentThunk = createAppAsyncThunk<
  PostedComment,
  { offerId: string; comment: Comment }
>(
  ACTION_NAMES.postComment,
  async ({ offerId, comment }, { rejectWithValue, extra: { api } }) => {
    try {
      return (
        await api.post<PostedComment>(ENDPOINTS.comments(offerId), comment)
      ).data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === HTTP_STATUS.validationError) {
          return rejectWithValue({
            type: ERROR_TYPES.validationFailed,
            cause: {
              message: (error.response.data as ValidationErrorResponse).details
                .map((d) => d.messages.join())
                .join('\n'),
            },
          });
        } else {
          return rejectWithValue({
            type: getErrorTypeByHTTPStatus(error.response.status),
            cause: serializeError(error),
          });
        }
      } else {
        return rejectWithValue(getRejectValue(error));
      }
    }
  }
);
