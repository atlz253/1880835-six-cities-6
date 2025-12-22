import { ApiEndpoints, ValidationErrorResponse } from '../../../axios';
import { selectAuthState, selectAuthToken } from './selector';
import { resetStateAction } from '../../utils/resetState';
import { isAxiosError } from 'axios';
import ActionNames from './constants/action-names';
import {
  createAppAsyncThunk,
  getRejectValue,
  serializeError,
} from '../../thunk';
import HTTPStatuses from '../../../axios/constants/http-statuses';
import ErrorTypes from '../../thunk/constants/error-types';
import LocalStorage from './constants/local-storage';
import { AuthSliceState } from './state';
import { Auth, Credentials } from '../../../../components/auth/types';

export const signOutThunk = createAppAsyncThunk<void>(
  ActionNames.signOut,
  (_, { dispatch }) => {
    dispatch(resetStateAction());
    localStorage.clear();
  }
);

export const checkLoginThunk = createAppAsyncThunk<
  Auth | undefined,
  void,
  { auth: AuthSliceState }
>(
  ActionNames.loginCheck,
  async (_, { rejectWithValue, getState, dispatch, extra: { getApi } }) => {
    const token = selectAuthToken(getState());
    if (token === undefined) {
      return undefined;
    }
    try {
      return (await getApi().get<Auth>(ApiEndpoints.login)).data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response?.status === HTTPStatuses.unauthorized
      ) {
        dispatch(signOutThunk());
        return rejectWithValue({
          type: ErrorTypes.unauthorized,
          cause: serializeError(error),
        });
      } else {
        return rejectWithValue(getRejectValue(error));
      }
    }
  },
  {
    condition: (_, { getState }) => {
      const authState = selectAuthState(getState());
      return authState.auth !== undefined && !authState.auth?.isLoading;
    },
  }
);

export const loginThunk = createAppAsyncThunk<Auth, Credentials>(
  ActionNames.login,
  async (credentials, { rejectWithValue, dispatch, extra: { getApi } }) => {
    try {
      const data = (await getApi().post<Auth>(ApiEndpoints.login, credentials))
        .data;
      dispatch(resetStateAction());
      localStorage.setItem(LocalStorage.auth, JSON.stringify(data));
      localStorage.setItem(LocalStorage.token, JSON.stringify(data.token));
      return data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === HTTPStatuses.validationError
      ) {
        return rejectWithValue({
          type: ErrorTypes.validationFailed,
          cause: {
            message: (error.response.data as ValidationErrorResponse).details
              .map((d) => d.messages.join())
              .join('\n'),
          },
        });
      } else {
        return rejectWithValue(getRejectValue(error));
      }
    }
  }
);
