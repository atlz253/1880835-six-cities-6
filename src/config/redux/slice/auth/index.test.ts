import { getAuthMock } from '../../../../components/auth/mock/get-auth-mock';
import { getCredentialsMock } from '../../../../components/auth/mock/get-credentials-mock';
import { ApiEndpoints } from '../../../axios';
import HTTPStatuses from '../../../axios/constants/http-statuses';
import { getApiMock } from '../../../axios/utils/test';
import { getFulfilledState } from '../../thunk';
import { extractActionTypes } from '../../utils/action';
import { resetStateAction } from '../../utils/resetState';
import {
  expectFulfilledThunkValue,
  getMockStoreCreator,
} from '../../utils/test';
import { checkLoginThunk, loginThunk, signOutThunk } from './action';
import { getEmptyState } from './state';

describe('auth slice', () => {
  const apiMock = getApiMock();
  const mockStoreCreator = getMockStoreCreator();
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ auth: getEmptyState() });
  });

  describe('sign out thunk', () => {
    test('should dispatch reset state action', async () => {
      await store.dispatch(signOutThunk());
      const [pendingAction, resetStoreAction, fulfilledAction] =
        store.getActions();
      expect(
        extractActionTypes([pendingAction, resetStoreAction, fulfilledAction])
      ).toEqual([
        signOutThunk.pending.type,
        resetStoreAction.type,
        signOutThunk.fulfilled.type,
      ]);
    });
  });

  describe('check login thunk', () => {
    test('should check login status if authorized', async () => {
      const auth = getAuthMock();
      const storeWithAuth = mockStoreCreator({
        auth: { status: true, auth: getFulfilledState(auth) },
      });
      apiMock.onGet(ApiEndpoints.login).replyOnce(HTTPStatuses.ok, auth);
      await storeWithAuth.dispatch(checkLoginThunk());
      expectFulfilledThunkValue({
        store: storeWithAuth,
        thunk: checkLoginThunk,
        value: auth,
      });
    });

    test('should dispatch sign out thunk if login check failed', async () => {
      const auth = getAuthMock();
      const storeWithAuth = mockStoreCreator({
        auth: { status: true, auth: getFulfilledState(auth) },
      });
      apiMock.onGet(ApiEndpoints.login).replyOnce(HTTPStatuses.unauthorized);
      await storeWithAuth.dispatch(checkLoginThunk());
      expect(extractActionTypes(storeWithAuth.getActions())).toEqual([
        checkLoginThunk.pending.type,
        signOutThunk.pending.type,
        resetStateAction.type,
        signOutThunk.fulfilled.type,
        checkLoginThunk.rejected.type,
      ]);
    });
  });

  describe('login thunk', () => {
    test('login should work', async () => {
      const auth = getAuthMock();
      const credentials = getCredentialsMock();
      apiMock.onPost(ApiEndpoints.login).replyOnce(HTTPStatuses.ok, auth);
      await store.dispatch(loginThunk(credentials));
      expect(extractActionTypes(store.getActions())).toEqual([
        loginThunk.pending.type,
        resetStateAction.type,
        loginThunk.fulfilled.type,
      ]);
    });
  });
});
