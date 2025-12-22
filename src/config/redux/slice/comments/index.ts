import { createSlice } from '@reduxjs/toolkit';
import SliceNames from '../../constants/slice-names';
import { getEmptyState } from './state';
import { offerCommentsThunk, postCommentThunk } from './action';
import {
  getEmptyQueryState,
  getFulfilledState,
  getPendingState,
  getRejectedState,
} from '../../thunk';
import { PostedComment } from '../../../../components/comment/types';

export const commentsSlice = createSlice({
  name: SliceNames.comments,
  initialState: getEmptyState(),
  reducers: {
    resetCommentPostQueryAction(s) {
      s.commentPost = getEmptyQueryState();
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(offerCommentsThunk.pending, (s, a) => {
        s.offerComments[a.meta.arg as string] = getPendingState();
      })
      .addCase(offerCommentsThunk.fulfilled, (s, a) => {
        s.offerComments[a.meta.arg as string] = getFulfilledState(a.payload);
      })
      .addCase(offerCommentsThunk.rejected, (s, a) => {
        s.offerComments[a.meta.arg as string] = getRejectedState(a.payload);
      })
      .addCase(postCommentThunk.pending, (s) => {
        s.commentPost = getPendingState();
      })
      .addCase(postCommentThunk.fulfilled, (s, a) => {
        const { offerId } = a.meta.arg as { offerId: string };
        s.commentPost = getFulfilledState(a.payload);
        const currentOfferComments = s.offerComments[offerId];
        if (currentOfferComments === undefined) {
          const state = getEmptyQueryState<PostedComment[]>();
          state.data = [a.payload];
          s.offerComments[offerId] = state;
        } else {
          currentOfferComments.data = currentOfferComments.data
            ? [...currentOfferComments.data, a.payload]
            : [a.payload];
        }
      })
      .addCase(postCommentThunk.rejected, (s, a) => {
        s.commentPost = getRejectedState(a.payload);
      }),
});
