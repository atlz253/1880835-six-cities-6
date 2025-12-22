import 'leaflet/dist/leaflet.css';

import { useRef } from 'react';
import { Position } from './types';
import classNames from 'classnames';
import { useMap } from './hooks/use-map';

export function Map({
  position,
  className,
  markers,
  currentMarker,
}: {
  position: Position;
  className?: string;
  markers?: Position[];
  currentMarker?: Position;
}) {
  const containerRef = useRef<HTMLElement>(null);
  useMap({ containerRef, position, markers, currentMarker });

  return (
    <section className={classNames('map', className)} ref={containerRef}>
      {}
    </section>
  );
}
