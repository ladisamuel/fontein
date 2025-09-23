import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { useFormik } from "formik";
// import * as Yup from "yup";
import {
  Car,
  Shield,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  Settings,
  Wrench,
  Search,
  Upload,
  Truck,
  Home,
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { repairVAlidation } from "../../utils/validation/validation";

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  contactMethod: "email" | "sms" | "call";
  year: string;
  make: string;
  model: string;
  licensePlate: string;
  vin: string;
  mileage: string;
  transmission: "automatic" | "manual";
  requestType: "repair" | "maintenance" | "inspection";
  description: string;
  preferredDate: string;
  preferredTime: "morning" | "afternoon";
  serviceMethod: "shop" | "tow" | "pickup";
  address: string;
}

// const validationSchema = Yup.object({
//   fullName: Yup.string().required("Full name is required"),
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   phone: Yup.string()
//     .matches(/^[\+]?[1-9][\d]{0,15}$/, "Invalid phone number")
//     .required("Phone number is required"),
//   contactMethod: Yup.string().required("Contact method is required"),
//   year: Yup.number()
//     .min(1900, "Year must be after 1900")
//     .max(new Date().getFullYear() + 1, "Invalid year")
//     .required("Year is required"),
//   make: Yup.string().required("Make is required"),
//   model: Yup.string().required("Model is required"),
//   licensePlate: Yup.string().required("License plate is required"),
//   mileage: Yup.number()
//     .min(0, "Mileage must be positive")
//     .required("Mileage is required"),
//   requestType: Yup.string().required("Request type is required"),
//   description: Yup.string().required("Service description is required"),
//   preferredDate: Yup.date().min(new Date(), "Date must be in the future").required("Preferred date is required"),
//   preferredTime: Yup.string().required("Preferred time is required"),
//   serviceMethod: Yup.string().required("Service method is required"),
// });

const AutoTradePro: React.FC = () => {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [estimatedTotal, setEstimatedTotal] = useState(0);

  const packages = [
    {
      id: "oil",
      name: "Oil & Filter Change",
      description: "Synthetic blend up to 5qts",
      price: 69,
    },
    {
      id: "brake",
      name: "Brake Pad Replacement",
      description: "Front axle",
      price: 249,
    },
    {
      id: "battery",
      name: "Battery Replacement",
      description: "Standard 12V",
      price: 179,
    },
  ];

  const togglePackage = (packageId: string, price: number) => {
    if (selectedPackages.includes(packageId)) {
      setSelectedPackages((prev) => prev.filter((id) => id !== packageId));
      setEstimatedTotal((prev) => prev - price);
    } else {
      setSelectedPackages((prev) => [...prev, packageId]);
      setEstimatedTotal((prev) => prev + price);
    }
  };

  const RequestType = [
    {
      value: "repair",
      icon: Wrench,
      label: "Repair",
      desc: "Fix issues",
    },
    {
      value: "maintenance",
      icon: Settings,
      label: "Maintenance",
      desc: "Regular service",
    },
    {
      value: "inspection",
      icon: Search,
      label: "Inspection",
      desc: "Check condition",
    },
  ];

  const onSubmit = (values: FormValues) => {
    console.log("Form submitted:", {
      ...values,
      selectedPackages,
      estimatedTotal,
    });

    alert("Request submitted successfully!");
  };
  const initialValues: FormValues = {
    fullName: "",
    email: "",
    phone: "",
    contactMethod: "email",
    year: "",
    make: "",
    model: "",
    licensePlate: "",
    vin: "",
    mileage: "",
    transmission: "automatic",
    requestType: "repair",
    description: "",
    preferredDate: "",
    preferredTime: "morning",
    serviceMethod: "shop",
    address: "",
  };

  const {
    values,
    errors,
    // isValid,
    // isSubmitting,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    validateOnMount: true,
    initialValues: initialValues,
    validationSchema: repairVAlidation,
    onSubmit,
  });

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="">
        <Header />
      </div>

      {/* Hero Section */}
      <div
        style={{
          backgroundBlendMode: "multiply",
        }}
        className="bg-[#00000096] main_padding mt-[12vh] bg-gradient-to-r from-green-600 to-purple-600 text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                Request Maintenance or Repair
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                No account needed. Tell us about your vehicle and the issue,
                pick a preferred time, and we'll confirm your booking by email
                or SMS.
              </p>
              <div className="flex items-center space-x-3 text-blue-100">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Secure & Private</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center space-x-2 bg-green-500 px-4 py-2 rounded-full text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>REGISTERED</span>
                  </div>
                  <div className="mt-2 text-sm">
                    DMV 2023415 • STATE NEW YORK
                  </div>
                  <div className="text-2xl font-bold mt-2">MOTOR VEHICLE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto main_padding px-4 sm:px-6 lg:px-8 py-12">
        {/* <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        > 
          {({ values, setFieldValue }) => (
            
        //   )}
        // </Formik>
            */}

        <form onSubmit={handleSubmit} className="space-y-8">
        {/* <form className="space-y-8"> */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Details */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Your Details</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-sm text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={values.fullName}
                      onBlur={handleBlur}
                      placeholder="Mark Clarke"
                      onChange={handleChange}
                      // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />

                    {errors.fullName && touched.fullName && (
                      <p className="error text-sm text-red-400">
                        {errors.fullName}
                      </p>
                    )}
                    {/* <Field
                          name="fullName"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="Enter your name"
                        />
                        <ErrorMessage
                          name="fullName"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        /> */}
                  </div>

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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />

                    {errors.email && touched.email && (
                      <p className="error text-sm text-red-400">
                        {errors.email}
                      </p>
                    )}
                    {/* <Field
                          name="email"
                          type="email"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="name@email.com"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        /> */}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      name="phone"
                      type="phone"
                      value={values.phone}
                      onBlur={handleBlur}
                      placeholder="+234 705 190 0086"
                      onChange={handleChange}
                      // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />

                    {errors.phone && touched.phone && (
                      <p className="error text-sm text-red-400">
                        {errors.phone}
                      </p>
                    )}
                    {/* <Field
                          name="phone"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="(555) 000-0000"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        /> */}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Contact
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "email", icon: Mail, label: "Email" },
                        { value: "sms", icon: Phone, label: "SMS" },
                        { value: "call", icon: Phone, label: "Call" },
                      ].map(({ value, icon: Icon, label }) => (
                        <label key={value} className="relative">
                          <input
                            name="contactMethod"
                            type="radio"
                            onBlur={handleBlur}
                            placeholder="+234 705 190 0086"
                            // onChange={() => {
                            //   handleChange;
                            //   console.log(values.contactMethod);
                            // }}
                            // className="hidden"
                            value={values.contactMethod}
                            // value={values.contactMethod}
                            // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                            // className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            className="sr-only"
                            required
                          />

                          {/* <Field
                                type="radio"
                                name="contactMethod"
                                value={value}
                                className="sr-only"
                              /> */}
                          <div
                            className={`flex items-center justify-center space-x-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                              values.contactMethod === value
                                ? "border-green-500 bg-blue-50 text-green-700"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => {
                              // Set the value manually when clicking the card
                              handleChange({
                                target: { name: "contactMethod", value },
                              });
                            }}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <Car className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span>Vehicle Information</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Year <span className="text-sm text-red-500">*</span>
                    </label>
                    <input
                      name="year"
                      type="text"
                      value={values.year}
                      onBlur={handleBlur}
                      placeholder="e.g., 2021"
                      onChange={handleChange}
                      // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />

                    {errors.year && touched.year && (
                      <p className="error text-sm text-red-400">
                        {errors.year}
                      </p>
                    )}
                    {/* 
                    <Field
                          name="year"
                          type="number"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="e.g., 2021"
                        />
                        <ErrorMessage
                          name="year"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        /> */}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Make <span className="text-sm text-red-500">*</span>
                    </label>

                    <input
                      name="make"
                      type="text"
                      value={values.make}
                      onBlur={handleBlur}
                      placeholder="Toyota, BMW, Ford..."
                      onChange={handleChange}
                      // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />

                    {errors.make && touched.make && (
                      <p className="error text-sm text-red-400">
                        {errors.make}
                      </p>
                    )}
                    {/* <Field
                          name="make"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="Toyota, BMW, Ford..."
                        />
                        <ErrorMessage
                          name="make"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        /> */}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Model <span className="text-sm text-red-500">*</span>
                    </label>
                    <input
                      name="model"
                      type="text"
                      value={values.model}
                      onBlur={handleBlur}
                      placeholder="Camry, X5, F-150..."
                      onChange={handleChange}
                      // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />

                    {errors.model && touched.model && (
                      <p className="error text-sm text-red-400">
                        {errors.model}
                      </p>
                    )}
                    {/* <Field
                          name="model"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="Camry, X5, F-150..."
                        />
                        <ErrorMessage
                          name="model"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        /> */}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      License Plate (optional)
                    </label>
                    <input
                      name="licensePlate"
                      type="text"
                      value={values.licensePlate}
                      onBlur={handleBlur}
                      placeholder="ABC-1234"
                      onChange={handleChange}
                      // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />

                    {errors.licensePlate && touched.licensePlate && (
                      <p className="error text-sm text-red-400">
                        {errors.licensePlate}
                      </p>
                    )}
                    {/* <Field
                          name="licensePlate"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="ABC-1234"
                        />
                        <ErrorMessage
                          name="licensePlate"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        /> */}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      VIN (optional)
                    </label>
                    <input
                      name="vin"
                      type="text"
                      value={values.vin}
                      onBlur={handleBlur}
                      placeholder="17 characters"
                      onChange={handleChange}
                      // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />

                    {errors.vin && touched.vin && (
                      <p className="error text-sm text-red-400">{errors.vin}</p>
                    )}
                    {/* <Field
                          name="vin"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="17 characters"
                        /> */}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mileage (optional)
                    </label>
                    <input
                      name="mileage"
                      type="text"
                      value={values.mileage}
                      onBlur={handleBlur}
                      placeholder="18,200"
                      onChange={handleChange}
                      // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />

                    {errors.mileage && touched.mileage && (
                      <p className="error text-sm text-red-400">
                        {errors.mileage}
                      </p>
                    )}
                    {/* <Field
                          name="mileage"
                          type="number"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="18,200"
                        />
                        <ErrorMessage
                          name="mileage"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        /> */}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Transmission <span className="text-sm text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: "automatic", label: "Automatic" },
                      { value: "manual", label: "Manual" },
                    ].map(({ value, label }) => (
                      <label key={value} className="relative">
                        <input
                          name="transmission"
                          type="radio"
                          value={value}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                          className=" sr-only"
                          // className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          required
                        />

                        {errors.transmission && touched.transmission && (
                          <p className="error text-sm text-red-400">
                            {errors.transmission}
                          </p>
                        )}

                        {/* <Field
                              name="transmission"
                              type="radio"
                              value={value}
                              className="sr-only"
                            /> */}
                        <div
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                            values.transmission === value
                              ? "border-green-500 bg-blue-50 text-green-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => {
                            // Set the value manually when clicking the card
                            handleChange({
                              target: { name: "transmission", value },
                            });
                          }}
                        >
                          <span className="font-medium">{label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload photos (optional)</span>
                  </button>
                </div>
              </div>

              {/* Request Type */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Settings className="w-5 h-5 text-purple-600" />
                  </div>
                  <span>Request Type</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {RequestType.map(({ value, icon: Icon, label, desc }) => (
                    <label key={value} className="relative">
                      <input
                        name="requestType"
                        type="radio"
                        value={value}
                        onBlur={handleBlur}
                        onChange={() => {
                          // handleChange;
                          console.log(values.requestType);
                        }}
                        // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                        className=" sr-only"
                        // className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                      />

                      {errors.requestType && touched.requestType && (
                        <p className="error text-sm text-red-400">
                          {errors.requestType}
                        </p>
                      )}

                      {/* <Field
                            type="radio"
                            name="requestType"
                            value={value}
                            className="sr-only"
                          /> */}
                      <div
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          values.requestType === value
                            ? "border-green-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => {
                          // Set the value manually when clicking the card
                          handleChange({
                            target: { name: "requestType", value },
                          });
                        }}
                      >
                        <Icon
                          className={`w-8 h-8 mx-auto mb-3 ${
                            values.requestType === value
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        />
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">
                            {label}
                          </div>
                          <div className="text-sm text-gray-500">{desc}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Describe the issue, noises, warning lights, or service
                    needed
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={values.description}
                    onBlur={handleBlur}
                    // placeholder="Please describe the symptoms or service you need..."
                    onChange={handleChange}
                    // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                    // className=" sr-only"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  >
                    Please describe the symptoms or service you need...
                  </textarea>

                  {errors.description && touched.description && (
                    <p className="error text-sm text-red-400">
                      {errors.description}
                    </p>
                  )}
                  {/* <Field
                        as="textarea"
                        name="description"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Please describe the symptoms or service you need..."
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      /> */}
                </div>
              </div>

              {/* Scheduling */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Preferred Schedule</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Date
                    </label>
                    <input
                      name="preferredDate"
                      type="date"
                      value={values.preferredDate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />

                    {errors.preferredDate && touched.preferredDate && (
                      <p className="error text-sm text-red-400">
                        {errors.preferredDate}
                      </p>
                    )}
                    {/* <Field
                          name="preferredDate"
                          type="date"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                        <ErrorMessage
                          name="preferredDate"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        /> */}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Time
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: "morning", label: "Morning" },
                        { value: "afternoon", label: "Afternoon" },
                      ].map(({ value, label }) => (
                        <label key={value} className="relative">
                          <input
                            name="preferredTime"
                            type="radio"
                            value={values.preferredTime}
                            onBlur={handleBlur}
                            // onChange={handleChange}
                            // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                            // className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            className=" sr-only"
                            required
                          />

                          {errors.preferredTime && touched.preferredTime && (
                            <p className="error text-sm text-red-400">
                              {errors.preferredTime}
                            </p>
                          )}
                          {/* <Field
                                type="radio"
                                name="preferredTime"
                                value={value}
                                className="sr-only"
                              /> */}
                          <div
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                              values.preferredTime === value
                                ? "border-green-500 bg-blue-50 text-green-700"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => {
                              handleChange({
                                target: { name: "preferredTime", value },
                              });
                            }}
                          >
                            <Clock className="w-5 h-5 mx-auto mb-2" />
                            <span className="font-medium">{label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Method */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <span>Service Method</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    {
                      value: "shop",
                      icon: Home,
                      label: "Shop Drop-off",
                      desc: "Bring to our location",
                    },
                    {
                      value: "tow",
                      icon: Truck,
                      label: "Tow",
                      desc: "We pick up your vehicle",
                    },
                    {
                      value: "pickup",
                      icon: MapPin,
                      label: "Pickup & Delivery",
                      desc: "We come to you",
                    },
                  ].map(({ value, icon: Icon, label, desc }) => (
                    <label key={value} className="relative">
                      
                      <input
                            name="serviceMethod"
                            type="radio"
                            value={values.serviceMethod}
                            onBlur={handleBlur}
                            // onChange={handleChange}
                            // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                            // className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            className=" sr-only"
                            required
                          />

                          {errors.serviceMethod && touched.serviceMethod && (
                            <p className="error text-sm text-red-400">
                              {errors.serviceMethod}
                            </p>
                          )}
                      
                      {/* <Field
                            type="radio"
                            name="serviceMethod"
                            value={value}
                            className="sr-only"
                          /> */}
                      <div
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          values.serviceMethod === value
                            ? "border-green-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}

                        
                            onClick={() => {
                              handleChange({
                                target: { name: "serviceMethod", value },
                              });
                            }}
                      >
                        <Icon
                          className={`w-8 h-8 mx-auto mb-3 ${
                            values.serviceMethod === value
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        />
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">
                            {label}
                          </div>
                          <div className="text-sm text-gray-500">{desc}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {(values.serviceMethod === "tow" ||
                  values.serviceMethod === "pickup") && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address (if pickup/tow)
                    </label>
                    {/* <Field
                          name="address"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="Street, City, ZIP"
                        /> */}
                  </div>
                )}
              </div>

              {/* Service Packages */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Common Service Packages
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedPackages.includes(pkg.id)
                          ? "border-green-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => togglePackage(pkg.id, pkg.price)}
                    >
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {pkg.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {pkg.description}
                        </p>
                        <div className="text-2xl font-bold text-green-600">
                          ${pkg.price}
                        </div>
                        <button
                          type="button"
                          className={`mt-4 w-full py-2 px-4 rounded-lg font-medium transition-all ${
                            selectedPackages.includes(pkg.id)
                              ? "bg-green-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {selectedPackages.includes(pkg.id) ? "Added" : "Add"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Estimate Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Type:</span>
                    <span className="font-medium capitalize">
                      {values.requestType || "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Vehicle:</span>
                    <span className="font-medium">
                      {values.year && values.make && values.model
                        ? `${values.year} ${values.make} ${values.model}`
                        : "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Preferred Date:</span>
                    <span className="font-medium">
                      {values.preferredDate || "Not selected"}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Estimated Total:</span>
                    <span className="text-green-600">
                      ${estimatedTotal.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    *Final pricing confirmed after inspection
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Submit Request
                </button>

                {/* <div className="mt-6 space-y-3 text-sm text-gray-600">
                      <div className="flex items-start space-x-2">
                        <Check */}

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      You'll receive a confirmation link to complete booking
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Your data is used only to process this request</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full mt-4 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-all"
                >
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AutoTradePro;
