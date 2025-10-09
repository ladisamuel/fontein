import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../utils/atom/authAtom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollButtons from "../../components/ScrollButtons";

export default function UserLayout() {
  const auth = useRecoilValue(authState);

  return (
    <div>
      
          <div className="fixed wfit z-50 bottom-5 right-5 ">
            <ScrollButtons />
          </div>
      {/* {auth?.access && user.email === 'customer' ? ( */}
      {auth !== null && auth?.user?.email !== null ? (
        <div className="">
          {/* <div className="mt-[10vh] p-20 bg-red-600"></div> */}
          <Header />
          {/* <h1> In he page layout</h1> */}
          <Outlet />
          <Footer />
        </div>
      ) : (
        <Navigate to="/auth/login" />
      )}

      {/* <Outlet /> */}

      {/* auth?.token && user.role === 'staff' ? 
      (
        <Navigate to="/admin/dashboard" />

      ) : */}
    </div>
  );
}
