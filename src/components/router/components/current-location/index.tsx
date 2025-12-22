import { useLocation } from 'react-router-dom';

export function CurrentLocation() {
  const location = useLocation();
  return <div data-testid={CurrentLocation.testId}>{location.pathname}</div>;
}

CurrentLocation.testId = 'current-location';
