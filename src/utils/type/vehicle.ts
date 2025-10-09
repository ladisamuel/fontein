

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
  id: number | string;
  images: VehiclesImage[];
  make: string;
  mileage: number;
  model: string;
  price: string;
  status: string;
  year: number;
  first_image: string;
}

interface ContactFormType {
    full_name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export type {
    Make,
    VehiclesImage,
    Vehicles,
    ContactFormType,
}

