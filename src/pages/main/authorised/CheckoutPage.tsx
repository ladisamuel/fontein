import React, { useEffect, useState } from "react";
import {
  MapPin,
  Truck,
  CreditCard,
  ShoppingBag,
  Shield,
  Download,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../../utils/atom/authAtom";
import PaystackPaymentButton from "../../../components/PaystackPaymentButton";


const CheckoutPage: React.FC = () => {
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: auth?.user?.username,
    email: auth?.user?.email,
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    notes: "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [dataBills, setDataBills] = useState<any>([]);
  const [dataDetails, setDataDetails] = useState<any>([]);

  const { state } = useLocation();

  const handlePaymentSuccess = (ref: any) => {
    navigate(`/user/order/comfirmation/py_ref/${ref.reference.reference}`);
  };

//   {
//     "fullName": "SupryTech",
//     "email": "suprytech@email.com",
//     "phone": "",
//     "address": "",
//     "city": "",
//     "state": "",
//     "country": "",
//     "zip": "",
//     "notes": ""
// }

const validateCheckoutForm = () => {
  if (!deliveryDetails.phone) {
    return false;
  }


  if (deliveryMethod === "home") {
    if (!deliveryDetails.address || !deliveryDetails.city || !deliveryDetails.state || !deliveryDetails.country) {
      return false;
    }
  }

  // console.log("Checkout form validated phone.", deliveryDetails.phone);
  // console.log("Checkout form validated address.", deliveryDetails.address);
  return true; 
  
};
  
  useEffect(() => {
    
  console.log("Checkout mounted.:",);
    if (state) {
  console.log("Checkout mounted. Location state:", state);
      setDataBills(state.bills);
      setDataDetails(state.cartItems);
    } else {
      console.log("With data:", state);
      navigate("/cart");
    }
  }, []);


  
  return (
    <div className="mt-[12vh] bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto main_padding py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Checkout
              </h1>
              <p className="text-gray-600">
                Review your items, enter delivery details, and complete payment.
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <button className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                <ShoppingBag className="w-4 h-4" />
                <span>Cart</span>
              </button>
              <button className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                <Shield className="w-4 h-4" />
                <span>Details</span>
              </button>
              <button className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                <CreditCard className="w-4 h-4" />
                <span>Payment</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <MapPin className="w-5 h-5 text-gray-900" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Delivery Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={deliveryDetails?.fullName ?? ""}
                    disabled
                    onChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={deliveryDetails.email}
                    disabled
                    onChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border text-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+234-80X-XXX-XXXX"
                    value={deliveryDetails.phone}
                    onChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        phone: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address 
                    {deliveryMethod === "home" ? <span className="text-red-400">*</span> : null}
                  </label>
                  <input
                    type="text"
                    value={deliveryDetails.address}
                    placeholder="742 Evergreen Terrace"
                    onChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        address: e.target.value,
                      })
                    }
                    required={deliveryMethod === "home"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City {deliveryMethod === "home" ? <span className="text-red-400">*</span> : null}
                  </label>
                  <input
                    type="text"
                    value={deliveryDetails.city}
                    placeholder="MaryLand"
                    onChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        city: e.target.value,
                      })
                    }
                    required={deliveryMethod === "home"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State {deliveryMethod === "home" ? <span className="text-red-400">*</span> : null}
                  </label>
                  <input
                    type="text"
                    value={deliveryDetails.state}
                    placeholder="Lagos"
                    onChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        state: e.target.value,
                      })
                    }
                    required={deliveryMethod === "home"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP
                  </label>
                  <input
                    type="text"
                    value={deliveryDetails.zip}
                    placeholder="62701"
                    onChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        zip: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country {deliveryMethod === "home" ? <span className="text-red-400">*</span> : null}  
                  </label>
                  <input
                    type="text"
                    value={deliveryDetails.country}
                    placeholder="Nigeria"
                    onChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        country: e.target.value,
                      })
                    }
                    required={deliveryMethod === "home"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Notes
                  </label>
                  <textarea
                    value={deliveryDetails.notes}
                    placeholder="Call 30 min before arrival."
                    onChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        notes: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Truck className="w-5 h-5 text-gray-900" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Delivery Method
                </h2>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => setDeliveryMethod("home")}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition ${
                    deliveryMethod === "home"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        deliveryMethod === "home"
                          ? "border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {deliveryMethod === "home" && (
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      )}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">
                        Home Delivery
                      </div>
                      <div className="text-sm text-gray-500">2-4 days</div>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">$199.00</span>
                </div>

                <div
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition ${
                    deliveryMethod === "pickup"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        deliveryMethod === "pickup"
                          ? "border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {deliveryMethod === "pickup" && (
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      )}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">
                        Pickup - Downtown Service Center
                      </div>
                      <div className="text-sm text-gray-500">
                        Ready in 1-2 days
                      </div>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">$0.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex items-center space-x-2 mb-6">
                <ShoppingBag className="w-5 h-5 text-gray-900" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Your Items
                </h2>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                {Object.entries(dataBills).map(([itemKey, itemValue]: any) =>
                  itemValue.name === "total" ? null : (
                    <div key={itemKey} className="flex justify-between text-sm">
                      <span className="text-gray-600">{itemValue?.name}</span>
                      <span className="font-medium text-gray-900">
                        #{itemValue?.amount?.toLocaleString()}
                      </span>
                    </div>
                  )
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  #{dataBills?.[2]?.amount?.toLocaleString()}
                </span>
              </div>

              {validateCheckoutForm() ? 
               
              <PaystackPaymentButton
                className="btn_primary flex-1 flex items-center justify-center space-x-2 py-2 border rounded-lg text-white text-sm font-medium"
                email={auth?.user?.email || ``}
                amount={dataBills?.[2]?.amount} 
                onSuccess={handlePaymentSuccess}
                  // disabled={!validateCheckoutForm()}
                  productUserDetails={deliveryDetails}
                  deliveryMethod={deliveryMethod}
                  totalBalance={dataBills}
                  cartItems={dataDetails}

              />
              :
              <div className="flex space-x-3"> 
                <button 
                className="bg-gray-500 cursor-no-drop flex-1 flex items-center justify-center space-x-2 py-2 border rounded-lg text-white text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  <span className="">Proceed with payment</span>
                </button> 
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
