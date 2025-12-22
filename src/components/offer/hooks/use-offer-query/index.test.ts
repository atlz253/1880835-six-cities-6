import { renderHook } from '@testing-library/react';
import { useOfferQuery } from '.';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { getEmptyState } from '../../../../config/redux/slice/offers/state';
import { getProviderWrapperWithStore } from '../../../../hocs/redux/get-provider-wrapper-with-store';
import { extractActionTypes } from '../../../../config/redux/utils/action';
import { offerThunk } from '../../../../config/redux/slice/offers';
import { getFulfilledState } from '../../../../config/redux/thunk';
import { getOfferDetailsMock } from '../../mocks/get-offer-details-mock';

describe(useOfferQuery.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should dispatch offer thunk', () => {
    const offerId = 'test';
    const store = mockStoreCreator({ offers: getEmptyState() });
    renderHook(() => useOfferQuery(offerId), {
      wrapper: getProviderWrapperWithStore(store),
    });
    expect(extractActionTypes(store.getActions())).toEqual([
      offerThunk.pending.type,
    ]);
  });

  test('should return offer query', () => {
    const offerId = 'test';
    const offer = getOfferDetailsMock();
    const store = mockStoreCreator({
      offers: {
        ...getEmptyState(),
        offer: { [offerId]: getFulfilledState(offer) },
      },
    });
    const { result } = renderHook(() => useOfferQuery(offerId), {
      wrapper: getProviderWrapperWithStore(store),
    });
    expect(result.current).toEqual(getFulfilledState(offer));
  });
});
