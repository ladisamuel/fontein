import React, { useEffect, useState } from "react";
import {
  Plus,
  Minus,
  X,
  Clock,
  Shield,
  Truck,
  CreditCard,
  Search,
  Trash2,
  Bookmark,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useRecoilState } from "recoil";
import { cartState } from "../../utils/atom/cartAtom";
import { searchVehiclesAPI } from "../../utils/api/products";
import { Link, useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useRecoilState<any>(cartState);
  const [cartItems, setCartItems] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const getItems = async () => {
    setLoading(true);
    const payload = `id=` + cart;
    await searchVehiclesAPI(payload).then((res) => {
      const results = res.data.results.map((item: any) => ({
        ...item,
        quantity: 1, // default quantity
        price: parseFloat(item.price), // make sure it's a number
      }));

      setCartItems(results);
    });
    setLoading(false);

  };

  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id: string | number, delta: number) => {
    setCartItems((items: any) =>
      items.map((item: any) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );

    console.log('cartItems', cartItems);
  };

  const removeItem = (id: string | number) => {
    setCart((cartI: string[] | number[]) => cartI.filter((item) => item != id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cartItems.reduce(
    (sum: any, item: any) => sum + item?.price * item?.quantity,
    0
  );
  //   const deliveryEstimate = 900;
  const taxes = 7450;
  const total = subtotal + taxes;

  const gotoCheckOut = () => {
    const bills = [
      {
        name: "subtotal",
        amount: subtotal,
      },
      {
        name: "taxes",
        amount: taxes,
      },
      {
        name: "total",
        amount: total,
      },
    ];

    console.log('cartItems', cartItems);

    navigate("/user/order/checkout", { state: {bills: bills, cartItems: cartItems } });
  };

  useEffect(() => {
    if (cart.length) {
      getItems();
    }
  }, [cart]);

  return (
    <div className="mt-[12vh] bg-gray-50">
      {/* Main Content */}

      {cart.length ? (
        <div className="max-w-7xl mx-auto main_padding py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row gap-y-2 justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Cart
              </h1>
              <p className="text-gray-600">
                Review your selected vehicles and proceed to checkout
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-gray-900">Secure Checkout</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="text-gray-900">Delivery Options</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                {/* Cart Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Items ({cart.length})
                    </h2>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>24h reservation hold</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>7-day returns</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-gray-200">
                  
                  {loading ? <div className="h-[40vh]">
                    <div className="relative flex justify-center items-center h-full">
                      <div className=" pi-spin rounded-full border-8 border-t-8 border-t-gray-400 border-gray-200 h-20 w-20">
                      </div>
                        <p className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-sm">Loading</p>
                    </div>
                  </div>:
                  cartItems.map((item: any) => (
                    <div
                      key={item?.id}
                      className="p-6 hover:bg-gray-50 transition"
                    >
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Vehicle Image */}
                        <div className="flex-shrink-0 flex items-start justify-between">
                          <Link to={`/product/${item?.id}/${item.year}-${item.make}-${item.model}`} className="max-w-32 max-h-32 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                            <img src={item?.first_image} alt="" className="rounded" />
                          </Link>
                          <div className="lg:hidden">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => updateQuantity(item?.id, -1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-12 text-center font-medium">
                                {item?.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item?.id, 1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="flex justify-end items-center pt-2 space-x-4">
                              <span className="text-2xl font-bold text-gray-900">
                                #{item.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Vehicle Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <Link to={`/product/${item?.id}/${item.year}-${item.make}-${item.model}`} className="text-lg font-semibold text-green-500">
                                {item.year} {item.make} {item.model}
                              </Link>
                              <div className="flex flex-wrap items-center space-x-2 mt-1 text-sm text-gray-600">
                                <span>
                                  <span className="pi pi-map text-xs"></span>{" "}
                                  {item.mileage.toLocaleString()}
                                </span>
                                <span>•</span>
                                <span>
                                  <span className="pi pi-arrow-right-arrow-left text-xs"></span>{" "}
                                  {item.transmission}
                                </span>
                                <span>•</span>
                                <span>{item.color}</span>
                                <span>•</span>
                                <span>
                                  <span className="pi pi-sort-numeric-up text-xs"></span>{" "}
                                  {item.vin}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeItem(item?.id)}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Quantity and Price Controls */}
                          <div className="hidden lg:flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => updateQuantity(item?.id, -1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-12 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item?.id, 1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="text-2xl font-bold text-gray-900">
                                #{item.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                </div>

                {/* Promo Code Section */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo or Referral Code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button className="px-6 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium">
                      Apply
                    </button>
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={clearCart}
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Clear Cart</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                      <Bookmark className="w-4 h-4" />
                      <span>Save for Later</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Info Note */}
              <div className="mt-6 flex items-start space-x-2 text-sm text-gray-600 bg-green-50 p-4 rounded-lg">
                <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Note:</strong> Vehicle availability is not guaranteed
                  until checkout is complete.
                </p>
              </div>

              {/* Footer Links */}
              <div className="mt-6 flex items-center justify-center space-x-8 text-sm">
                <button className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                  <Shield className="w-4 h-4" />
                  <span>Buyer Protection</span>
                </button>
                <button className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verified Sellers</span>
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">
                      #{subtotal.toLocaleString()}
                    </span>
                  </div>
                  {/* <div className="flex justify-between text-gray-600">
                    <span>Delivery Estimate</span>
                    <span className="font-medium text-gray-900">
                      #{deliveryEstimate}
                    </span>
                  </div> */}
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes (est.)</span>
                    <span className="font-medium text-gray-900">
                      #{taxes.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      #{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Add-ons */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-900">Add-ons</h3>
                    <span className="text-sm text-gray-500">Optional</span>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                      <span>🔧</span>
                      <span className="text-sm text-gray-700">
                        Maintenance Plan
                      </span>
                    </button>
                    <button className="w-full flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                      <Shield className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">
                        Extended Warranty
                      </span>
                    </button>
                    <button className="w-full flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                      <Shield className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">
                        Gap Insurance
                      </span>
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={gotoCheckOut}
                    className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Proceed to Checkout</span>
                  </button>
                  <Link
                    to="/search"
                    className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    <Search className="w-5 h-5" />
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[60vh]">
          <div className="">
            <div className="flex flex-col items-center gap-5 justify-center text-center text-black py-20 px-4">
              <h2 className="text-3xl font-bold">Your Cart is Empty</h2>
              <p>Add some vehicle to proceed to checkout</p>
              <Link
                to="/search"
                className="btn_primary text-white p-5 py-2 rounded-lg"
              >
                Search vehicles
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
