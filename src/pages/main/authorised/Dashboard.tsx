import React, { useEffect, useState } from "react";
import { Car, Wrench, ShoppingCart, Search, Package, User } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartState } from "../../../utils/atom/cartAtom";
import { repairRequestState } from "../../../utils/atom/repairAtom";
import DashboardSummary from "../../../components/DashboardSummary";
import DashboardOrder from "../../../components/DashboardOrder";
import { authState } from "../../../utils/atom/authAtom";
import { getOrderSummaryAPI } from "../../../utils/api/ordersAPI";
import { resendVerificationCode } from "../../../utils/api/userAPI";
import { Dialog } from "primereact/dialog";

interface SummaryDataINTERFACE {
  summaryInfo: number;
  orderInfo: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(authState);
  const location = useParams();
  const dashboardDiv = location?.div;
  const [profilePage, setProfilePage] = useState<string>("summary");
  const [summaryData, setSummaryData] = useState<SummaryDataINTERFACE>({
    summaryInfo: 0,
    orderInfo: 0,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  // const [repairData, setRepairData] = useRecoilState(repairRequestState)

  const repairData = useRecoilValue(repairRequestState);
  const cart = useRecoilValue(cartState);

  const getUserOrders: any = async () => {
    await getOrderSummaryAPI().then((res) => {
      setSummaryData({ ...summaryData, orderInfo: res?.data?.total_orders });
    });
  };

  const p_pages = [
    {
      name: "summary",
      page: DashboardSummary,
    },
    {
      name: "orders",
      page: DashboardOrder,
    },
  ];

  const verifyAccount = async () => {
    setLoadingVerify(true);
    await resendVerificationCode().then((res) => {
      console.log("res in verify account dashboard", res);
      if (res.status === 200) {
        setModalVisible(true);
      }
    });
    setLoadingVerify(false);
  };

  const goto = (link: string) => {
    setProfilePage(link);
    navigate(`/user/dashboard/${link}`);
  };
  useEffect(() => {
    getUserOrders();

    if (dashboardDiv) {
      setProfilePage(dashboardDiv);
    } else {
      setProfilePage("summary");
    }
  }, []);

  useEffect(() => {}, [dashboardDiv]);

  return (
    <div className="min-h-screen bg-gray-50 mt-[12vh]">
      <Dialog
        visible={modalVisible}
        onHide={() => {
          if (!modalVisible) return;
          setModalVisible(false);
        }}
        style={{ maxWidth: "400px" }}
        className="bgwhite p7 rounded-lg"
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="p-10">
          <div className="bg-green-600 w-fit flex justify-center m-auto items-center rounded-md p-3">
            <User size={20} className=" text-white" />
          </div>

          <div className=" text-center flex flex-col gap-3 my-2 mx-5">
            <h4 className=" font-bold text-gray-700">
              Verification email sent!
            </h4>
            <p className="text-gray-500">
              A message has successfully been sent to your email. Proceed to
              your email to complete your account setup.
            </p>
          </div>
        </div>
      </Dialog>
      <main className="px-6 lg:px-[150px] py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm px-6 py-3 mb-6 flex flex-col lg:flex-row gap-y-3 justify-between items-start lg:items-center text-red-500">
          <p>
            You email is not verified. Please verify your email to access all
            features and secure your account.
          </p>
          {loadingVerify ? (
            <button
            disabled
              className="bg-gray-400 text-white px-6 py-2 rounded-lg cursor-not-allowed transition"
            >
              <i className="pi pi-spin pi-spinner"></i>
            </button>
          ) : (
            <button
              onClick={verifyAccount}
              className="bg-green-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition"
            >
              Verify Now
            </button>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.user?.username}
            </h1>
            <p className="text-gray-600 mb-6">
              Track your orders, manage services, and continue shopping.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/search"
                className="bg-green-600 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
              >
                <Car size={20} />
                Browse Cars
              </Link>
              <Link
                to="/repair"
                className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition"
              >
                <Wrench size={20} />
                Request Service
              </Link>
              <Link
                to="/cart"
                className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition"
              >
                <ShoppingCart size={20} />
                View Cart
              </Link>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&h=120&fit=crop"
            alt="Car"
            className="hidden lg:block rounded-lg w-52 h-24 object-cover"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button
            type="button"
            onClick={() => goto("summary")}
            className="bg-white text-left rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm">Summary</h3>
              <ShoppingCart size={20} className="text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{cart.length}</p>
          </button>

          <button
            type="button"
            onClick={() => goto("orders")}
            className="bg-white text-left rounded-lg shadow-sm p-6"
          >
            <div className="flex items-stretch justify-between mb-2">
              <h3 className="text-gray-600 text-sm">Orders</h3>
              <Package size={20} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 mt-1"> </p>
            <p className="text-3xl font-bold text-gray-900">
              {summaryData.orderInfo}
            </p>
          </button>

          <Link to="/cart" className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm">Vehicles in cart</h3>
              <ShoppingCart size={20} className="text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{cart.length}</p>
            <p className="text-sm text-gray-500 mt-1"> </p>
          </Link>

          <Link to="/repair" className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm">Service requests</h3>
              <Wrench size={20} className="text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {repairData ? (
                "1"
              ) : (
                <span className="text-sm font-bold text-gray-900">
                  No request
                </span>
              )}
            </p>
            <p className="text-sm text-gray-500 mt-1"> </p>
          </Link>
        </div>

        {p_pages.map((page, index) => {
          if (page.name === profilePage) {
            return <page.page key={index} />;
          }
        })}
        {/* Saved Vehicles and Support Messages */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
 
        </div> */}

        {/* Quick Actions */}
        {profilePage === "summary" ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                to="/search"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <Car size={20} className="text-gray-600" />
                <span className="font-medium text-gray-700">Browse Cars</span>
              </Link>
              <Link
                to="/checkout"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <ShoppingCart size={20} className="text-gray-600" />
                <span className="font-medium text-gray-700">View Cart</span>
              </Link>
              <Link
                to="/repair"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <Wrench size={20} className="text-gray-600" />
                <span className="font-medium text-gray-700">
                  Request Service
                </span>
              </Link>
              <Link
                to="/user/settings"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <Search size={20} className="text-gray-600" />
                <span className="font-medium text-gray-700">
                  Account Settings
                </span>
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default Dashboard;
