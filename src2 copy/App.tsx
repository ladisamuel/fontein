import './App.css'
import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

function App() {

  return (
      <RecoilRoot>

        <ToastContainer 
        
        position="top-right"
        />
        <RouterProvider router={router} />
      </RecoilRoot>
  )
}

export default App
