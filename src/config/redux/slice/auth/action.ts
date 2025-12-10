import { Auth, Credentials } from '../../../../domain/auth/types';
import { ENDPOINTS, ValidationErrorResponse } from '../../../axios';
import { selectAuthState, selectAuthToken } from './selector';
import { resetStateAction } from '../../utils/resetState';
import { isAxiosError } from 'axios';
import ACTION_NAMES from './constants/ACTION_NAMES';
import {
  createAppAsyncThunk,
  getRejectValue,
  serializeError,
} from '../../thunk';
import HTTP_STATUS from '../../../axios/constants/HTTP_STATUS';
import ERROR_TYPES from '../../thunk/constants/ERROR_TYPES';
import LOCAL_STORAGE from './constants/local-storage';
import { AuthSliceState } from './state';

export const signOutThunk = createAppAsyncThunk<void>(
  ACTION_NAMES.signOut,
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
  ACTION_NAMES.loginCheck,
  async (_, { rejectWithValue, getState, dispatch, extra: { api } }) => {
    const token = selectAuthToken(getState());
    if (token === undefined) {
      return undefined;
    }
    try {
      return (await api.get<Auth>(ENDPOINTS.login)).data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response?.status === HTTP_STATUS.unauthorized
      ) {
        dispatch(signOutThunk());
        return rejectWithValue({
          type: ERROR_TYPES.unauthorized,
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
  ACTION_NAMES.login,
  async (credentials, { rejectWithValue, dispatch, extra: { api } }) => {
    try {
      const data = (await api.post<Auth>(ENDPOINTS.login, credentials)).data;
      dispatch(resetStateAction());
      localStorage.setItem(LOCAL_STORAGE.auth, JSON.stringify(data));
      return data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === HTTP_STATUS.validationError
      ) {
        return rejectWithValue({
          type: ERROR_TYPES.validationFailed,
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
