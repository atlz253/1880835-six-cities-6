import { getAuthMock } from '../../../../../../components/auth/mock/get-auth-mock';
import { getFulfilledState } from '../../../../thunk';
import { AuthSliceState } from '../../state';

export function getAuthorizedStateMock() {
  const auth = getAuthMock();
  return {
    status: true,
    auth: getFulfilledState(auth),
  } satisfies AuthSliceState;
}
