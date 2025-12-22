import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../../../../components/router/components/app-routes';
import { InitialEntry } from 'history';
import { ReactNode } from 'react';

interface MockRouterProps {
  children: ReactNode;
  initialEntries?: InitialEntry[];
}

export function MockRouter({ children, initialEntries }: MockRouterProps) {
  return (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  );
}

export function MockAppRouter(props: Omit<MockRouterProps, 'children'>) {
  return (
    <MemoryRouter {...props}>
      <AppRoutes />
    </MemoryRouter>
  );
}

interface MockPageRouterProps extends Omit<MockRouterProps, 'children'> {
  path: string;
  element: ReactNode;
}

export function MockPageRouter({
  path,
  element,
  ...rest
}: MockPageRouterProps) {
  return (
    <MemoryRouter {...rest}>
      <Routes>
        <Route path={path} element={element} />
      </Routes>
    </MemoryRouter>
  );
}
