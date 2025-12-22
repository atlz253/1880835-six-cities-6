import { Store } from '@reduxjs/toolkit';
import { getProviderWrapperWithStore } from '../redux/get-provider-wrapper-with-store';
import { MockPageRouter } from '../../components/router/utils/test/components/mock-router';
import { ReactNode } from 'react';

export function getRouterPageWrapper({
  store,
  route,
  initialEntries,
}: {
  store: Store;
  route: string;
  initialEntries?: string[];
}) {
  const Provider = getProviderWrapperWithStore(store);
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider>
      <MockPageRouter
        initialEntries={initialEntries}
        path={route}
        element={children}
      />
    </Provider>
  );
  return Wrapper;
}
