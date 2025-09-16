import React, { useEffect, useState } from "react";
import {
  Car,
  DollarSign,
  Wrench,
  Users,
} from "lucide-react";
import Header from "../../components/Header";
import { getVehicles } from "../../utils/api/products";
import { useNavigate } from "react-router-dom";
import type { Vehicles } from "../../utils/type/vehicle";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";

const AutoTradeWebsite: React.FC = () => {
  const [selectedBodyType, setBodyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const [carListings, setCarListings] = useState<Vehicles[]>([]);

  const navigate = useNavigate();
 

  const getCarProducts = () => {
    getVehicles().then((res) => {
      console.log(res);
      setCarListings(res?.data?.results);

      console.log(res?.data?.results);
      
    });
  };

  const gotoSearch = () => {
    const body_type = selectedBodyType ? `body_type=${selectedBodyType}` : ''
    const brand = selectedBrand ? `model=${selectedBodyType}` : ''
    const price_range = priceRange ? `price=${priceRange}` : ''
    
    const items = [ body_type, price_range, brand ]

    if (body_type === '' && brand === '' && price_range === '') {
      return toast.info('Select a value!!')
    } 

    let search_url = 'search?'
    items.forEach(item => {
      if (item) {
        search_url += item + '&'
      }  

      
    });

    navigate(search_url)
    // http://localhost:5173/search?make=Honda,Ford
  }

  // route to product page by slug, this is for SEO consideration
  const gotoProduct = (car: Vehicles) => {
    
    navigate(`product/${car.id}/${car?.year}-${car?.make}-${car?.model}`);
  };
  useEffect(() => {
    getCarProducts();
  }, []);
  return (
    <div className="minh-screen bg-white">
      {/* Header */}
      {/* <div className="z-50 w-full shadow-xl fixed top-0"> */}
      <Header />
      {/* </div> */}

      {/* Hero Section */}
      <section className="relative  mt-[12vh] bg-gradient-to-r from-gray-900 to-gray-700 text-white ">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          className="relative bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80)",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative max-w-7xl mx-auto py-24 main_padding">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">
                Seamless Auto Trading & Care
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Buy, sell, or maintain your vehicle—all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn_primary px-8 py-3 rounded-md font-semibold">
                  Browse Inventory
                </button>
                <button className="border-2 border-gray-300 text-white px-8 py-3 rounded-md hover:bg-white hover:text-gray-900 transition-colors font-semibold">
                  Sell Your Car
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Deals Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto main_padding">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Hot Deals This Week
            </h2>
            <p
            onClick={() => navigate('/search')}
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              See All Listings →
            </p>
          </div>

          {/* Search Filters */}
          <div className="flex flex-wrap gap-4 mb-12">
            <select
              className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedBodyType}
              onChange={(e) => setBodyType(e.target.value)}
            >
              <option value="">Vehicle Type</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="coupe">Coupe</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option selected value="none">Price Range</option>
              <option value="0">#0 - #2,000,000</option>
              <option value="2000000">#2,000,000 - #8,000,000</option>
              <option value="8000000">#8,000,000+</option>
            </select>
            <input
              type="text"
              placeholder="Brand"
              className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            />
            <button 
            onClick={gotoSearch}
             className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
              Find My Car
            </button>
          </div>

          {/* Car Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {carListings.map((car, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={car?.first_image}
                    // alt={`${car?.year} ${car?.make} ${car?.model}`}
                    className="w-full h-48 object-cover"
                  />
                  {index === 2 && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
                      📷
                    </div>
                  )}
                </div>
                <div 
                onClick={() => gotoProduct(car)}
                 className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {car?.year} {car?.make} {car?.model}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {car?.mileage?.toLocaleString()} miles
                  </p>
                  <p className="text-green-600 text-xl font-bold">
                    # {Math.round(parseInt(car?.price)).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto main_padding">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Buy a Car</h3>
              <p className="text-gray-600 mb-4">
                Find your perfect vehicle from our extensive
              </p>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Explore Inventory →
              </a>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sell Your Car</h3>
              <p className="text-gray-600 mb-4">
                List your car in minutes and reach potential buyers
              </p>
              <a
                href="#"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Start Selling →
              </a>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Repair & Maintenance
              </h3>
              <p className="text-gray-600 mb-4">
                Book appointments for car repairs and servicing
              </p>
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Book Now →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial & Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto main_padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                "Saved me $5K!"
              </h3>
              <p className="text-gray-600">John D.</p>
            </div>
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <Users className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    50,000+ Users
                  </h3>
                  <p className="text-gray-600">10,000+ Repairs Done</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AutoTradeWebsite;
