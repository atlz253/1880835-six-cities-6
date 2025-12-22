import { getPostedCommentsMock } from '../../../../components/comment/mocks/get-posted-comments-mock';
import { ENDPOINTS } from '../../../axios';
import HTTP_STATUS from '../../../axios/constants/HTTP_STATUS';
import { getApiMock } from '../../../axios/utils/test/get-api-mock';
import {
  expectFulfilledThunkValue,
  getMockStoreCreator,
} from '../../utils/test';
import { offerCommentsThunk, postCommentThunk } from './action';
import { getEmptyState } from './state';

describe('comments slice', () => {
  const apiMock = getApiMock();
  const mockStoreCreator = getMockStoreCreator();
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ comments: getEmptyState() });
  });

  describe('offer comments thunk', () => {
    test('should fetch offer posted comments', async () => {
      const offerId = 'test';
      const postedComments = getPostedCommentsMock();
      apiMock
        .onGet(ENDPOINTS.comments(offerId))
        .replyOnce(HTTP_STATUS.ok, postedComments);
      await store.dispatch(offerCommentsThunk(offerId));
      expectFulfilledThunkValue({
        store: store,
        thunk: offerCommentsThunk,
        value: postedComments,
      });
    });
  });

  describe('post offer thunk', () => {
    test('should fetch posted comment', async () => {
      const offerId = 'test';
      const comment = getPostedCommentsMock()[0];
      apiMock
        .onPost(ENDPOINTS.comments(offerId))
        .replyOnce(HTTP_STATUS.ok, comment);
      await store.dispatch(postCommentThunk({ offerId, comment }));
      expectFulfilledThunkValue({
        store: store,
        thunk: postCommentThunk,
        value: comment,
      });
    });
  });
});
