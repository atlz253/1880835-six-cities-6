import { render, screen } from '@testing-library/react';
import { Page404 } from '.';
import { getMockStoreCreator } from '../../config/redux/utils/test';
import RouterPaths from '../../components/router/constants/router-paths';
import { Provider } from 'react-redux';
import { MockAppRouter } from '../../components/router/utils/test/components';

describe(Page404.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  test(`should render 404 page on ${RouterPaths.notFound}`, () => {
    const store = mockStoreCreator();
    render(
      <Provider store={store}>
        <MockAppRouter initialEntries={[RouterPaths.notFound]} />
      </Provider>
    );
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
