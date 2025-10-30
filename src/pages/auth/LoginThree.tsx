import React, { useState } from "react";
import { useFormik } from "formik";
import { loginUserValidation } from "../../utils/validation/validation";
import { loginUser } from "../../utils/api/userAPI";
import { toast } from "react-toastify"; 
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../../utils/atom/authAtom";


// Validation Schema

// Types
interface LoginFormValues {
  email: string;
  password: string;
}

const LoginThree: React.FC = () => {
  const navigate = useNavigate()
  const auth = useSetRecoilState(authState)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pass_visible, setPass_visible] = useState<boolean>(false);




  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    // Simulate API call
    await loginUser(values).then((res)=>{
      console.log('res in login', res.data )
        toast.success('Login successfully')
        auth(res?.data)
        navigate('/user/dashboard')
    }).catch((err)=>{
      if (err) {
        toast.error('Login failed')
      }
    })
    console.log("Login submitted:", values);
    setIsLoading(false);
  };


  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

   

    const {
      values,
      errors,
      isValid,
      isSubmitting,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
    } = useFormik({
      validateOnMount: true,
      initialValues: initialValues,
      validationSchema: loginUserValidation,
      onSubmit,
    });

  //   /**
  //       <nav className="bg-white shadow-sm">
  //         <div className="max-w-7xl mx-auto main_padding">
  //           <div className="flex justify-between items-center h-16">
  //             {/* Logo */}
  //             <div className="text-xl font-semibold text-gray-900">
  //               Fontein Resource Trade
  //             </div>

  //             {/* Navigation Links */}
  //             <div className="hidden md:flex items-center space-x-8">
  //               <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
  //                 Home
  //               </a>
  //               <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
  //                 About
  //               </a>
  //               <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
  //                 Features
  //               </a>
  //               <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
  //                 Contact Us
  //               </a>
  //             </div>

  //             {/* Auth Buttons */}
  //             <div className="flex items-center space-x-4">
  //               <button className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
  //                 Login
  //               </button>
  //               <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
  //                 Register
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </nav>

  return (
    <div className="min-h-screen mt-[12vh] w-full bg-gray-50 flex flex-col">
      {/* Navigation */}
 

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 text-center">
                Login to your account
              </h1>
            </div>

            {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-8">
                
                <div className="space-y-6">

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-sm text-red-500">*</span>
                    </label>

                    <input
                      name="email"
                      type="email"
                      value={values.email}
                      onBlur={handleBlur}
                      placeholder="name@email.com"
                      onChange={handleChange}
                      // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2  outline-none focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />

                    {errors.email && touched.email && (
                      <p className="error text-sm text-red-400">
                        {errors.email}
                      </p>
                    )}  
                  </div>
                  
                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password <span className="text-sm text-red-500">*</span>
                    </label>
                    <div className=" relative">
                      <i onClick={()=>setPass_visible(!pass_visible)} className={`pi ${pass_visible ? 'pi-eye-slash': 'pi-eye'} absolute right-0 top-1/2 -translate-y-1/2 text-2xl text-gray-400 p-3 rounded-xl bg-gray-100 cursor-pointer `}></i>
                    <input
                      name="password"
                      type={pass_visible ? "text" : "password"}
                      value={values.password}
                      onBlur={handleBlur}
                      placeholder="********"
                      onChange={handleChange}
                      // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 outline-none focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />
                    </div>

                    {errors.password && touched.password && (
                      <p className="error text-sm text-red-400">
                        {errors.password}
                      </p>
                    )}  
                  </div>

                   
                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <Link
                      to="/auth/forgot-password"
                      className="text-green-500 hover:text-green-600 text-sm transition-colors duration-200"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={!isValid || isLoading || isSubmitting}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>                 

            {/* Register Link */}
            <div className="mt-8 text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                to="/auth/register"
                className="text-green-500 hover:text-green-600 font-medium transition-colors duration-200"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default LoginThree;
