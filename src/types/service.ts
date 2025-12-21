export interface ServiceDetails {
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  serviceType: string;
  addons: Record<string, boolean>;
}

export interface ServiceTimeAndPricing {
  time: {
    base: number;
    addons: number;
    total: number;
  };
  price: {
    base: number;
    addons: number;
    total: number;
  };
}
