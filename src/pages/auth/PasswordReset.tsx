import React, { useState } from "react";
import { Lock, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import { resetPasswordValidation } from "../../utils/validation/validation";
import { setNewPassword } from "../../utils/api/userAPI";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface resetPasswordFormInterface {
  password: string;
  password2: string;
}

const ResetPasswordPage: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const onSubmit = async (values: resetPasswordFormInterface) => {
    setIsLoading(true);

    const payload = {
      new_password: values.password,
      uid: params.uid,
      token: params.token,
    }

    await setNewPassword(payload).then(res=>{
      console.log('res in set new password', res)
      if (res.status === 200) {
        toast.success('Password has been reset successfully')
        navigate('/auth/reset-password-success')
      } else {
        toast.error('Failed to reset password')
      }
    }).then((errr)=>{
      console.log('res in set new password', errr)
        toast.error('Failed to reset password')
    })
    setIsLoading(false);
    
  };

  const initialValues: resetPasswordFormInterface = {
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
    validationSchema: resetPasswordValidation,
    onSubmit,
  });

  return (
    <div className="min-h-screen mt-[12vh] bg-gradient-to-br from-green-50 via-white to-purple-50">
      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Lock className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Set New Password
              </h1>
              <p className="text-gray-600">
                Your new password must be different from previously used
                passwords.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {errors.password && touched.password && (
                  <div className="flex items-center gap-2 mt-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />

                    <p className="error text-sm text-red-500">
                      {errors.password}
                    </p>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name='password2'
                    value={values.password2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                
                {errors.password2 && touched.password2 && (
                  <div className="flex items-center gap-2 mt-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />

                    <p className="error text-sm text-red-500">
                      {errors.password2}
                    </p>
                  </div>
                )}
              </div>

              <button
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {isLoading ? (
                  <span>Resetting...</span>
                ) : (
                  <>
                    <span>Reset Password</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
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

export default ResetPasswordPage;
