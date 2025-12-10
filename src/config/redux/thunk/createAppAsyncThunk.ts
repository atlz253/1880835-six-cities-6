import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from './types';

export function createAppAsyncThunk<Returned, ThunkArg = void, State = object>(
  ...args: Parameters<
    typeof createAsyncThunk<Returned, ThunkArg, ThunkConfig<State>>
  >
) {
  return createAsyncThunk<Returned, ThunkArg, ThunkConfig<State>>(...args);
}
