import { render, screen } from '@testing-library/react';
import { Error } from '.';
import { getEmptyState } from '../../config/redux/slice/error/state';
import { getMockStoreCreator } from '../../config/redux/utils/test';
import RouterPaths from '../../components/router/constants/router-paths';
import { Provider } from 'react-redux';
import { MockAppRouter } from '../../components/router/utils/test/components';

describe(Error.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test(`should render error page on ${RouterPaths.error}`, () => {
    const store = mockStoreCreator({ error: getEmptyState() });
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[RouterPaths.error]} />
      </Provider>
    );
    expect(screen.getByText('App error :(')).toBeInTheDocument();
  });
});
