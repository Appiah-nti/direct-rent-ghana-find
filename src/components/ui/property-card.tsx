import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    location: string;
    type: string;
    images: string[];
    isVerified: boolean;
    isFeatured: boolean;
    bedrooms?: number;
    bathrooms?: number;
  };
  className?: string;
  variant?: 'default' | 'compact';
  onSelect?: () => void;
  isSelected?: boolean;
}

export function PropertyCard({ property, className, variant = 'default', onSelect, isSelected }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const isCompact = variant === 'compact';

  return (
    <Card 
      className={cn(
        "property-card group overflow-hidden cursor-pointer transition-all duration-200",
        isSelected && "ring-2 ring-primary shadow-lg",
        isCompact ? "flex" : "",
        className
      )}
      onClick={onSelect}
    >
      <div className={cn(
        "relative overflow-hidden",
        isCompact ? "w-48 h-32 flex-shrink-0" : "aspect-[4/3]"
      )}>
        <img
          src={property.images[0] || "/placeholder.svg"}
          alt={property.title}
          className="object-cover w-full h-full group-hover:scale-105 smooth-transition"
        />
        
        {/* Featured badge */}
        {property.isFeatured && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        
        {/* Verified badge */}
        {property.isVerified && (
          <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
            ✓ Verified
          </Badge>
        )}
        
        {/* Image count */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-md text-sm flex items-center gap-1">
          <Camera size={14} />
          {property.images.length}
        </div>
      </div>
      
      <CardContent className={cn("p-4", isCompact && "flex-1")}>
        <div className={cn("space-y-2", isCompact && "space-y-1")}>
          <div className="flex items-start justify-between">
            <h3 className={cn(
              "font-semibold line-clamp-2 group-hover:text-primary smooth-transition",
              isCompact ? "text-base" : "text-lg"
            )}>
              {property.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin size={14} />
            <span className="line-clamp-1">{property.location}</span>
          </div>
          
          <div className={cn(
            "flex items-center",
            isCompact ? "flex-col items-start gap-1" : "justify-between"
          )}>
            <div>
              <p className={cn(
                "font-bold text-primary",
                isCompact ? "text-lg" : "text-2xl"
              )}>
                GH₵ {property.price.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">per month</p>
            </div>
            
            <Badge variant="outline" className="capitalize">
              {property.type}
            </Badge>
          </div>
          
          {(property.bedrooms || property.bathrooms) && (
            <div className="flex gap-4 text-sm text-muted-foreground pt-2">
              {property.bedrooms && (
                <span>{property.bedrooms} bed{property.bedrooms > 1 ? 's' : ''}</span>
              )}
              {property.bathrooms && (
                <span>{property.bathrooms} bath{property.bathrooms > 1 ? 's' : ''}</span>
              )}
            </div>
          )}
          
          {!isCompact && (
            <Button className="w-full mt-4" variant="outline">
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}