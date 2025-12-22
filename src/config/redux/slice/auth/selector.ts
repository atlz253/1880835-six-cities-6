import { createSelector } from '@reduxjs/toolkit';
import { getEmptyQueryState } from '../../thunk';
import { AuthSliceState } from './state';
import { Auth } from '../../../../components/auth/types';

export const selectAuthState = (s: { auth: AuthSliceState }) => s.auth;

export const selectAuthStatus = (s: { auth: AuthSliceState }) =>
  selectAuthState(s).status;

export const selectAuthToken = (s: { auth: AuthSliceState }) =>
  selectAuthState(s).auth?.data?.token;

export const selectAuthQuery = createSelector(
  [selectAuthState],
  (authState) => authState.auth ?? getEmptyQueryState<Auth>()
);
