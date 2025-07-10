import { PropertyCard } from "@/components/ui/property-card";
import { SearchFilters, SearchFilters as SearchFiltersType } from "@/components/ui/search-filters";
import { PropertyMap } from "@/components/PropertyMap";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProperties, featuredProperties } from "@/data/mock-properties";
import { useState } from "react";
import { Search, MapPin, Home, CheckCircle, Grid, Map } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [searchApplied, setSearchApplied] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [viewType, setViewType] = useState<'grid' | 'map'>('grid');

  const handleSearch = (filters: SearchFiltersType) => {
    let filtered = mockProperties;

    if (filters.location && filters.location !== "All Locations") {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.type && filters.type !== "All Types") {
      filtered = filtered.filter(p => p.type === filters.type);
    }

    if (filters.bedrooms) {
      const bedroomCount = parseInt(filters.bedrooms);
      filtered = filtered.filter(p => p.bedrooms === bedroomCount);
    }

    filtered = filtered.filter(p => 
      p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    if (filters.verified) {
      filtered = filtered.filter(p => p.isVerified);
    }

    setFilteredProperties(filtered);
    setSearchApplied(true);
  };

  const stats = [
    { label: "Active Listings", value: "1,200+", icon: Home },
    { label: "Verified Landlords", value: "800+", icon: CheckCircle },
    { label: "Happy Tenants", value: "5,000+", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section - Apartments.com Style */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-ghana-green via-primary to-ghana-gold">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            Discover Your New Home
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light">
            Helping thousands of renters find their perfect fit.
          </p>
          
          {/* Central Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-full p-2 shadow-2xl">
              <div className="flex items-center">
                <div className="flex-1 px-6 py-4">
                  <input 
                    type="text" 
                    placeholder="Enter location (e.g., East Legon, Accra)"
                    className="w-full text-lg text-foreground placeholder-muted-foreground border-none outline-none bg-transparent"
                  />
                </div>
                <Button size="lg" className="rounded-full px-8 hero-gradient text-white font-semibold">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Search Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <SearchFilters onSearch={handleSearch} />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Properties */}
            {!searchApplied && (
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span className="w-2 h-8 bg-primary rounded"></span>
                    Featured Properties
                  </h2>
                  <Badge variant="outline" className="text-primary border-primary">
                    {featuredProperties.length} Properties
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {featuredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </section>
            )}

            {/* Properties with Map/Grid Toggle */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span className="w-2 h-8 bg-secondary rounded"></span>
                    {searchApplied ? "Search Results" : "Explore Rentals in Accra, Ghana"}
                  </h2>
                  <Badge variant="outline" className="text-secondary border-secondary">
                    {filteredProperties.length} Properties
                  </Badge>
                </div>
                
                <Tabs value={viewType} onValueChange={(value) => setViewType(value as 'grid' | 'map')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="grid" className="flex items-center gap-2">
                      <Grid className="w-4 h-4" />
                      Grid
                    </TabsTrigger>
                    <TabsTrigger value="map" className="flex items-center gap-2">
                      <Map className="w-4 h-4" />
                      Map
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {filteredProperties.length === 0 ? (
                <Card className="p-12 text-center">
                  <CardContent>
                    <div className="text-muted-foreground">
                      <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                      <p>Try adjusting your search filters to find more properties.</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Tabs value={viewType} className="w-full">
                  <TabsContent value="grid" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredProperties.map((property) => (
                        <PropertyCard 
                          key={property.id} 
                          property={property}
                          onSelect={() => setSelectedProperty(property.id)}
                          isSelected={selectedProperty === property.id}
                        />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="map" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4 max-h-[500px] overflow-y-auto">
                        {filteredProperties.map((property) => (
                          <PropertyCard 
                            key={property.id} 
                            property={property}
                            variant="compact"
                            onSelect={() => setSelectedProperty(property.id)}
                            isSelected={selectedProperty === property.id}
                          />
                        ))}
                      </div>
                      <div className="sticky top-4">
                        <PropertyMap 
                          properties={filteredProperties.map(p => ({
                            id: p.id,
                            title: p.title,
                            price: p.price,
                            location: p.location,
                            type: p.type,
                            bedrooms: p.bedrooms || 1,
                            latitude: p.latitude,
                            longitude: p.longitude,
                            image: p.images[0]
                          }))}
                          selectedProperty={selectedProperty}
                          onPropertySelect={setSelectedProperty}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
