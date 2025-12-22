import { useAuthCheck } from '.';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { renderHook } from '@testing-library/react';
import { extractActionTypes } from '../../../../config/redux/utils/action';
import { checkLoginThunk } from '../../../../config/redux/slice/auth/action';
import { getApiMock } from '../../../../config/axios/utils/test';
import { ApiEndpoints } from '../../../../config/axios';
import HTTPStatuses from '../../../../config/axios/constants/http-statuses';
import { getFulfilledState } from '../../../../config/redux/thunk';
import { getProviderWrapperWithStore } from '../../../../hocs/redux/get-provider-wrapper-with-store';
import { getAuthMock } from '../../mock/get-auth-mock';

describe(useAuthCheck.name, () => {
  const mockStoreCreator = getMockStoreCreator();
  const apiMock = getApiMock();

  test('should dispatch check login thunk', () => {
    const auth = getAuthMock();
    const store = mockStoreCreator({
      auth: { status: true, auth: getFulfilledState(auth) },
    });
    apiMock.onGet(ApiEndpoints.login).replyOnce(HTTPStatuses.ok, auth);
    renderHook(() => useAuthCheck(), {
      wrapper: getProviderWrapperWithStore(store),
    });
    expect(extractActionTypes(store.getActions())).toEqual([
      checkLoginThunk.pending.type,
    ]);
  });
});
