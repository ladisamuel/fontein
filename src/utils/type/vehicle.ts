

interface Make {
  id: number;
  name: string;
}

interface VehiclesImage {
  id: number;
  image: string;
  is_primary: boolean;
}

interface featuresItem {
  content: string;
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

  transmission: string;
  color: string;
  vin: string;
  features: featuresItem[];

}

interface ContactFormType {
    full_name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

// interface CartItem {
//   id: number;
//   name: string;
//   year: number;
//   image: string;
//   price: number;
//   quantity: number;
//   mileage: string;
//   drivetrain: string;
//   color: string;
//   vin: string;
//   location: string;
//   badge?: string;
//   certified?: boolean;
//   mpg?: string;
//   premium?: boolean;
// }


// interface AdvancedSearch {
//   make: string;
//   model: string;
//   yearFrom: string;
//   yearTo: string;
//   minPrice: string;
//   maxPrice: string;
//   mileage: string;
//   location: string;
//   bodyType: string;
//   transmission: string;
//   drivetrain: string;
//   fuelType: string;
//   engine: string;
//   color: string;
//   condition: string;
//   stock: string;
// }

export type {
    Make,
    VehiclesImage,
    Vehicles,
    ContactFormType,
}

