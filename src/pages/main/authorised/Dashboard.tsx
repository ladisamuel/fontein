import React, { useEffect } from 'react';
import { Car, Wrench, ShoppingCart, Search, Package } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { cartState } from '../../../utils/atom/cartAtom';
import { repairRequestState } from '../../../utils/atom/repairAtom';
import DashboardSummary from '../../../components/DashboardSummary';
import DashboardOrder from '../../../components/DashboardOrder';
import { authState } from '../../../utils/atom/authAtom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const user = useRecoilValue(authState)
  const location = useParams()
  const dashboardDiv = location?.div;
  const [profilePage, setProfilePage] = React.useState<string>('summary');
  
      const repairData = useRecoilValue(repairRequestState)
      const cart = useRecoilValue(cartState)

  const getUserOrders: any = async () => {
    // await getOrdersAPI().then((res)=>{
    //   // console.log('user orders response', res)
    // })
  }
  
  const p_pages = [
    {
      name: 'summary',
      page: DashboardSummary
    },
    {
      name: 'orders',
      page: DashboardOrder
    },
  ]

 const goto = (link: string) => {
   setProfilePage(link)
  navigate(`/user/dashboard/${link}`)

 }
  useEffect(()=> {
    getUserOrders()
    
    if (dashboardDiv) {
      
      setProfilePage(dashboardDiv)
    } else {
      setProfilePage('summary')
    }
    
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 mt-[12vh]">
      <main className="px-6 lg:px-[150px] py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.user?.username}</h1>
            <p className="text-gray-600 mb-6">Track your orders, manage services, and continue shopping.</p>
            <div className="flex flex-wrap gap-3">
              <Link to='/search' className="bg-green-600 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-green-700 transition">
                <Car size={20} />
                Browse Cars
              </Link>
              <Link to="/repair" className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition">
                <Wrench size={20} />
                Request Service
              </Link>
              <Link to='/cart' className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition">
                <ShoppingCart size={20} />
                View Cart
              </Link>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&h=120&fit=crop" alt="Car" className="hidden lg:block rounded-lg w-52 h-24 object-cover" />
        </div>

        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button type='button' onClick={()=>goto('summary')} className="bg-white text-left rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm">Summary</h3>
              <ShoppingCart size={20} className="text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{cart.length}</p>
            <p className="text-sm text-gray-500 mt-1">+1 new</p>
          </button>

          <button type='button' onClick={()=>goto('orders')} className="bg-white  text-left rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm">Orders</h3>
              <Package size={20} className="text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-500 mt-1">2 shipping</p>
          </button>

          <Link to='/cart' className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm">Vehicles in cart</h3>
              <ShoppingCart size={20} className="text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{cart.length}</p>
            <p className="text-sm text-gray-500 mt-1">+1 new</p>
          </Link>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm">Service requests</h3>
              <Wrench size={20} className="text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{repairData? '0': <span className='text-sm font-bold text-gray-900'>No request</span>}</p>
            <p className="text-sm text-gray-500 mt-1">Scheduled</p>
          </div>

          
 
        </div>

    {
      p_pages.map((page)=>{
        if (page.name === profilePage) {
          return <page.page /> 
        }
 
      })
    }
        {/* Saved Vehicles and Support Messages */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
 
        </div> */}

          {/* Quick Actions */}
        {
          profilePage === 'summary' ?
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to='/search' className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <Car size={20} className="text-gray-600" />
              <span className="font-medium text-gray-700">Browse Cars</span>
            </Link>
            <Link to='/checkout' className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <ShoppingCart size={20} className="text-gray-600" />
              <span className="font-medium text-gray-700">View Cart</span>
            </Link>
            <Link to='/repair' className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <Wrench size={20} className="text-gray-600" />
              <span className="font-medium text-gray-700">Request Service</span>
            </Link>
            <Link to='/user/settings' className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <Search size={20} className="text-gray-600" />
              <span className="font-medium text-gray-700">Account Settings</span>
            </Link>
          </div>
        </div>
          :''
        }
      </main>
    </div>
  );
};

export default Dashboard;