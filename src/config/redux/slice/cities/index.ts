import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SLICE_NAMES from '../../constants/SLICE_NAMES';
import { getEmptyState } from './state';
import { City } from '../../../../components/city/types';

export const citiesSlice = createSlice({
  name: SLICE_NAMES.cities,
  initialState: getEmptyState(),
  reducers: {
    setCurrentCity: (state, action: PayloadAction<City>) => {
      state.currentCity = action.payload;
    },
  },
});
