import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Fix for default markers in react-leaflet
const icon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  bedrooms: number;
  latitude: number;
  longitude: number;
  image: string;
}

interface PropertyMapProps {
  properties: Property[];
  selectedProperty?: string | null;
  onPropertySelect?: (propertyId: string) => void;
}

export function PropertyMap({ properties, selectedProperty, onPropertySelect }: PropertyMapProps) {
  return (
    <Card className="h-[500px] w-full overflow-hidden">
      <CardContent className="p-0 h-full">
        <MapContainer
          center={[5.6037, -0.1870] as LatLngExpression}
          zoom={11}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {properties.map((property) => (
            <Marker
              key={property.id}
              position={[property.latitude, property.longitude] as LatLngExpression}
              icon={icon}
            >
              <Popup>
                <div className="w-64 p-2">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-semibold text-sm mb-1">{property.title}</h3>
                  <p className="text-lg font-bold text-primary mb-1">
                    GH₵ {property.price.toLocaleString()}/month
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex gap-1">
                    <Badge variant="secondary" className="text-xs">
                      {property.bedrooms} bed
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {property.type}
                    </Badge>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </CardContent>
    </Card>
  );
}