import menuItem from "../utils/link/menuLinks.json";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Header() {
  const menu = menuItem;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header
      className={`${
        top ? "shadow-2xl bg-red-400" : "shadow-none "
      } main_padding h-[12vh] bg-white my-auto w-full z-50 fixed flex items-center top-0 transition-all `}
    >
      <nav className="w-full">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">FR</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Fontein Auto Trade
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
                  {item.icon ? (
                    <i
                      className={`${item.icon} p-2 text-gray-500 text-sm rounded-lg border border-gray-200`}
                    ></i>
                  ) : (
                    ""
                  )}
                  {item.text}
                </Link>
              ) : (
                <Link key={index} to={item.link}>
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
          <div className="md:hidden">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {/* Hamburger icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {mobileMenuOpen ? (
              // index !== menu.open.length - 1 ?
              <div className="md:hidden absolute top-full z-50 left-1/2 -translate-x-1/2 w-[90%] mx-auto bg-white border-t border-gray-200 shadow-lg">
                <ul className="flex flex-col">
                  {menu.open.map((item, index) =>
                    item.text ? (
                      <li className="hover:bg-gray-200">
                        <Link
                          to={item.link}
                          key={index}
                          className="block px-4 py-2"
                        >
                          {item.text}
                        </Link>
                      </li>
                    ) : (
                      ""
                    )
                  )}
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

// {menu.open.map((item, index) =>
//   index !== menu.open.length - 1 ? (
//     <Link
//       to={item.link}
//       key={index}
//       className="text-gray-700 hover:text-gray-900"
//     >
//       {item.icon ?
//       <i className={`${item.icon} p-2 text-gray-500 text-sm rounded-lg border border-gray-200`}></i>
//     :''}
//       {item.text}
//     </Link>
//   ) : (
//     <Link
//       key={index}
//      to={item.link}>
//       <button className=" btn_primary text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
//         {item.text}
//       </button>
//     </Link>
//   )
// )}
