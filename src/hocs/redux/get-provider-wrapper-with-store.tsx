import { Store } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

export function getProviderWrapperWithStore(store: Store) {
  const result = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
  result.displayName = 'Wrapper';
  return result;
}
