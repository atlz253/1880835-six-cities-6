import {
  createAppAsyncThunk,
  getErrorTypeByHTTPStatus,
  getRejectValue,
  serializeError,
} from '../../thunk';
import { ApiEndpoints, ValidationErrorResponse } from '../../../axios';
import ActionNames from './constants/action-names';
import { AxiosError } from 'axios';
import HTTPStatuses from '../../../axios/constants/http-statuses';
import ErrorTypes from '../../thunk/constants/error-types';
import { CommentsSliceState } from './state';
import { PostedComment, Comment } from '../../../../components/comment/types';

export const offerCommentsThunk = createAppAsyncThunk<
  PostedComment[],
  string | undefined,
  { comments: CommentsSliceState }
>(
  ActionNames.offerComments,
  async (
    offerID: string | undefined,
    { rejectWithValue, extra: { getApi } }
  ) => {
    try {
      return (
        await getApi().get<PostedComment[]>(
          ApiEndpoints.comments(offerID as string)
        )
      ).data;
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === HTTPStatuses.notFound
      ) {
        return rejectWithValue({
          type: ErrorTypes.notFound,
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
  ActionNames.postComment,
  async ({ offerId, comment }, { rejectWithValue, extra: { getApi } }) => {
    try {
      return (
        await getApi().post<PostedComment>(
          ApiEndpoints.comments(offerId),
          comment
        )
      ).data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === HTTPStatuses.validationError) {
          return rejectWithValue({
            type: ErrorTypes.validationFailed,
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
