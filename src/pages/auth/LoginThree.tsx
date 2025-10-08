import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


// Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// Types
interface LoginFormValues {
  email: string;
  password: string;
}

const LoginThree: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValues: LoginFormValues = {
    email: "samuel.ladi2014@gmail.com",
    password: "",
  };

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Login submitted:", values);
    setIsLoading(false);
  };

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
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isValid, handleSubmit: formikSubmit }) => (
                <div className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className={`w-full px-3 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-200 ${
                        errors.email && touched.email
                          ? "ring-2 ring-red-500 bg-red-50"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••••••"
                      className={`w-full px-3 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-200 ${
                        errors.password && touched.password
                          ? "ring-2 ring-red-500 bg-red-50"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <a
                      href="#"
                      className="text-green-500 hover:text-green-600 text-sm transition-colors duration-200"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Login Button */}
                  <button
                    type="button"
                    onClick={() => formikSubmit()}
                    disabled={!isValid || isLoading}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              )}
            </Formik>

            {/* Register Link */}
            <div className="mt-8 text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <a
                href="#"
                className="text-green-500 hover:text-green-600 font-medium transition-colors duration-200"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default LoginThree;
