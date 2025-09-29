// import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Header from "../../components/Header";
import searchData from "../../utils/searchTerms.json";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Skeleton } from 'primereact/skeleton';

import AdvanceSearch from "../../components/AdvanceSearch";
import { searchVehiclesAPI } from "../../utils/api/products";
import { toQueryString } from "../../utils/toQueryString";

interface Vehicle {
  id: number;
  year: number;
  make: string;
  model: string;
  mileage: number;
  transmission: string;
  price: string;
  first_image: string;
}

const SearchResultsPage: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const [sortBy, setSortBy] = useState("Relevance");
  // const [make, setMake] = useState("AnyMake");
  // const [model, setModel] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState<any>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({}); 

  const [vehicles, setVehicles] = useState<Vehicle[]>();

  const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useState({
  //   customText: "",
  //   model: "",
  //   year: "",
  //   mileage: "",
  //   status: "",
  //   transmission: "",
  //   fuel_type: "",
  //   color: "",
  //   engine_type: "",
  // });
  // price: "",
  // condition: "",

  // const vehicles: Vehicle[] = [
  //   {
  //     id: 1,
  //     year: 2020,
  //     make: "Toyota",
  //     model: "Camry SE",
  //     miles: 25000,
  //     transmission: "Automatic",
  //     price: 24999,
  //     image:
  //       "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //   },
  //   {
  //     id: 2,
  //     year: 2020,
  //     make: "BMW",
  //     model: "X5 xDrive40i",
  //     miles: 25000,
  //     transmission: "Automatic",
  //     price: 49500,
  //     image:
  //       "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //   },
  //   {
  //     id: 3,
  //     year: 2017,
  //     make: "Mercedes",
  //     model: "Benz C-Class",
  //     miles: 16000,
  //     transmission: "Automatic",
  //     price: 39000,
  //     image:
  //       "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //   },
  //   {
  //     id: 4,
  //     year: 2019,
  //     make: "Ford",
  //     model: "F-150 XLT",
  //     miles: 69000,
  //     transmission: "Automatic",
  //     price: 32000,
  //     image:
  //       "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //   },
  //   {
  //     id: 5,
  //     year: 2023,
  //     make: "Honda",
  //     model: "Civic Sport",
  //     miles: 10000,
  //     transmission: "Automatic",
  //     price: 25500,
  //     image:
  //       "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //   },
  //   {
  //     id: 6,
  //     year: 2019,
  //     make: "Jeep",
  //     model: "Wrangler Sahara",
  //     miles: 45000,
  //     transmission: "Automatic",
  //     price: 35000,
  //     image:
  //       "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //   },
  // ];

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setSearchParams((prevParams) => ({
  //     ...prevParams,
  //     [name]: value,
  //   }));
  // };

  const searchVehicles = async (searchOption?: string) => {
    setLoading(true);

      const query = {search: ''}

      if (searchOption && searchOption === 'url') {
        query.search = window.location.search;
        
        const currentFilters = parseQueryString(window.location.search);
        setSelectedFilters(currentFilters);
        // console.log( 'search', search);
      } else {
        query.search = toQueryString(selectedFilters);
        const newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          "?" +
          query.search;
        window.history.pushState({ path: newurl }, "", newurl);
        
      }

      // console.log( search.slice(1,  search.length));
      
    
    await searchVehiclesAPI(query.search.slice(0, query.search.length)).then((res)=>{
      setVehicles(res?.data?.results)
      
    })
    // Object.entries(currentFilters).map(([Key, value], index)=>{
    // })



    setLoading(false);
  };
 

  const changeVisibility = (payload: any) => {
 
    const data = {
      name: Object.keys(payload)[0],
      visibility: false,
      value: Object.values(payload)[0],
    };

    setFilterData((prev: any) => {
      const existingIndex = prev.findIndex(
        (item: any) => item.name === data.name
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          visibility: !updated[existingIndex].visibility,
        };
        return updated;
      } else {
        // Add new item
        return [...prev, data];
      }
    });

    console.log(data);
  };

  const clearFilterKey = (key: string) => {
    const currentValues = selectedFilters;

    console.log("key", key);

    if (currentValues[key]) {
      delete currentValues[key];
      setSelectedFilters(currentValues);
    }

    handleCheckboxChange(key);
  };

  const handleCheckboxChange = (
    key: string,
    value?: string,
    checked?: boolean
  ) => {
    const currentValues = selectedFilters[key] || [];

    let updatedValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);

    const updatedFilters : any = {
      ...selectedFilters,
      [key]: updatedValues,
    };

    if (updatedValues.length === 0) {
      delete updatedFilters[key];
    }

    setSelectedFilters(updatedFilters);

    // update the filter state
    // setSelectedFilters((prev) => {
    //   const currentValues = prev[key] || [];

    //   let updatedValues = checked
    //     ? [...currentValues, value] // Add if checked
    //     : currentValues.filter((v) => v !== value); // Remove if unchecked

    //   const updatedFilters = {
    //     ...prev,
    //     [key]: updatedValues,
    //   };

    //   // Clean up empty arrays (optional)
    //   if (updatedValues.length === 0) {
    //     delete updatedFilters[key];
    //   }

    //   const params = new URLSearchParams();
    //   Object.entries(updatedFilters).forEach(([k, vals]) => {
    //     vals.forEach((v) => {
    //       params.append(k, v);
    //     });
    //   });

    //   setSearchQuery(params.toString());

    //   // const query = new URLSearchParams(updated).toString();
    //   // console.log('query available', query)
    //   // console.log('filter available', updatedFilters)

    //   filterQuery = updatedFilters
    //   return updatedFilters;
    // });

    // const query = toQueryString(updatedFilters);
    // const newurl =
    //   window.location.protocol +
    //   "//" +
    //   window.location.host +
    //   window.location.pathname +
    //   "?" +
    //   query;
    // window.history.pushState({ path: newurl }, "", newurl);

    // update the url bar
    // console.log("newurl", newurl);
    // function updateUrlQuery(query) {
    // if (history.pushState) {
    //     const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + query;
    // }
    // }
  };

  // get search query from url and parse back to object
  function parseQueryString(queryString: any) {
    const params = new URLSearchParams(queryString);
    const obj: any = {};

    for (const [key, value] of params.entries()) {
      obj[key] = value.split(",").map(decodeURIComponent);
    }
    return obj;
  }

  // const filterActions = [
  //   {
  //     name: "color",
  //     visibility: false,
  //     value: [],
  //   },
  // ];


  // useEffect(() => {
  //   const currentFilters = parseQueryString(window.location.search);
  //   // console.log("selectedFilters", selectedFilters);
  //   // http://localhost:5173/search?make=Honda&status=importing,reserved&transmission=Manual,CVT
  //   // setSelectedFilters(currentFilters)
    
    
  //   // console.log("currentFilters", currentFilters);

  //   // Object.entries(currentFilters).map(([Key, value], index)=>{
  //   //   // console.log(currentFilters[Key]);
      
  //   //   return (
  //   //     currentFilters[Key].forEach((keyValue:any) => {
  //   //       console.log(keyValue, );
  //   //       // handleCheckboxChange(Key, keyValue, true)
          
  //   //     })

  //   //   )
      
      
  //   // })

  //   // Object

  //   // const params = new URLSearchParams(window.location.search);
  //   // const filters: Record<string, string[]> = {};
  //   //   {
  //   //     "status": [
  //   //         "available",
  //   //         "sold",
  //   //         "importing"
  //   //     ],
  //   //     "color": [
  //   //         "Red",
  //   //         "Other"
  //   //     ],
  //   //     "transmission": [
  //   //         "CVT",
  //   //         "Other"
  //   //     ]
  //   // }
  //   // for (const [key, value] of params.entries()) {
  //   //   if (filters[key]) {
  //   //     filters[key].push(value);
  //   //   } else {
  //   //     filters[key] = [value];
  //   //   }
  //   // }
  //   // setSelectedFilters(filters);
  //   // setSearchQuery(params.toString());
  //   // console.log('selectedFilters', selectedFilters)
  // }, [selectedFilters]);



  useEffect(()=>{
    // const currentFilters = parseQueryString(window.location.search);
    // setSelectedFilters(currentFilters);
    searchVehicles('url')
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 mt-[12vh] ">
      <Dialog
        header="Advance Search"
        visible={visible}
        style={{ width: "90%" }}
        className="p-5"
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <AdvanceSearch />
      </Dialog>
      {/* Header */}
      <Header />
 
      {/* Search Results Header */}
      <section 
      style={{
        backgroundBlendMode: "multiply"
      }} className="bg-[#00000096]  bg-gradient-to-r from-green-600 to-purple-600 text-white py-20"
      // className="bg-green-800 text-white py-12"
      >
        <div className="max-w-7xl mx-auto main_padding text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Your Search Results
          </h1>
          <p className="text-lg">
            Showing 1–12 of 145 vehicles matching your criteria.
          </p>
        </div>
      </section>

      <div className="main grid lg:grid-cols-[20%_80%] gap-5 py-5 max-w-7xl mx-auto main_padding">
        {/* Filter Section */} 
        <section className="hidden lg:block bg-white p-2 rounded-xl">
          <div className="max-w-7xl mx-auto">
            <div className=" rounded-lg flex flex-wrap gap4 items-center">
              <div className="text-[8px] w-full uppercase  flex justify-between">
                <p
                  onClick={() => {
                    setFilterData([]);
                    setSelectedFilters({})
                  }}
                  className="text-gray-500 py-1 pr-2 cursor-pointer"
                >
                  clear all
                </p>
                <Button
                  label="Advance"
                  // icon="pi pi-external-link"
                  onClick={() => setVisible(true)}
                 className="bg-green-600 rounded text-white py-1 px-2  cursor-pointer"
                /> 
              </div>

              <div
                // key={keyIndex}
                className="w-full border-b border-gray-200 py-2"
              >
                <div
                  // onClick={() => changeVisibility({ [Key]: value })}
                  className="flex items-center justify-between"
                >
                  <label className="text-xs  font-bold text-gray-700">
                    Make
                  </label>

                  <i className="cursor-pointer p-1 text-gray-400 pi pi-angle-down"></i>
                </div>

                {/* {
                          const selectedValues = selectedFilters["make"] || [];

                          const filterItem = filterData.find(
                            (item: any) => item.name === "make"
                          );
                          const filter_visibility = filterItem?.visibility ?? true;
                          } */}
                <div
                // className={`${filter_visibility ? "" : "hidden"}  `}
                >
                  <div className="">
                    {searchData?.make?.map((item, index) => {
                      const selectedValues = selectedFilters["make"] || [];
                      // const filterItem = filterData.find(
                      //   (item: any) => item.name === "make"
                      // );
                      // const filter_visibility = filterItem?.visibility ?? true;

                      const isChecked = selectedValues.includes(item);

                      return (
                        <label
                          key={index}
                          className="flex gap-2 text-gray-500 text-xs py-1"
                        >
                          <input
                            key={item}
                            type="checkbox"
                            checked={isChecked}
                            className="border-green-60 peer accent-green-600"
                            value={item}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "make",
                                item,
                                e.target.checked
                              )
                            }
                          />
                          <span className="peer-checked:text-green-600">
                            {item}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  <div className="mt-2 text-[10px] uppercase flex justify-between">
                    <p
                      onClick={() => clearFilterKey("make")}
                      className="text-gray-500"
                    >
                      clear
                    </p>
                    <p 
                    onClick={() =>searchVehicles()}
                    className="text-green-600 cursor-pointer">search</p>
                  </div>
                </div>
              </div>

              {/* {searchData?.filters.map((item, index)=>(

              ))
              } */}

              {Object.entries(searchData?.filters).map(
                ([Key, value], keyIndex) => {
                  const selectedValues = selectedFilters[Key] || [];

                  const filterItem = filterData.find(
                    (item: any) => item.name === Key
                  );
                  const filter_visibility = filterItem?.visibility ?? true;
                  return (
                    <div
                      key={keyIndex}
                      className="w-full border-b border-gray-200 py-2"
                    >
                      <div
                        onClick={() => changeVisibility({ [Key]: value })}
                        className="flex items-center justify-between"
                      >
                        <label className="text-xs  font-bold text-gray-700">
                          {Key.toUpperCase().replace("_", " ")}:
                        </label>

                        <i className="cursor-pointer p-1 text-gray-400 pi pi-angle-down"></i>
                      </div>

                      <div className={`${filter_visibility ? "" : "hidden"}  `}>
                        <div className="">
                          {value?.map((item, index) => {
                            const isChecked = selectedValues.includes(item);

                            return (
                              <label
                                key={index}
                                className="flex gap-2 text-gray-500 text-xs py-1"
                              >
                                <input
                                  key={item}
                                  type="checkbox"
                                  checked={isChecked}
                                  className="border-green-60 peer accent-green-600"
                                  value={item}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      Key,
                                      item,
                                      e.target.checked
                                    )
                                  }
                                />
                                <span className="peer-checked:text-green-600">
                                  {item}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                        <div className="mt-2 text-[10px] uppercase flex justify-between">
                          <p
                            onClick={() => clearFilterKey(Key)}
                            className="text-gray-500"
                          >
                            clear
                          </p>
                          <p 
                          onClick={() =>searchVehicles()}
                          className="text-green-600 cursor-pointer">search
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}

              {/* {renderInputs()} */}

              {/* <div className="">
                <label className="text-sm font-medium text-gray-700">
                  MODEL
                </label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Any Model"
                  className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div> */}

              <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors font-medium">
                Apply Filters
              </button>
            </div>
          </div>
        </section>

        {/* Vehicle Listings */}
        <section className="pt3 pb-8 rounded-2xl bgwhite">
          <div className="max-w7xl bg-white rounded-lg shadow-lg mb-5 mx-auto px-2 py-2 flex items-center gap-3 ">
            
            <label className="text-xs font-medium text-gray-700">SORT BY</label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none text-sm bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                <option value="Relevance">Relevance</option>
                <option value="Price Low to High">Price Low to High</option>
                <option value="Price High to Low">Price High to Low</option>
                <option value="Year Newest">Year Newest</option>
                <option value="Year Oldest">Year Oldest</option>
                <option value="Mileage Low to High">Mileage Low to High</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="max-w7xl mx-auto px2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            loading ? 
            [1, 2, 3, 4, 5, 6, 7, 8, 9, ].map((key)=>(

            <div
                  key={key}
                  className="bg-white rounded-lg shadowm overflow-hidden hover:shadow transition-all"
                >
                  <div className="relative h-48">
                    {/* <img
                      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      className="w-full h-full object-cover"
                    /> */}
                    <Skeleton width="100%" height="100%" className="mb-2" ></Skeleton>

                  </div>
                  <div className="p-2 lg:p-4">
                    <Skeleton width="100%"  className="mb-2 py-3" borderRadius="10px"></Skeleton>
                    <div className="flex justify-between items-center text-xs text-gray-600 mb-4">
                    <Skeleton width="100px"  className="mb-2" borderRadius="10px"></Skeleton>
                    <Skeleton width="50px"  className="mb-2" borderRadius="10px"></Skeleton>
                        
                    </div>
                    <div className="flex justify-between items-center">
                    <Skeleton width="100px"  className="mb-2" borderRadius="10px"></Skeleton>
                    <Skeleton width="100px"  className="mb-2 py-5" borderRadius="10px"></Skeleton>
                    </div>
                  </div>
                </div>
            ))
            : 
              vehicles?.map((vehicle) => (
                vehicle.first_image ?
                <div
                  key={vehicle.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all"
                >
                  <div className="relative h-48 ">
                    <img
                      src={vehicle.first_image}
                      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2 lg:p-4">
                    <h3 className="text-green-600 font-semibold text-gray900 mb-2">
                     {`${
                        vehicle.year + " " + vehicle.make + " " + vehicle.model
                      }`.slice(0, 20)}
                      ...
                    </h3>
                    <div className="flex justify-between items-center text-xs text-gray-600 mb-4">
                      <span>{vehicle.mileage.toLocaleString()} miles</span>
                      <span>{vehicle.transmission}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">
                        #{parseInt(vehicle.price.slice(0, vehicle.price.toString().length -3)).toLocaleString()}
                      </span>
                      <button
                        onClick={() => navigate(`/product/${vehicle.id}/${vehicle?.year}-${vehicle?.make}-${vehicle?.model}`)}
                        className="cursor-pointer text-sm hover:bg-green-600 hover:text-white hover:px-4 py-2 rounded-md   text-green-600 hover:border-green-600 transition-all"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                : ''
              ))}
          
            </div>
          </div>

          {/* Pagination */}
          <section className="py-8">
            <div className="max-w-7xl mx-auto main_padding">
              <div className="flex justify-center items-center space-x-2">
                <button
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  disabled
                >
                  Previous
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md">
                  1
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                  2
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                  3
                </button>
                <span className="px-2 text-gray-400">...</span>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                  Next
                </button>
              </div>
            </div>
          </section>
        </section>
      </div>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-12 mx-4 rounded-lg mb-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8">
            Explore our features and see how Fontein Resource Trade can simplify
            automotive journey.
          </p>
          <button className="bg-white text-blue-500 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold">
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SearchResultsPage;

// {
//     "color": [
//         "White",
//         "Red",
//         "Blue",
//         "Silver"
//     ],
//     "status": [
//         "reserved",
//         "importing"
//     ],
//     "transmission": [
//         "Other",
//         "CVT"
//     ]
// }
