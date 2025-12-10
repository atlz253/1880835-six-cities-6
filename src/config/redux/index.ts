import { configureStore } from '@reduxjs/toolkit';
import { getApi } from '../axios';
import { ExtraArgument } from './thunk/types';
import { OffersSliceState } from './slice/offers/state';
import { CitiesSliceState } from './slice/cities/state';
import { CommentsSliceState } from './slice/comments/state';
import { ErrorSliceState } from './slice/error/state';
import { AuthSliceState } from './slice/auth/state';
import { reducer } from './reducer';
import { addTokenInterceptor } from './utils/axios';

const api = getApi();

addTokenInterceptor(api);

const store = configureStore({
  reducer,
  middleware: (defaultMiddlewares) =>
    defaultMiddlewares({
      thunk: { extraArgument: { api } satisfies ExtraArgument },
    }),
});

interface State {
  auth: AuthSliceState;
  error: ErrorSliceState;
  offers: OffersSliceState;
  cities: CitiesSliceState;
  comments: CommentsSliceState;
}

type AppDispatch = typeof store.dispatch;

export { store };
export type { State, AppDispatch };
