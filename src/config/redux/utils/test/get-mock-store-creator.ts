import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppDispatch, State } from '../..';
import { PayloadAction } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { getApi } from '../../../axios';

export function getMockStoreCreator() {
  return configureMockStore<State, PayloadAction<unknown, string>, AppDispatch>(
    [thunk.withExtraArgument({ api: getApi() })]
  );
}
