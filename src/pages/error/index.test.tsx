import { render, screen } from '@testing-library/react';
import { Error } from '.';
import { getEmptyState } from '../../config/redux/slice/error/state';
import { getMockStoreCreator } from '../../config/redux/utils/test';
import ROUTES from '../../components/router/constants/ROUTES';
import { Provider } from 'react-redux';
import { MockAppRouter } from '../../components/router/utils/test/components';

describe(Error.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test(`should render error page on ${ROUTES.error}`, () => {
    const store = mockStoreCreator({ error: getEmptyState() });
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[ROUTES.error]} />
      </Provider>
    );
    expect(screen.getByText('App error :(')).toBeInTheDocument();
  });
});
