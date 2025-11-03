import React, { useState } from "react";
import {
  Mail,
  ArrowRight,
  AlertCircle,
  ArrowLeft,
  Key,
} from "lucide-react";
import { forgotPasswordValidation } from "../../utils/validation/validation";
import { useFormik } from "formik";
import { resetPassword } from "../../utils/api/userAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface resetPasswordFormInterface {
  email: string;
}
const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (value: resetPasswordFormInterface) => {
    setIsLoading(true);
    // Simulate API call
    await resetPassword(value).then((res) => {
      console.log("res in reset password", res);
      
      if (res.status === 200){
        toast.success('A recovery email has been sent to you.')
        navigate(`/auth/change-password/${res?.data?.uid}/${res?.data?.token}`);
      }
    });

    setIsLoading(false);
  };

  const initialValues: resetPasswordFormInterface = {
    email: "",
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
    validationSchema: forgotPasswordValidation,
    onSubmit,
  });
  return (
    <div className="pt-[12vh] bg-gradient-to-br from-green-50 via-white to-purple-50">
      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Key className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Forgot Password?
              </h1>
              <p className="text-gray-600">
                No worries, we'll send you reset instructions.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && touched.email && (
                  <div className="flex items-center gap-2 mt-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />

                    <p className="error text-sm text-red-500">{errors.email}</p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                    disabled={!isValid || isLoading || isSubmitting}

                className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {isLoading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="w-full flex items-center justify-center space-x-2 mt-4 py-3 text-gray-600 hover:text-gray-900 font-medium transition"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Login</span>
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Need help?{" "}
              <a
                href="#"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
