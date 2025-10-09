import menuItem from "../utils/link/menuLinks.json";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logoImage from "../assets/logo/Logo.jpg";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../utils/atom/authAtom";

export default function Header() {
  const menu = menuItem;
  const [auth, setAuth] = useRecoilState(authState);

  const popupRef = useRef<HTMLDivElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [top, setTop] = useState(false);
  const [accountDropDownisOpen, setAccountDropDownIsOpen] = useState(false);

    const togglePopup = () => {
      console.log('toggle popup', accountDropDownisOpen)
    setAccountDropDownIsOpen(!accountDropDownisOpen);
  };

    const handleClickOutside = (e: any) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setAccountDropDownIsOpen(false);
    }
  };

   useEffect(() => {
    if (accountDropDownisOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener when component unmounts or accountDropDownisOpen changes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [accountDropDownisOpen]);

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(true) : setTop(false);
    };
    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`${
        top ? "shadow-2xl " : "shadow-none "
      } main_padding h-[12vh] bg-white my-auto w-full z-50 fixed flex items-center top-0 transition-all `}
    >
      <nav className="w-full">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <span className="text-white border font-bold text-lg">
                <img
                  src={logoImage}
                  className="
                border"
                  alt=""
                />
              </span>
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Fontein Resource
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
              ) : auth ? (
                <div key={index} className="relative">
                  <i
                  onClick={togglePopup}
                    className={`pi pi-user hover:bg-green-100 cursor-pointer p-2 text-gray-500 text-sm rounded-lg border border-gray-200 transition-all`}
                  ></i>
                  {accountDropDownisOpen && 
                  <div ref={popupRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                    <ul className="textxs flex flex-col text-gray-500 py-1 rounded-xl">
                      <li className=" px-1 ">
                        <div className="border px-1 border-gray-200 rounded   ">
                          <p className="text-gray-800 text-xs">{auth.user.username}</p>
                          <p className="text-gray800 text-xs">{auth.user.email}</p>
                        </div>
                      </li>
                      <Link to='/user/dashboard' className="grid grid-cols-[1fr_10fr] gap-1 items-center hover:bg-green-100 cursor-pointer py-2 px-2 mt-1 "><i className="pi pi-sitemap" ></i> My Dashboard</Link>
                      <Link to='' className="grid grid-cols-[1fr_10fr] gap-1 items-center hover:bg-green-100 cursor-pointer py-2 px-2 "><i className="pi pi-user-edit" ></i>Account Settings</Link>
                      <li className=" px-2 ">
                        <hr className="border-gray-200" />
                      </li>
                      <li onClick={()=>setAuth(null)} className="flex justify-center text-xs gap-1 items-center text-red-500 bordert hover:bg-red-50 cursor-pointer py-2 px-2 ">Sign out</li>
                    </ul>
                  </div>
                  }
                </div>
              ) : (
                <Link key={index} to={item.link}>
                  <button className=" btn_primary text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
                    {item.text}
                  </button>
                </Link>
              )
            )}
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
