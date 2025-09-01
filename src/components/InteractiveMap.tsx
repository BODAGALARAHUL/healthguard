import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

// Fix for default markers in React Leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface LocationData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'safe' | 'warning' | 'critical';
  waterQuality: number;
  cases: number;
  lastUpdated: string;
}

const InteractiveMap: React.FC = () => {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  // Simulated data for Northeast India
  useEffect(() => {
    const mockData: LocationData[] = [
      {
        id: '1',
        name: 'Guwahati Community',
        lat: 26.1445,
        lng: 91.7362,
        status: 'safe',
        waterQuality: 85,
        cases: 0,
        lastUpdated: '2024-01-15'
      },
      {
        id: '2',
        name: 'Shillong Village',
        lat: 25.5788,
        lng: 91.8933,
        status: 'warning',
        waterQuality: 65,
        cases: 3,
        lastUpdated: '2024-01-14'
      },
      {
        id: '3',
        name: 'Imphal District',
        lat: 24.8170,
        lng: 93.9368,
        status: 'critical',
        waterQuality: 45,
        cases: 12,
        lastUpdated: '2024-01-15'
      },
      {
        id: '4',
        name: 'Aizawl Community',
        lat: 23.7307,
        lng: 92.7173,
        status: 'safe',
        waterQuality: 90,
        cases: 0,
        lastUpdated: '2024-01-15'
      },
      {
        id: '5',
        name: 'Kohima Village',
        lat: 25.6751,
        lng: 94.1086,
        status: 'warning',
        waterQuality: 70,
        cases: 2,
        lastUpdated: '2024-01-14'
      }
    ];
    setLocations(mockData);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusSize = (status: string) => {
    switch (status) {
      case 'safe': return 8;
      case 'warning': return 12;
      case 'critical': return 16;
      default: return 10;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <MapContainer
        center={[25.5, 92.5]}
        zoom={6}
        style={{ height: '500px', width: '100%' }}
        className="rounded-xl shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {locations.map((location) => (
          <CircleMarker
            key={location.id}
            center={[location.lat, location.lng]}
            radius={getStatusSize(location.status)}
            fillColor={getStatusColor(location.status)}
            color={getStatusColor(location.status)}
            weight={2}
            opacity={0.8}
            fillOpacity={0.6}
            eventHandlers={{
              click: () => setSelectedLocation(location),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-lg mb-2">{location.name}</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Status:</strong> 
                    <span className={`ml-1 px-2 py-1 rounded text-xs ${
                      location.status === 'safe' ? 'bg-green-100 text-green-800' :
                      location.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {location.status.toUpperCase()}
                    </span>
                  </p>
                  <p><strong>Water Quality:</strong> {location.waterQuality}%</p>
                  <p><strong>Active Cases:</strong> {location.cases}</p>
                  <p><strong>Last Updated:</strong> {location.lastUpdated}</p>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm">Safe (0-2 cases)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm">Warning (3-8 cases)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm">Critical (9+ cases)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveMap;
