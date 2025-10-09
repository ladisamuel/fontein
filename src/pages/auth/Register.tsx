import React, { useState } from "react";
import { useFormik } from "formik";
import {
  loginUserValidation,
  registerUserValidation,
} from "../../utils/validation/validation";
import { loginUser, registerUser } from "../../utils/api/userAPI";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../../utils/atom/authAtom";

// Validation Schema

// Types
interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  password2: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const auth = useSetRecoilState(authState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    // Simulate API call
    await registerUser(values)
      .then((res) => {
        toast.success("User created successfully");
        auth(res?.data);
        navigate("/user/dashboard");
      })
      .catch((err) => {
        if (err) {
          toast.error("Account create failed");
        }
      });
    setIsLoading(false);
  };

  const initialValues: RegisterFormValues = {
    username: "",
    email: "",
    password: "",
    password2: "",
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
    validationSchema: registerUserValidation,
    onSubmit,
  });

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
                Register A New Account
              </h1>
            </div>

            {/* Form */}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Username <span className="text-sm text-red-500">*</span>
                  </label>

                  <input
                    name="username"
                    type="username"
                    value={values.username}
                    onBlur={handleBlur}
                    placeholder="Username"
                    onChange={handleChange}
                    // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2  outline-none focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />

                  {errors.username && touched.username && (
                    <p className="error text-sm text-red-400">{errors.username}</p>
                  )}
                </div>
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
                    <p className="error text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password <span className="text-sm text-red-500">*</span>
                  </label>

                  <input
                    name="password"
                    type="password"
                    value={values.password}
                    onBlur={handleBlur}
                    placeholder="********"
                    onChange={handleChange}
                    // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 outline-none focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />

                  {errors.password && touched.password && (
                    <p className="error text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Password2 Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Enter Password Again <span className="text-sm text-red-500">*</span>
                  </label>

                  <input
                    name="password2"
                    type="password2"
                    value={values.password2}
                    onBlur={handleBlur}
                    placeholder="********"
                    onChange={handleChange}
                    // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 outline-none focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />

                  {errors.password2 && touched.password2 && (
                    <p className="error text-sm text-red-400">
                      {errors.password2}
                    </p>
                  )}
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
              <span className="text-gray-600">You have an account? </span>
              <Link
                to="/auth/login"
                className="text-green-500 hover:text-green-600 font-medium transition-colors duration-200"
              >
                Login Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
