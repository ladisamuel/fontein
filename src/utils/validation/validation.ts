import * as yup from "yup";

const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const registerUserValidation = yup.object().shape({
    username: yup.string().required("Name is Required"),
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
    .required("Required"),
});




// Define the ForgotPassword validation schema
const forgotPasswordValidation = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
});


const repairVAlidation = yup.object().shape({
  full_name: yup.string().required('Please enter your name!'),
  email:  yup.string().email('Please enter a valid email.').required('Please enter your email!'),
  phone: yup.string().required('Please enter your phone number!'),
  contact_method:  yup.string().required('Required'),
  year: yup.string().required('Required'),
  make: yup.string().required('Required'),
  model: yup.string().required('Required'),
  license_plate: yup.string(),
  vin: yup.string(),
  mileage: yup.number(),
  transmission:  yup.string().required('Required'),
  request_type: yup.string().required('Required'),
  description: yup.string().required('Required'),
  // preferred_date: yup.string().required('Required'),
  preferred_date: yup.date().min(new Date(), "Date must be in the future").required("Preferred date is required"),
  preferred_time: yup.string(),
  service_method: yup.string().required('Required'),
  address: yup.string(),
  
})



// Define the login validation schema
const contactFormValidation = yup.object().shape({
  full_name: yup.string(),
  email: yup.string().email("Please enter a valid email").required("Required"),
  phone: yup.string().required("Required"),
  subject: yup.string(),
  message: yup.string().required("Required"),
});


export { 
    loginUserValidation,
    registerUserValidation,
    forgotPasswordValidation,

    repairVAlidation,
    contactFormValidation,
 };
