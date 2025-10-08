import { Outlet } from 'react-router-dom'
import Header from '../../components/Header';
import Footer from '../../components/Footer';


export default function PagesLayout() {


  return (
        <div className="">
          {/* <div className="mt-[10vh] p-20 bg-red-600"></div> */}
          <Header />
          {/* <h1> In he page layout</h1> */}
          <Outlet />
          <Footer />
        </div>
 
  );
} 
