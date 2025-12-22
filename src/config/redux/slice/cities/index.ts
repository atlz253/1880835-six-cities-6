import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SliceNames from '../../constants/slice-names';
import { getEmptyState } from './state';
import { City } from '../../../../components/city/types';

export const citiesSlice = createSlice({
  name: SliceNames.cities,
  initialState: getEmptyState(),
  reducers: {
    setCurrentCity: (state, action: PayloadAction<City>) => {
      state.currentCity = action.payload;
    },
  },
});
