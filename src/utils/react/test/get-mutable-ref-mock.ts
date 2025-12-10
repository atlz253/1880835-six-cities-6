import { MutableRefObject } from 'react';

export function getMutableRefMock(current: HTMLElement | null) {
  return { current } satisfies MutableRefObject<HTMLElement | null>;
}
