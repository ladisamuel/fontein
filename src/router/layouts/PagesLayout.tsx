import { Outlet } from 'react-router-dom'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollButtons from '../../components/ScrollButtons';


export default function PagesLayout() {


  console.log('Pages Layout', )
  return (
        <div className="">
          <div className="fixed wfit z-50 bottom-5 right-5 ">
            <ScrollButtons />
          </div>
          {/* <div className="mt-[10vh] p-20 bg-red-600"></div> */}
          <Header />
          {/* <h1> In he page layout</h1> */}
          <Outlet />
          <Footer />
        </div>
 
  );
} 
