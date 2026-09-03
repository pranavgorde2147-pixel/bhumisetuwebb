import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapPanelProps {
  center?: [number, number];
  zoom?: number;
  parcelId?: string;
  onParcelClick?: (parcelId: string) => void;
  style?: React.CSSProperties;
}

const DEFAULT_CENTER: [number, number] = [78.9629, 20.5937];
const DEFAULT_ZOOM = 5;

export default function MapPanel({ center = DEFAULT_CENTER, zoom = DEFAULT_ZOOM, parcelId, onParcelClick, style }: MapPanelProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
        },
        layers: [
          {
            id: 'osm-tiles',
            type: 'raster',
            source: 'osm',
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center,
      zoom,
      attributionControl: false,
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.current.addControl(new maplibregl.ScaleControl(), 'bottom-right');

    map.current.on('load', () => setIsLoaded(true));

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (map.current && isLoaded) {
      map.current.flyTo({ center, zoom: zoom + 1, duration: 1000 });
    }
  }, [center, zoom, isLoaded]);

  useEffect(() => {
    if (!map.current || !isLoaded || !parcelId) return;

    const fetchAndShowParcel = async () => {
      try {
        const res = await fetch(`/api/parcels/${parcelId}/geometry`);
        const data = await res.json();
        if (data.data) {
          const sourceId = `parcel-${parcelId}`;
          const layerId = `parcel-fill-${parcelId}`;
          const borderId = `parcel-border-${parcelId}`;

          if (map.current?.getSource(sourceId)) return;

          map.current?.addSource(sourceId, {
            type: 'geojson',
            data: data.data,
          });

          map.current?.addLayer({
            id: layerId,
            type: 'fill',
            source: sourceId,
            paint: {
              'fill-color': '#1B5E20',
              'fill-opacity': 0.25,
            },
          });

          map.current?.addLayer({
            id: borderId,
            type: 'line',
            source: sourceId,
            paint: {
              'line-color': '#1B5E20',
              'line-width': 2,
            },
          });

          const coordinates = data.data.features?.[0]?.geometry?.coordinates;
          if (coordinates) {
            const bounds = coordinates[0].reduce(
              (b: maplibregl.LngLatBounds, coord: number[]) => b.extend(coord as [number, number]),
              new maplibregl.LngLatBounds(coordinates[0][0], coordinates[0][0])
            );
            map.current?.fitBounds(bounds, { padding: 50 });
          }
        }
      } catch {
        // geometry not available
      }
    };

    fetchAndShowParcel();
  }, [parcelId, isLoaded]);

  return (
    <div className="map-container" style={style}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      {!isLoaded && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          background: 'var(--color-gray-50)',
        }}>
          <div className="spinner spinner-lg" />
        </div>
      )}
    </div>
  );
}
