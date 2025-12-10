import { configureStore } from '@reduxjs/toolkit';
import { getApi } from '../axios';
import { ExtraArgument } from './thunk/types';
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

type State = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export { store };
export type { State, AppDispatch };
