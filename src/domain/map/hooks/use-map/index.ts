import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import {
  map as initMap,
  Map as LeafletMap,
  tileLayer,
  marker,
  Marker,
} from 'leaflet';
import { Position } from '../../types';
import { currentIcon, defaultIcon } from '../../leaflet/pinIcons';

const MAX_ZOOM = 19;

function useMapRef({
  containerRef,
  position,
}: {
  containerRef: RefObject<HTMLElement>;
  position: Position;
}) {
  const [leafletMap, setLeafletMap] = useState<LeafletMap>();
  const isRendered = useRef<boolean>(false);
  useEffect(() => {
    if (!isRendered.current && containerRef.current) {
      const map = initMap(containerRef.current).setView(
        [position.latitude, position.longitude],
        position.zoom
      );
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: MAX_ZOOM,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      setLeafletMap(map);
      isRendered.current = true;
    }
  }, [leafletMap, containerRef, position]);
  return leafletMap;
}

function useMapPosition({
  position,
  map,
}: {
  position: Position;
  map?: LeafletMap;
}) {
  useEffect(() => {
    if (map) {
      const { lat, lng } = map.getCenter();
      if (position.latitude !== lat || position.longitude !== lng) {
        map.panTo({
          lat: position.latitude,
          lng: position.longitude,
        });
        map.setZoom(position.zoom);
      }
    }
  }, [position, map]);
}

function useLeafletMarkers({
  map,
  markers,
}: {
  map?: LeafletMap;
  markers?: Position[];
}) {
  const result = useMemo(
    () =>
      markers
        ? markers
          .map(
            (m) =>
              map &&
                marker(
                  { lat: m.latitude, lng: m.longitude },
                  { icon: defaultIcon }
                )
          )
          .filter((m): m is Marker => m !== null && m !== undefined)
        : [],
    [map, markers]
  );
  useEffect(() => {
    result.forEach((m) => map && m?.addTo(map));
    return () => result.forEach((m) => m?.remove());
  }, [map, result]);
  return result;
}

function useMapCurrentMarker({
  leafletMarkers,
  currentMarker,
}: {
  leafletMarkers?: Marker[];
  currentMarker?: Position;
}) {
  useEffect(() => {
    if (currentMarker) {
      const current = leafletMarkers?.find((m) => {
        const { lat, lng } = m.getLatLng();
        return (
          lat === currentMarker.latitude && lng === currentMarker.longitude
        );
      });
      current?.setIcon(currentIcon);
      return () => {
        current?.setIcon(defaultIcon);
      };
    }
  }, [leafletMarkers, currentMarker]);
}

export function useMap({
  position,
  containerRef,
  markers,
  currentMarker,
}: {
  position: Position;
  containerRef: RefObject<HTMLElement>;
  markers?: Position[];
  currentMarker?: Position;
}) {
  const map = useMapRef({ containerRef, position });
  const leafletMarkers = useLeafletMarkers({ map, markers });
  useMapCurrentMarker({ leafletMarkers, currentMarker });
  useMapPosition({ map, position });
}
