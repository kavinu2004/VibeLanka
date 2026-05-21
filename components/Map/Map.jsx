'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './Map.module.css';

const SOUTH_COAST_BOUNDS = [
  [79.7, 5.9],
  [81.5, 6.5],
];

export default function Map() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      bounds: SOUTH_COAST_BOUNDS,
      fitBoundsOptions: { padding: 40 },
    });

    map.on('load', () => {
      map.fitBounds(SOUTH_COAST_BOUNDS, { padding: 40, duration: 0 });
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className={styles.container} />;
}
