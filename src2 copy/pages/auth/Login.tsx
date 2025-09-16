// src/components/Login.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Key, LoaderCircle } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    

console.log('In Login page');
      
  // const navigate = useNavigate();

//   const [values, setValues] = useState<FormValues>({
//     email: '',
//     password: ''
//   });
//   
//   const [errors, setErrors] = useState<Partial<FormValues>>({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setValues(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Simple validation
//     const newErrors: Partial<FormValues> = {};
//     if (!values.email) newErrors.email = 'Email is required';
//     if (!values.password) newErrors.password = 'Password is required';
    
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }
    
//     // Simulate login success
//     localStorage.setItem('authToken', 'sample-token');
//     navigate('/dashboard');
//   };


  // const onSubmit = (values: FormData) => {
  //   console.log('Form submitted:', values);
  //   // Add your form submission logic here
  // };

  

  // const initialValues: FormData = {
  //   email: "",
  //   password: "",
  // };

  
  // const {
  //   values,
  //   errors,
  //   isValid,
  //   isSubmitting,
  //   touched,
  //   handleBlur,
  //   handleChange,
  //   handleSubmit,
  // } = useFormik({
  //   validateOnMount: true,
  //   initialValues: initialValues,
  //   validationSchema: loginUserValidation,
  //   onSubmit 
  // });

  return (
      <div className="w-full md:w-[60%] min-h-[100vh] flex items-center justify-center px-6 py-8">
        {/* Right side - Form container */}
      <div className="w-full max-w-md">
        <div className="text-center mb-15">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h1>
          <p className="text-gray-600">Sign in to continue using our service</p>
        </div>
        
        <form 
        className="space-y-6">
            
            {/* Email Address Field */}
            <div>
                <div className="relative h-12 mb-2 ">
                    {/* <label className={`block absolute ${values.email.length == 0 ?'top-0 ml-15':'bottom-full'} ease-in-out text-xs font-bold text-gray-500 uppercase mb-1`}>Email Address</label> */}
                    <div className="absolute left-0 flex justify-center items-center rounded-2xl bg-orange-100 h-12 w-12 mr-3">
                        <Mail size={20} className="text-orange-500 " />
                    </div>
                    <input
                    type="email"
                    name="email"
                    placeholder=''                  
                    className="absolute top-0 left-15 h-12 w-[85%] border-gray-100 border-b py-3 focus:ring-2 focus:ring-orange-100 focus:outline-none"
                    required
                    />
                </div>
            </div>
           
          {/* Password Field */}
          <div>

            {/* <label className="block text-xs font-medium text-gray-700 uppercase mb-1">Password</label> */}
            <div className="relative h-12 mb-2 mt-10 ">
                {/* <label className={`block absolute ${values.password.length == 0 ?'top-0 ml-15':'bottom-full'} ease-in-out text-xs font-bold text-gray-500 uppercase mb-1`}>Password</label> */}
                            
              <div onClick={() => setPasswordVisible(!passwordVisible)} className="absolute left-0 flex justify-center items-center rounded-2xl bg-orange-100 h-12 w-12 mr-3 cursor-pointer">
                {
                  passwordVisible ?
                  <Key size={20} className="text-orange-500" /> 
                  :
                  <Lock size={20} className="text-orange-500" /> 
                }
              </div>
              <input
                type={passwordVisible ? 'text' : 'password'} 
                name="password"
                placeholder=''
                className="absolute top-0 left-15 h-12 w-[85%] border-gray-100 border-b py-3  focus:ring-orange-100 focus:outline-none"
                required
              /> 
            </div>
            
          </div>
           

          <button
                type="submit"
                // onClick={handleSubmit}
                className=" secondary-btn-red flex gap-3 items-center justify-center"
              >
                Sign in
              </button>
        </form>


        {/* Forgot password Link */}
        <div className="text-center mt-3">
          <p className="text-gray-600">
            <Link to="/auth/forgotpassword" className="text-orange-500 hover:text-orange-600 text-sm">
            Forgot Password?
            </Link>
          </p>
        </div>
        
        {/* Sign Up Link */}
        <div className="text-center ">
          <small className="text-gray-600">
            Don't have an account? 
            <Link to="/auth/register" className="text-orange-500 hover:text-orange-600 ml-1 font-medium">
              Create an account
            </Link>
          </small>
        </div>
        
      </div>
    </div>
  );
};

export default Login;