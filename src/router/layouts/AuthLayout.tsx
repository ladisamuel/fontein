import { Navigate, Outlet } from "react-router-dom";
// import authBG from '../../assets/background/authGradient.png'
// import { useRecoilValue } from "recoil";
// import { accessTokenState, refreshTokenState, userState } from "../../utils/atom/authAtom";

// import { useAuthHandler } from "../../AuthHandler";

export default function AuthLayout() {
  
    // const accessToken = useRecoilValue(accessTokenState);
    // const refreshToken = useRecoilValue(refreshTokenState);
    // const user: any = useRecoilValue(userState);
  
    
    // const auth = {
    //   access: accessToken,
    //   token: refreshToken
    // }
    
    const auth: any = {
      // access: 'eyblablabla-token',
      // token: 'same with access'
    }

  const user:any = {
      // name: 'Sam',
      // role: 'Customer',
      // email: ''
      // role: 'Admin',
      }


  //   console.log('In defautl layout');
      
  // console.log(user, auth);
  

  return (
    <div>
      {/* {auth?.access && user.email === 'customer' ? ( */}
      {auth?.access && user?.email !== null ? (

        <Navigate to="/dashboard" />
      ) :
      (
        <div className=" flex min-h-full w-full overflow-hidden">
          {/* Left side - Orange gradient background */}
          {/* <div className="relative hidden md:block md:w-[40%] ">
            <div className="fixed top-0 left-0 h-[100vh] w-[40%] bg-green-300 rounded-r-[30px] overflow-hidden"> */}
                {/* <img src={authBG} className="h-full w-full" alt="" /> */}
            {/* </div>
          </div> */}
            <Outlet />
        </div>
      )}

      {/* <Outlet /> */}

      {/* auth?.token && user.role === 'staff' ? 
      (
        <Navigate to="/admin/dashboard" />

      ) : */}
    </div>
  );
}

