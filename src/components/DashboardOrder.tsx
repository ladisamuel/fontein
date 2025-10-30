import React, { useEffect, useState } from "react";
import { getOrdersAPI } from "../utils/api/ordersAPI";
import { Link } from "react-router-dom";

const DashboardOrder: React.FC = () => {
  const [dataState, setDataState] = useState<any>();

  const getAllOrder = async () => {
    await getOrdersAPI().then((res) => {
      console.log("order total", res.data.results[0].details?.totalBalance);
      console.log("order total. length", res.data.results[0].details?.totalBalance.length);
      console.log("order total.lenth - 2", res.data.results[0].details?.totalBalance?.[length+2]?.amount);
      setDataState(res?.data);
    });
  };

  useEffect(() => {
    getAllOrder();
  }, []);
  return (
    <div className="">
      {/* Recent Orders and Upcoming Service */}
      <div className="grid grid-cols-1lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="lgcol-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <div className="flex gap-4 text-sm">
              <button className="text-blue-600 font-medium">All</button>
              <button className="text-gray-500 hover:text-gray-700">
                In transit
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                Delivered
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                    Vehicle
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                    Total
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* details.productItems */}
                {dataState?.results?.map((item: any)=>(
                <tr key={item.id} className="border-b border-b-gray-200">
                  <td className="py-4 px-2 text-gray-700">#{item?.id}</td>
                  <td className="py-4 px-2">
                    {item?.details?.productItems?.length}
                    {/* <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Car size={24} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">2020 Mazda</p>
                        <p className="text-sm text-gray-500">
                          CX-5 Grand Touring
                        </p>
                      </div>
                    </div> */}
                  </td>
                  <td className="py-4 px-2">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      
                      {item?.status.toLowerCase().includes("pending") ? 'pending' : item?.status}
                    </span>
                  </td>
                  <td className="py-4 px-2 font-medium text-gray-900">
                    
                    #{item?.details?.totalBalance?.[length+2]?.amount}
                    {/* 
                    // .details?.totalBalance?.[length-1].name}
                     */}
                  </td>
                  <td className="py-4 px-2">
                    <Link to={`/user/order/comfirmation/ref/${item.id}`} className="btn_primary rounded text-white font-medium text-xs px-3 py-2">
                      VIEW
                    </Link>
                  </td>
                </tr>
                  ))}


              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Service */}
        {/* <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Service</h2>
              <button className="text-sm text-gray-600 flex items-center gap-1 hover:text-gray-900">
                <Calendar size={16} />
                Schedule
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b">
                <Wrench size={20} className="text-gray-600 mt-1" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Oil Change - Camry SE</p>
                  <p className="text-sm text-gray-500 mt-1">12 Oct, 10:00</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-4 border-b">
                <div className="w-5 h-5 flex items-center justify-center mt-1">
                  <div className="w-4 h-0.5 bg-gray-600"></div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Brake Inspection - CX-5</p>
                  <p className="text-sm text-gray-500 mt-1">18 Oct, 14:30</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Tire Rotation - Honda Fit</p>
                  <p className="text-sm text-gray-500 mt-1">24 Oct, 09:00</p>
                </div>
              </div>
            </div>
          </div> */}
      </div>
    </div>
  );
};

export default DashboardOrder;
