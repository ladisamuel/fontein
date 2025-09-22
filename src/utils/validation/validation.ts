import * as yup from "yup";

const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const registerUserValidation = yup.object().shape({
    fullName: yup.string().required("Name is Required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is Required"),
    password: yup
      .string()
      .min(5)
      .max(25)
      .matches(passwordRule, "Password must contain at least one number, one lowercase letter, and one uppercase letter")
      .required("Password is Required"),
    password2: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Required"),
  }).strict(true);

// Define the login validation schema
const loginUserValidation = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .max(25)
    .matches(passwordRule, "Password must contain at least one number, one lowercase letter, and one uppercase letter")
    .required("Required"),
});


// Define the ForgotPassword validation schema
const forgotPasswordValidation = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
});


const repairVAlidation = yup.object().shape({
  fullName: yup.string().required('Please enter your name!'),
  email:  yup.string().email('Please enter a valid email.').required('Please enter your name!'),
  phone: yup.string().required('Please enter your phone number!'),
  contactMethod:  yup.string().required('Required'),
  year: yup.string().required('Required'),
  make: yup.string().required('Required'),
  model: yup.string().required('Required'),
  licensePlate: yup.string(),
  vin: yup.string(),
  mileage: yup.string(),
  transmission:  yup.string().required('Required'),
  requestType: yup.string().required('Required'),
  description: yup.string().required('Required'),
  // preferredDate: yup.string().required('Required'),
  preferredDate: yup.date().min(new Date(), "Date must be in the future").required("Preferred date is required"),
  preferredTime: yup.string(),
  serviceMethod: yup.string().required('Required'),
  address: yup.string().required('Required'),
  
})


export { 
    loginUserValidation,
    registerUserValidation,
    forgotPasswordValidation,

    repairVAlidation,
 };
