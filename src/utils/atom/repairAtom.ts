import { recoilPersist } from "recoil-persist";
import Cookies from "js-cookie";
import { atom } from "recoil";
// import { cookieStorage } from './recoilCookiesStorage';

export interface RepairInterface {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  description: string;
  contact_method: "email" | "sms" | "call";
  year: string;
  make: string;
  model: string;
  license_plate: string;
  vin: string;
  mileage: number;
  transmission: "automatic" | "manual";
  request_type: "repair" | "maintenance" | "inspection";
  preferred_date: string;
  preferred_time: "morning" | "afternoon";
  service_method: "dropoff" | "tow" | "pickup";
  address: string;
  selected_packages: null;
  estimated_total: string;
  created_at: string;
  updated_at: string;
  status: string;
}

const cookieStorage = (keyPrefix = "") => ({
  setItem: (key: string, value: string) => {
    Cookies.set(`${keyPrefix}${key}`, value, {
      expires: 30, // ⬅️ All cookies now expire in 30 days
      secure: true,
      sameSite: "strict",
    });
  },
  getItem: (key: string) => {
    return Cookies.get(`${keyPrefix}${key}`) || null;
  },
  removeItem: (key: string) => {
    Cookies.remove(`${keyPrefix}${key}`);
  },
});

const defaultRepairRequest: RepairInterface = {
  id: 0,
  full_name: "",
  email: "",
  phone: "",
  description: "",
  contact_method: "email", // Assuming 'email' is the default contact method
  year: "2022", // Default year
  make: "",
  model: "",
  license_plate: "",
  vin: "",
  mileage: 0,
  transmission: "automatic", // Default transmission type
  request_type: "repair",
  preferred_date: "",
  preferred_time: "morning",
  service_method: "dropoff", // Default service method
  address: "",
  selected_packages: null,
  estimated_total: "0.00",
  created_at: "",
  updated_at: "",
  status: '',
};

export const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: cookieStorage("repair_"),
});

export const repairRequestState = atom<RepairInterface | null>({
  key: "repairRequest",
  default: null,
  // default: defaultRepairRequest,
  effects_UNSTABLE: [persistAtom],
});
