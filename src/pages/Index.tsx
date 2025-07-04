import { PropertyCard } from "@/components/ui/property-card";
import { SearchFilters, SearchFilters as SearchFiltersType } from "@/components/ui/search-filters";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockProperties, featuredProperties } from "@/data/mock-properties";
import { useState } from "react";
import { Search, MapPin, Home, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [searchApplied, setSearchApplied] = useState(false);

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
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Room in
            <span className="block text-primary-glow">Ghana</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Connect directly with verified landlords. No agents, no hidden fees. 
            Discover affordable rooms across Ghana's major cities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              <Search className="w-5 h-5 mr-2" />
              Start Searching
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 text-white border-white/30 hover:bg-white/20">
              <Home className="w-5 h-5 mr-2" />
              Post Property
            </Button>
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

            {/* All Properties */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span className="w-2 h-8 bg-secondary rounded"></span>
                  {searchApplied ? "Search Results" : "All Properties"}
                </h2>
                <Badge variant="outline" className="text-secondary border-secondary">
                  {filteredProperties.length} Properties
                </Badge>
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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
