import { SyntheticEvent } from 'react';

export function stopPropagation(
  callback: (event: Event | SyntheticEvent) => void
) {
  return (event: Event | SyntheticEvent) => {
    event.stopPropagation();
    callback(event);
  };
}
