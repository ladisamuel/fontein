import { Calendar, Wrench } from "lucide-react";
import { useRecoilValue } from "recoil";
import { repairRequestState } from "../utils/atom/repairAtom";
import { formatDate } from "../utils/generals";
import noDataImg from "../assets/icons/nodataImage.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrdersAPI } from "../utils/api/ordersAPI";

export default function DashboardSummary() {
  const repair = useRecoilValue<any>(repairRequestState);
  const [ordersData, setOrdersData] = useState<any>();

  const getUserOrders: any = async () => {
    await getOrdersAPI("4").then((res) => {
      setOrdersData(res.data);
      console.log("resss", res.data);
    });
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div>
      {/* Recent Orders and Upcoming Service */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <div className="flex gap-4 text-sm">
              <button className="text-green-600 font-medium">All</button>
              {/* <button className="text-gray-500 hover:text-gray-700">In transit</button> */}
              <button className="text-gray-500 hover:text-gray-700">
                Delivered
              </button>
            </div>
          </div>
          {ordersData?.results?.length ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                      Vehicle
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                      Order ID
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
                  {ordersData?.results?.map((item: any) => (
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
                          {item?.status.toLowerCase().includes("pending")
                            ? "pending"
                            : item?.status}
                        </span>
                      </td>
                      <td className="py-4 px-2 font-medium text-gray-900">
                        #{item?.details?.totalBalance?.[length + 2]?.amount}
                        {/* 
                                // .details?.totalBalance?.[length-1].name}
                                 */}
                      </td>
                      <td className="py-4 px-2">
                        <Link
                          to={`/user/order/comfirmation/ref/${item.id}`}
                          className="btn_primary rounded text-white font-medium text-xs px-3 py-2"
                        >
                          VIEW
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="">
              <div className="p-5 lg:p-0">
                <img src={noDataImg} alt="" />
              </div>
              <p className="text-center text-gray-400">
                You do not have any order yet.
              </p>
              <div className="text-center p-2">
                <Link
                  to="/search"
                  className="btn_primary transition-all duration-300 py-2 px-4 text-white rounded-lg text-sm"
                >
                  Search Vehicles
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Service */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Upcoming Service
            </h2>
            <button className="text-sm text-gray-600 flex items-center gap-1 hover:text-gray-900">
              <Calendar size={16} />
              Schedule
            </button>
          </div>

          <div className="space-y-4">
            {repair ? (
              <div className="flex items-start gap-3 pb-4 border-b-gray-200 border-b">
                <Wrench size={20} className="text-gray-600 mt-1" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {repair?.request_type} - {repair?.year} {repair?.make}{" "}
                    {repair?.model}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-bold">
                      {formatDate(repair?.preferred_date)}{" "}
                    </span>{" "}
                    {repair?.preferred_time.toUpperCase()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-5 lg:p-0">
                <img src={noDataImg} alt="" />
              </div>
            )}
          </div>
          <div className="pt-4 flex justify-center">
            <Link
              to="/repair"
              className="btn_primary transition-all duration-300 py-2 px-4 text-white rounded-lg text-sm"
            >
              Request Service
            </Link>
          </div>
        </div>

        {/* Support Messages */}
        {/* <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Support Messages</h2>
              <button className="text-sm text-gray-600 flex items-center gap-1 hover:text-gray-900">
                <MessageSquare size={16} />
                New Ticket
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-medium text-sm">A</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">Order #2193 shipping ETA?</p>
                  <p className="text-xs text-gray-500 mt-1">2h ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-4 border-b">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-medium text-sm">S</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">Service estimate for Camry</p>
                  <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-medium text-sm">P</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">Payment confirmation received</p>
                  <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                </div>
              </div>
            </div>
          </div> */}
      </div>
    </div>
  );
}

// <table className="w-full">
//   <thead>
//     <tr className="border-b border-gray-100">
//       <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Vehicle</th>
//       <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Order ID</th>
//       <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Status</th>
//       <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Total</th>
//       <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Action</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr className="border-b  border-gray-100">
//       <td className="py-4 px-2">
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
//             <Car size={24} className="text-gray-600" />
//           </div>
//           <div>
//             <p className="font-medium text-gray-900">2021 Toyota</p>
//             <p className="text-sm text-gray-500">Camry SE</p>
//           </div>
//         </div>
//       </td>
//       <td className="py-4 px-2 text-gray-700">#ORD-2193</td>
//       <td className="py-4 px-2">
//         <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">In transit</span>
//       </td>
//       <td className="py-4 px-2 font-medium text-gray-900">$21,500</td>
//       <td className="py-4 px-2">
//         <button className="text-green-600 hover:text-green-700 font-medium text-sm cursor-pointer">View</button>
//       </td>
//     </tr>

//     {/* <tr className="border-b  border-gray-100">
//       <td className="py-4 px-2">
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
//             <Car size={24} className="text-gray-600" />
//           </div>
//           <div>
//             <p className="font-medium text-gray-900">2020 Mazda</p>
//             <p className="text-sm text-gray-500">CX-5 Grand Touring</p>
//           </div>
//         </div>
//       </td>
//       <td className="py-4 px-2 text-gray-700">#ORD-2051</td>
//       <td className="py-4 px-2">
//         <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Delivered</span>
//       </td>
//       <td className="py-4 px-2 font-medium text-gray-900">$24,900</td>
//       <td className="py-4 px-2">
//         <button className="text-green-600 hover:text-green-700 font-medium text-sm">Invoice</button>
//       </td>
//     </tr>
