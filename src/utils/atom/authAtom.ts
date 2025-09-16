import { recoilPersist } from 'recoil-persist';
import Cookies from 'js-cookie';
import { atom } from 'recoil';
// import { cookieStorage } from './recoilCookiesStorage';


export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
}



const cookieStorage = (keyPrefix = '') => ({
  setItem: (key: string, value: string) => {
    Cookies.set(`${keyPrefix}${key}`, value, {
      expires: key.includes('refresh') ? 30 : 1,
      secure: true,
      // sameSite: null,
      sameSite: 'strict',
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
  key: 'recoil-auth',
  storage: cookieStorage('auth_'), // Optional prefix
});

export const accessTokenState = atom<string | null>({
  key: 'accessTokenState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const refreshTokenState = atom<string | null>({
  key: 'refreshTokenState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});


// User
export const userState = atom<User | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
