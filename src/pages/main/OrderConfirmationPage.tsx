import React, { useEffect, useState } from "react";
import {
  FileText,
  ShoppingBag,
  MapPin,
  CheckCircle,
  Mail,
  Download,
  Calendar,
  Truck,
  FileCheck,
  MessageSquare,
  LayoutDashboard,
  Shield,
  CreditCard,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getSingleOrderAPI } from "../../utils/api/ordersAPI";
import { formatDate } from "../../utils/generals";

const OrderConfirmationPage: React.FC = () => {
  const [dataState, setDataState] = useState<any>();
  const params = useParams();

  const getOrder = async () => {
    await getSingleOrderAPI(params.ref_id || "", params.ref || "").then(
      (res) => {
        // console.log("order details", res?.data);
        setDataState(res?.data);
      }
    );
  };
  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className=" bg-gray-50 mt-[12vh]">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto main_padding py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Order Confirmation
              </h1>
              <p className="text-gray-600">
                Thank you! Your purchase is confirmed and a receipt has been
                sent to your email.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Confirmed</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-2 mb-6">
            <FileText className="w-5 h-5 text-gray-900" />
            <h2 className="text-lg font-semibold text-gray-900">
              Order Overview
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 !gap-6 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Order ID
              </label>
              <p className="font-semibold text-gray-900">{dataState?.id}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Payment Method
              </label>
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-gray-600" />
                <span className="font-semibold text-gray-900">
                  {dataState?.payment_method.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="text-right">
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium ml-auto">
                <Download className="w-4 h-4" />
                <span>Receipt</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Date</label>
              <p className="text-gray-900">
                {formatDate(dataState?.created_at)}
              </p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Billing Email
              </label>
              <p className="text-gray-900">
                {dataState?.details?.userDetails?.email}
              </p>
            </div>
            <div className="text-right">
              <label className="block text-sm text-gray-600 mb-1">Status</label>
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {dataState?.payment_status}
              </span>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-2 mb-6">
            <ShoppingBag className="w-5 h-5 text-gray-900" />
            <h2 className="text-lg font-semibold text-gray-900">Items</h2>
          </div>

          <div className="space-y-4">
            {dataState?.details?.productItems?.map((item: any, index: any) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {/* <img src={item.make} className="w-16 h-16 rounded-lg " /> */}

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.year} {item.make} {item.model}
                    </h3>
                    <p className="text-sm text-gray-600">
                      VIN: 4T1G11AK2MU012345 • Gray • 32,120 mi
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-lg">
                    #{item.price}
                  </p>
                  <p className="text-sm text-gray-600">Qty {item.quantity}</p>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-500 rounded-lg overflow-hidden flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Extended Warranty Plus (24 mo)
                  </h3>
                  <p className="text-sm text-gray-600">
                    Covers drivetrain, electrical, roadside
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 text-lg">#1,299</p>
                <p className="text-sm text-gray-600">Qty 1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery & Pickup */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-2 mb-6">
            <MapPin className="w-5 h-5 text-gray-900" />
            <h2 className="text-lg font-semibold text-gray-900">
              Delivery & Pickup
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Delivery Address
              </h3>
              <p className="text-gray-900 mb-1">
                {dataState?.details?.userDetails?.address}
              </p>
              <p className="text-gray-900 mb-3">
                {dataState?.details?.userDetails?.city}{" "}
                {dataState?.details?.userDetails?.zip}
              </p>
              <p className="text-gray-900 mb-3">
                {dataState?.details?.userDetails?.country}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Special instructions: </span>
                <br />{" "}
                {dataState?.details?.userDetails?.notes || "No special note"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {dataState?.details?.deliveryMethod?.toUpperCase()} Option
              </h3>
              <p className="text-gray-900 mb-1">Main Office Service Center</p>
              <p className="text-sm text-gray-600">Available</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-2 mb-6">
            <p className="text-2xl text-gray-900">#</p>
            <h2 className="text-lg font-semibold text-gray-900">
              Order Summary
            </h2>
          </div>

          <div className="space-y-3">
            {Object.entries(dataState?.details?.totalBalance || {}).map(
              ([key, value]: any) => {
                console.log(value?.name)
                if (value?.name !== "total") {
                  return (
                    <div
                      key={key}
                      className="flex justify-between text-gray-700"
                    >
                      <span>{value?.name}</span>
                      <span className="font-medium">
                        #{value?.amount?.toLocaleString()}.00
                      </span>
                    </div>
                  );
                }
              }
            )}
            {/* <div className="flex justify-between text-gray-700">
                        <span>Vehicle</span>
                        <span className="font-medium">$21,900.00</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Extended Warranty</span>
                        <span className="font-medium">$1,299.00</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Documentation Fee</span>
                        <span className="font-medium">$149.00</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Delivery</span>
                        <span className="font-medium">$199.00</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Sales Tax</span>
                        <span className="font-medium">$1,785.12</span>
                      </div> */}
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">
                  Total Paid
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  #
                  {dataState?.details?.totalBalance[
                    dataState?.details?.totalBalance?.length - 1
                  ].amount.toLocaleString()}
                  .00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-2 mb-6">
            <CheckCircle className="w-5 h-5 text-gray-900" />
            <h2 className="text-lg font-semibold text-gray-900">Next Steps</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">
                  Confirmation Email Sent
                </span>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                Delivered
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-100">
              <div className="flex items-center space-x-3">
                <FileCheck className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-gray-900">
                  Sign Title & Registration Docs
                </span>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                Pending
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">
                  Schedule Delivery / Pickup
                </span>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                <Calendar className="w-4 h-4" />
                <span>Schedule</span>
              </button>
            </div>
          </div>
        </div>

        {/* Your Advisor */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-xl">
                👤
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Your Advisor</h3>
                <p className="text-blue-100 text-sm">
                  Jordan Smith • +234-813-757-9041
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-medium">
                <MessageSquare className="w-4 h-4" />
                <span>Message Advisor</span>
              </button>
              <Link to='/user/dashboard' className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-medium border border-blue-500">
                <LayoutDashboard className="w-4 h-4" />
                <span>Go to Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
