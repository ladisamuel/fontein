

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

  transmission: string;
  color: string;
  vin: string;

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

export type {
    Make,
    VehiclesImage,
    Vehicles,
    ContactFormType,
}

