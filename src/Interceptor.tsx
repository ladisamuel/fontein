import axios from "axios";
import { useRecoilValue } from "recoil";
import { attachToken } from "./utils/atom/authAtom";
// import {  useRecoilValue } from "recoil";

// import { attachToken, authState } from "./utils/atoms/authAtom";
function Interceptor() {
  const mytoken = useRecoilValue(attachToken);
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error) {
        return Promise.reject(error);
      }

    }
  );

  mytoken

  return <></>;
}

export default Interceptor;
