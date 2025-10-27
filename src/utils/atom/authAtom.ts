import { recoilPersist } from 'recoil-persist';
import Cookies from 'js-cookie';
import { atom, selector } from 'recoil';
import type { AuthType, UserType } from '../type/userType';
import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { cookieStorage } from './recoilCookiesStorage';

 

// export interface AuthState {
//   accessToken: string | null;
//   refreshToken: string | null;
//   user: UserType | null;
//   // isAuthenticated: boolean;
// }



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

// export const accessTokenState = atom<string | null>({
//   key: 'accessTokenState',
//   default: null,
//   effects_UNSTABLE: [persistAtom],
// });

// export const refreshTokenState = atom<string | null>({
//   key: 'refreshTokenState',
//   default: null,
//   effects_UNSTABLE: [persistAtom],
// });

export const authState = atom<AuthType | null>({
  key: 'authState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});


// UserType
export const userState = atom<UserType | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});


export const attachToken = selector({
  key: "useToken",
  get: ({ get }) => {
    const userAuthData = get(authState);
    
    if (userAuthData && userAuthData.access) {
      return axios.interceptors.request.use(function (config) {
        const token = userAuthData?.access;
        // const decodedToken = jwtDecode(token);
        // const dateNow = new Date();
        // if (decodedToken?.exp * 1000 < dateNow?.getTime()) {
        //   const setAuth = useSetRecoilState(authState); 
        //   setAuth(null);
        //   setAuth(null); // Or set empty auth
        //   window.location.href = "/sign-in"; // Redirect to login page
        //   return Promise.reject(error);
        // }
        config.headers.Authorization = `Bearer ${token}`;
        
        return config;
      });
    }
    return null;
  },
});
