import { useCitiesQuery } from '.';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { renderHook } from '@testing-library/react';
import { getProviderWrapperWithStore } from '../../../../hocs/redux/get-provider-wrapper-with-store';
import { extractActionTypes } from '../../../../config/redux/utils/action';
import { offersThunk } from '../../../../config/redux/slice/offers';
import { getApiMock } from '../../../../config/axios/utils/test';
import { ApiEndpoints } from '../../../../config/axios';
import HTTPStatuses from '../../../../config/axios/constants/http-statuses';
import { getEmptyState } from '../../../../config/redux/slice/offers/state';
import {
  getFulfilledState,
  getPendingState,
} from '../../../../config/redux/thunk';
import { DeepPartial } from '@reduxjs/toolkit';
import { State } from '../../../../config/redux';
import { selectUniqueCities } from '../../../../config/redux/slice/cities/selector';
import { getOffersMetaMocks } from '../../../offer/mocks/get-offers-meta-mocks';
import { City } from '../../types';

describe(useCitiesQuery.name, () => {
  const mockStoreCreator = getMockStoreCreator();
  const apiMock = getApiMock();

  test('should dispatch offers thunk', () => {
    const store = mockStoreCreator({ offers: getEmptyState() });
    const { result } = renderHook(() => useCitiesQuery(), {
      wrapper: getProviderWrapperWithStore(store),
    });
    const offers = getOffersMetaMocks();
    apiMock.onGet(ApiEndpoints.offers).replyOnce(HTTPStatuses.ok, offers);
    expect(extractActionTypes(store.getActions())).toEqual([
      offersThunk.pending.type,
    ]);
    expect(result.current).toEqual(getPendingState<City[]>());
  });

  test('should return cities query', () => {
    const offers = getOffersMetaMocks();
    const state = {
      offers: { ...getEmptyState(), offers: getFulfilledState(offers) },
    } satisfies DeepPartial<State>;
    const store = mockStoreCreator(state);
    const { result } = renderHook(() => useCitiesQuery(), {
      wrapper: getProviderWrapperWithStore(store),
    });
    expect(result.current).toEqual(
      getFulfilledState(selectUniqueCities(state))
    );
  });
});
