// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import ErrorPage from '../pages/response/ErrorPage'; 
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import LoginTwo from '../pages/auth/LoginTwo';


const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
 
      {
        path: '/',
        element: <LoginTwo />
      },
      {
        path: 'auth/register',
        element: <Register />
      },
      {
        path: 'auth/login',
        element: <LoginTwo />
      },
      {
        path: 'auth/user-login',
        element: <Login />
      },
      {
        path: 'auth/forgotpassword',
        element: <ForgotPassword />
      }, 
    ]
  },
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
]);

export default router;