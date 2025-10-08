// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/response/ErrorPage';  
import Home from '../pages/main/Home';
import PagesLayout from './layouts/PagesLayout';
import AboutUs from '../pages/main/AboutUs';
import FeaturesPage from '../pages/main/Features2';
import SearchResultsPage from '../pages/main/Search';
import VehicleDetailsPage from '../pages/main/VehicleDetail';
import Register from '../pages/auth/Register';
import LoginThree from '../pages/auth/LoginThree';
import RepairService from '../pages/main/RepairService';
import ContactPage from '../pages/main/ContactPage';


const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <AuthLayout />,
  //   errorElement: <ErrorPage />,
  //   children: [ 
  //     {
  //       path: '/',
  //       element: <LoginTwo />
  //     },
  //     {
  //       path: 'auth/login3',
  //       element: <LoginThree />
  //     },
  //     // {
  //     //   path: 'auth/user-login',
  //     //   element: <Login />
  //     // },
  //     // {
  //     //   path: 'auth/forgotpassword',
  //     //   element: <ForgotPassword />
  //     // },
  //     // {
  //     //   path: 'dashboard',
  //     //   element: (
  //     //     <AuthGuard>
  //     //       <Dashboard />
  //     //     </AuthGuard>
  //     //   )
  //     // }
  //   ]
  // },
  // {
  //   path: '/',
  //   element: <UserLayout />,
  //   // errorElement: <ErrorPage />,
  //   children: [
  //     // { 
  //     //   index: true, 
  //     //   element: <Navigate to="/dashboard" replace /> 
  //     // },
  //     {
  //       path: '/',
  //       element: <Dashboard />
  //     },
  //     {
  //       path: 'dashboard',
  //       element: <DataTablePage />
  //     },
  //     {
  //       path: 'list/new-list',
  //       element: <AddnewListPage />
  //     },
  //     {
  //       path: 'list',
  //       element: <ListPage />
  //     },
  //     {
  //       path: 'list/:listName/details',
  //       element: <ListDetailPage />
  //     },
  //     // {
  //     //   path: '/auth/login',
  //     //   element: <Login />
  //     // }, 
  //   ]
  // }

  {
    path: '/',
    element: <PagesLayout  />,
    errorElement: <ErrorPage />,
    children: [ 
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'about',
        element: <AboutUs />
      },
      {
        path: 'contact-us',
        element: <ContactPage />
      },
      {
        path: 'features',
        element: <FeaturesPage />
      },
      {
        path: 'repair',
        element: <RepairService />
      },
      {
        path: 'search',
        element: <SearchResultsPage />
      },
      {
        path: 'product',
        element: <SearchResultsPage />
      },
      {
        path: 'product/:id/:slug',
        element: <VehicleDetailsPage />
      },
      {
        path: 'auth/register',
        element: <Register />
      },
      {
        path: 'auth/login',
        element: <LoginThree />
      },
    ]
  },
]);

export default router;