import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { forgotPasswordValidation } from '../../utils/validation/validation';
import { useFormik } from 'formik';


interface FormData {
  email: string
}
export default function ForgotPassword() {
  // const [email, setEmail] = useState('markclarke@gmail.com');
  
  const onSubmit = (values: FormData) => {
    console.log('Password reset requested for:', values.email);
  };

  const initialValues: FormData = {
    email: ''
  }

  const {
    values,
    errors,
    isValid,
    isValidating,
    isSubmitting,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    validateOnMount: true,
    initialValues: initialValues,
    validationSchema: forgotPasswordValidation,
    onSubmit 
  });
  
  return (
    
    <div className="w-full min-h-[100vh] md:w-[60%] flex items-center justify-center px-6 py-8">
    {/* Right side - Form container */}
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot password?</h1>
          <p className="text-gray-600">Please enter your email address to continue</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-700 uppercase mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail size={20} className="text-red-500" />
              </div>
              <input
                name='email'
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            {errors.email && touched.email && (
                  <p className="error text-sm text-red-400">
                    {errors.email} 
                  </p>
                )}
          </div>
          
          {/* Continue Button */}
          <button 
            type="submit"
            disabled={!isValid || isValidating || isSubmitting}
            className="secondary-btn-red"
          >
            Continue
          </button>
        </form>


        {/* Forgot password Link */}
        <div className="text-center mt-3">
          <p className="text-gray-600">
            <Link to="/auth/user-login" className="text-orange-500 hover:text-orange-600 text-sm">
            Proceed to login Here..
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}