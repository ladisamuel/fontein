

interface Make {
  id: number;
  name: string;
}

interface VehiclesImage {
  id: number;
  image: string;
  is_primary: boolean;
}

interface Vehicles {
  condition: string;
  description: string;
  id: number;
  images: VehiclesImage[];
  make: string;
  mileage: number;
  model: string;
  price: string;
  status: string;
  year: number;
  first_image: string;
}

export type {
    Make,
    VehiclesImage,
    Vehicles,
}