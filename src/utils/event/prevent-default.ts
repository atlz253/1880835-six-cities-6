import { SyntheticEvent } from 'react';

export function preventDefault(
  callback: (event: Event | SyntheticEvent) => void
) {
  return (event: Event | SyntheticEvent) => {
    event.preventDefault();
    callback(event);
  };
}
