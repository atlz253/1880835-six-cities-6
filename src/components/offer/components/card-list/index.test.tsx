import { render, screen } from '@testing-library/react';
import CardList from '.';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { Provider } from 'react-redux';
import { getEmptyState } from '../../../../config/redux/slice/auth/state';
import { getOffersMetaMocks } from '../../mocks/get-offers-meta-mocks';
import { MockPageRouter } from '../../../router/utils/test/components';

describe(`${CardList.displayName}`, () => {
  const mockStoreCreator = getMockStoreCreator();

  test('should render', () => {
    const store = mockStoreCreator({ auth: getEmptyState() });
    const offers = getOffersMetaMocks();
    render(
      <Provider store={store}>
        <MockPageRouter path="/" element={<CardList offers={offers} />} />
      </Provider>
    );
    offers.forEach((o) =>
      expect(screen.getByText(o.title)).toBeInTheDocument()
    );
  });
});
