import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SliceNames from '../../constants/slice-names';
import { getEmptyState } from './state';

export const errorSlice = createSlice({
  name: SliceNames.error,
  initialState: getEmptyState(),
  reducers: {
    setMessage(state, action: PayloadAction<string | undefined>) {
      state.message = action.payload;
    },
  },
});
