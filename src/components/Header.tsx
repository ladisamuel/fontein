import menuItem from "../utils/link/menuLinks.json";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Header() {
  const menu = menuItem;

  const [top, setTop] = useState(false);

  // px-4 sm:px-6 lg:px-26

  
  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(true) : setTop(false);
    };
    window.addEventListener("scroll", scrollHandler);

    // if (auth && auth.access) {
    //   const getNotification = async () => {
    //     await allNotifications().then((res: any) => {
    //       setNotification(res.data.data);
    //       console.log(notification);
          
    //     });
    //   };

    //   getNotification();
    // }

    return () => window.removeEventListener("scroll", scrollHandler);
    
  }, [top]);

  return (
    <header className={`${
        top ? "shadow-2xl bg-red-400" : "shadow-none "
    }  h-[12vh] bg-white my-auto w-full z-50 fixed top-0 transition-all`}>
      <nav className="max-w-7xl mx-auto main_padding">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">FR</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Firma Auto Trade
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {menu.open.map((item, index) =>
              index !== menu.open.length - 1 ? (
                <Link
                  to={item.link}
                  key={index}
                  className="text-gray-700 hover:text-gray-900"
                >
                  {item.icon ? 
                  <i className={`${item.icon} p-2 text-gray-500 text-sm rounded-lg border border-gray-200`}></i>
                :''}
                  {item.text}
                </Link>
              ) : (
                <Link
                  key={index}
                 to={item.link}>
                  <button className=" btn_primary text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
                    {item.text}
                  </button>
                </Link>
              )
            )}
            {/* <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
              <div className="relative">
              </div>
              <button className="flex items-center text-gray-700 hover:text-gray-900">
                Features
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <a href="#" className="text-gray-700 hover:text-gray-900">Contact Us</a>
               */}
          </div>
        </div>
      </nav>
    </header>
  );
}
