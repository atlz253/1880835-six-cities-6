import { errorSlice } from '.';
import { extractActionTypes } from '../../utils/action';
import { getMockStoreCreator } from '../../utils/test';
import { getEmptyState } from './state';

describe('error slice', () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should set error message', () => {
    const store = mockStoreCreator({ error: getEmptyState() });
    const message = 'test error message';
    store.dispatch(errorSlice.actions.setMessage(message));
    expect(extractActionTypes(store.getActions())).toEqual([
      errorSlice.actions.setMessage.type,
    ]);
    const [action] = store.getActions();
    expect(action.payload).toEqual(message);
  });
});
