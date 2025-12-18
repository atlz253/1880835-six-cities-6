import { createSelector } from '@reduxjs/toolkit';
import { getEmptyQueryState } from '../../thunk';
import { Auth } from '../../../../domain/auth/types';
import { AuthSliceState } from './state';

export const selectAuthState = (s: { auth: AuthSliceState }) => s.auth;

export const selectAuthStatus = (s: { auth: AuthSliceState }) =>
  selectAuthState(s).status;

export const selectAuthToken = (s: { auth: AuthSliceState }) =>
  selectAuthState(s).auth?.data?.token;

export const selectAuthQuery = createSelector(
  [selectAuthState],
  (authState) => authState.auth ?? getEmptyQueryState<Auth>()
);
