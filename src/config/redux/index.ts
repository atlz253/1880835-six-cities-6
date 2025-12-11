import { configureStore } from '@reduxjs/toolkit';
import { getApi } from '../axios';
import { ExtraArgument } from './thunk/types';
import { reducer } from './reducer';
import { configureTokenInterceptor } from './utils/axios';

const store = configureStore({
  reducer,
  middleware: (defaultMiddlewares) =>
    defaultMiddlewares({
      thunk: {
        extraArgument: {
          getApi,
        } satisfies ExtraArgument,
      },
    }),
});

configureTokenInterceptor(store);

type State = ReturnType<typeof store.getState>;

type AppStore = typeof store;
type AppDispatch = typeof store.dispatch;

export { store };
export type { State, AppStore, AppDispatch };
