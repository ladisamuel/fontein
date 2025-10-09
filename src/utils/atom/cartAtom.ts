



import { recoilPersist } from "recoil-persist";
import Cookies from "js-cookie";
import { atom } from "recoil";
import type { Vehicles } from '../type/vehicle'
// import { cookieStorage } from './recoilCookiesStorage';
 

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
 
export const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: cookieStorage("cart_"),
});

export const cartState = atom<string[]>({
  key: "cart",
  default: [],
  // default: defaultRepairRequest,
  effects_UNSTABLE: [persistAtom],
});

