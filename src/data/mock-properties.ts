export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  images: string[];
  latitude: number;
  longitude: number;
  isVerified: boolean;
  isFeatured: boolean;
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  landlord: {
    name: string;
    phone: string;
    verified: boolean;
  };
  amenities: string[];
  datePosted: string;
}

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Beautiful Self-Contain Room in East Legon",
    price: 800,
    location: "East Legon, Accra",
    type: "self-contain",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800",
    ],
    latitude: 5.6500,
    longitude: -0.1667,
    isVerified: true,
    isFeatured: true,
    bedrooms: 1,
    bathrooms: 1,
    description: "Spacious self-contain room with modern amenities in the heart of East Legon. Perfect for young professionals.",
    landlord: {
      name: "Kwame Asante",
      phone: "+233 24 123 4567",
      verified: true,
    },
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "Parking", "Security"],
    datePosted: "2024-01-15",
  },
  {
    id: "2",
    title: "Affordable Chamber & Hall at Tema Community 25",
    price: 450,
    location: "Tema Community 25",
    type: "chamber-hall",
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800",
      "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=800",
    ],
    latitude: 5.6698,
    longitude: -0.0166,
    isVerified: false,
    isFeatured: false,
    bedrooms: 1,
    bathrooms: 1,
    description: "Well-maintained chamber and hall apartment with shared facilities. Great for students and young workers.",
    landlord: {
      name: "Ama Osei",
      phone: "+233 20 987 6543",
      verified: false,
    },
    amenities: ["Shared Kitchen", "Water", "Electricity", "Nearby Market"],
    datePosted: "2024-01-10",
  },
  {
    id: "3",
    title: "Executive Single Room in Spintex",
    price: 600,
    location: "Spintex Road, Accra",
    type: "single-room",
    images: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800",
    ],
    latitude: 5.6037,
    longitude: -0.1000,
    isVerified: true,
    isFeatured: false,
    bedrooms: 1,
    bathrooms: 1,
    description: "Modern single room with attached bathroom and kitchenette. Located in a secure compound.",
    landlord: {
      name: "Kofi Mensah",
      phone: "+233 26 555 1234",
      verified: true,
    },
    amenities: ["Private Bathroom", "Kitchenette", "24/7 Security", "Parking"],
    datePosted: "2024-01-08",
  },
  {
    id: "4",
    title: "Furnished Studio Apartment in Cantonments",
    price: 1200,
    location: "Cantonments, Accra",
    type: "studio",
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800",
    ],
    latitude: 5.5833,
    longitude: -0.1833,
    isVerified: true,
    isFeatured: true,
    bedrooms: 1,
    bathrooms: 1,
    description: "Fully furnished studio apartment in prime location. Perfect for expats and professionals.",
    landlord: {
      name: "Akosua Bonsu",
      phone: "+233 54 777 8888",
      verified: true,
    },
    amenities: ["Fully Furnished", "WiFi", "Generator", "Gym Access", "Swimming Pool"],
    datePosted: "2024-01-12",
  },
  {
    id: "5",
    title: "Cozy Room in Shared Apartment - Dansoman",
    price: 350,
    location: "Dansoman, Accra",
    type: "shared-room",
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800",
    ],
    latitude: 5.5333,
    longitude: -0.2500,
    isVerified: false,
    isFeatured: false,
    bedrooms: 1,
    description: "Comfortable room in a shared 3-bedroom apartment. Great for budget-conscious tenants.",
    landlord: {
      name: "Yaw Dankwa",
      phone: "+233 23 444 5555",
      verified: false,
    },
    amenities: ["Shared Kitchen", "Living Room", "Water", "Electricity"],
    datePosted: "2024-01-05",
  },
  {
    id: "6",
    title: "Modern 2-Bedroom Apartment in Achimota",
    price: 1500,
    location: "Achimota, Accra",
    type: "apartment",
    images: [
      "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=800",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800",
    ],
    latitude: 5.6037,
    longitude: -0.2370,
    isVerified: true,
    isFeatured: true,
    bedrooms: 2,
    bathrooms: 2,
    description: "Spacious modern apartment with contemporary fittings. Perfect for small families or professionals.",
    landlord: {
      name: "Nana Akoto",
      phone: "+233 24 999 0000",
      verified: true,
    },
    amenities: ["Modern Kitchen", "Living Room", "Balcony", "Parking", "Security"],
    datePosted: "2024-01-14",
  },
];

export const featuredProperties = mockProperties.filter(p => p.isFeatured);
export const verifiedProperties = mockProperties.filter(p => p.isVerified);