import { render, screen } from '@testing-library/react';
import { PrivateRoute } from '.';
import { Provider } from 'react-redux';
import { getMockStoreCreator } from '../../../../config/redux/utils/test';
import { getEmptyState } from '../../../../config/redux/slice/auth/state';
import { Route, Routes } from 'react-router-dom';
import { getAuthorizedStateMock } from '../../../../config/redux/slice/auth/utils/test';
import RouterPaths from '../../constants/router-paths';
import { MockRouter } from '../../utils/test/components';

describe(PrivateRoute.name, () => {
  const mockStoreCreator = getMockStoreCreator();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should navigate to login page if not authorized', () => {
    const store = mockStoreCreator({ auth: getEmptyState() });
    const loginPageText = 'Login page';
    render(
      <Provider store={store}>
        <MockRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <div>Private children</div>
                </PrivateRoute>
              }
            />
            <Route path={RouterPaths.login} element={<div>{loginPageText}</div>} />
          </Routes>
        </MockRouter>
      </Provider>
    );
    expect(screen.getByText(loginPageText)).toBeInTheDocument();
  });

  test('should navigate to route if authorized', () => {
    const store = mockStoreCreator({ auth: getAuthorizedStateMock() });
    const privateRouteText = 'Private children';
    render(
      <Provider store={store}>
        <MockRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <div>Private children</div>
                </PrivateRoute>
              }
            />
            <Route path={RouterPaths.login} element={<div>Login page</div>} />
          </Routes>
        </MockRouter>
      </Provider>
    );
    expect(screen.getByText(privateRouteText)).toBeInTheDocument();
  });
});
