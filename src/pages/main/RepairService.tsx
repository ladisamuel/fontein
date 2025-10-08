import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
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
  MapPinX,
} from "lucide-react";
import Footer from "../../components/Footer";
import { repairVAlidation } from "../../utils/validation/validation";
import { toast } from "react-toastify";
import { createVehicleRepair, editVehicleRepair, getVehicleRepair } from "../../utils/api/products";
import { useRecoilState } from "recoil";
import { repairRequestState } from "../../utils/atom/repairAtom";
import { Dialog } from "primereact/dialog";

interface FormValues {
  full_name: string;
  email: string;
  phone: string;
  contact_method: "email" | "sms" | "call";
  year: string;
  make: string;
  model: string;
  license_plate: string;
  vin: string;
  mileage: number;
  transmission: "automatic" | "manual";
  request_type: "repair" | "maintenance" | "inspection";
  description: string;
  preferred_date: string;
  preferred_time: "morning" | "afternoon";
  service_method: "dropoff" | "tow" | "pickup";
  address: string;
}
 
const AutoTradePro: React.FC = () => {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [repairData, setRepairData] = useRecoilState(repairRequestState)
  const [requestStatus, setRequestStatus] = useState<string | null>(null);



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


  const request_type = [
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

  // const onSubmit = async (values: FormValues) => {
  const onSubmit = async () => {
    console.log("Form submitted:", {
      ...values,
      selectedPackages,
    });
    // sdsd
    // console.log('repairData', repairData)

    if (repairData) {
      // const payload = {...values, status: 'pending'}
      // console.log( payload)
      await editVehicleRepair(values, repairData?.id).then((res)=>{
        console.log(res)
        setRepairData(res.data)
        setRequestStatus('Updated')
        toast.success("Request submitted successfully!");
      }).catch(()=>{
        toast.success("Request failed!");
      })
      
    } else {
      await createVehicleRepair(values).then((res)=>{
        console.log(res)
        setRepairData(res.data)
        setRequestStatus('Created')
        toast.success("Request submitted successfully!");
      }).catch(()=>{
        toast.success("Request failed!");
      })
    }
  };
  const initialValues: FormValues = {
    full_name: repairData?.full_name ?? "",
    email: repairData?.email ?? "",
    phone: repairData?.phone ?? "",
    contact_method: repairData?.contact_method ?? "call",
    year: repairData?.year ?? "",
    make: repairData?.make ?? "",
    model: repairData?.model ?? "",
    license_plate: repairData?.license_plate ?? "",
    vin: repairData?.vin ?? "",
    mileage: repairData?.mileage ?? 0,
    transmission: repairData?.transmission ?? "automatic",
    request_type: repairData?.request_type ?? "repair",
    description: repairData?.description ?? "",
    preferred_date: repairData?.preferred_date ?? "",
    preferred_time: repairData?.preferred_time ?? "morning",
    service_method: repairData?.service_method ?? "dropoff",
    address: repairData?.address ?? "",
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
    validationSchema: repairVAlidation,
    onSubmit,
  });

  const getRepairData = async (id: any) => {
    await getVehicleRepair(id).then((res)=>{
      console.log(res)
    }).catch(err => {
      if (err.status === 404) {
        setRepairData(null)
      }

    })
  }
  useEffect(()=>{
    if (repairData?.id) {
      getRepairData(repairData.id)
    } 

  }, [])
  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <Dialog
      
        header={requestStatus === 'Created' ? "Repair Request Sent" : requestStatus === 'Updated' ? "Repair Request Updated" : ""  }
        visible={requestStatus !== null}
        className="p-2 min-h-[60vh] bg-white "
        style={{ width: "500px" }}
        onHide={() => {
          if (!requestStatus) return;
          setRequestStatus(null);
        }}>
          <div className="h-[50vh] flex flex-col items-center justify-center">

          <div className="py-10 h-fit text-center w-fit">
            <p>Thank you <span className='font-bold'>{values.full_name}</span> for your request.</p>
            <p>One of our correspondent will get back to you shortly</p>
          </div>
          </div>
          <button
          onClick={()=>setRequestStatus(null)} className='btn_primary m-3 px-5 py-2 text-white rounded-xl'>Proceed</button>

        </Dialog> 

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
              {
                repairData && (

                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <MapPinX className="w-5 h-5 text-green-600" />
                  </div>
                  <span className=" text-green-600">You already have a booking, </span>
                </h3>
                
                You can edit the form below to update your request.
              </div>
              )}
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
                      name="full_name"
                      value={values.full_name}
                      onBlur={handleBlur}
                      placeholder="Mark Clarke"
                      onChange={handleChange}
                      // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />

                    {errors.full_name && touched.full_name && (
                      <p className="error text-sm text-red-400">
                        {errors.full_name}
                      </p>
                    )}
                    {/* <Field
                          name="full_name"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="Enter your name"
                        />
                        <ErrorMessage
                          name="full_name"
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
                            name="contact_method"
                            type="radio"
                            onBlur={handleBlur}
                            placeholder="+234 705 190 0086"
                            // onChange={() => {
                            //   handleChange;
                            //   console.log(values.contact_method);
                            // }}
                            // className="hidden"
                            value={values.contact_method}
                            // value={values.contact_method}
                            // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                            // className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            className="sr-only"
                            required
                          />

                          {/* <Field
                                type="radio"
                                name="contact_method"
                                value={value}
                                className="sr-only"
                              /> */}
                          <div
                            className={`flex items-center justify-center space-x-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                              values.contact_method === value
                                ? "border-green-500 bg-blue-50 text-green-700"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => {
                              // Set the value manually when clicking the card
                              handleChange({
                                target: { name: "contact_method", value },
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
                      name="license_plate"
                      type="text"
                      value={values.license_plate}
                      onBlur={handleBlur}
                      placeholder="ABC-1234"
                      onChange={handleChange}
                      // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      
                    />

                    {errors.license_plate && touched.license_plate && (
                      <p className="error text-sm text-red-400">
                        {errors.license_plate}
                      </p>
                    )}
                    {/* <Field
                          name="license_plate"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="ABC-1234"
                        />
                        <ErrorMessage
                          name="license_plate"
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
                      type="number"
                      value={values.mileage}
                      onBlur={handleBlur}
                      placeholder="18,200"
                      onChange={handleChange}
                      // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      
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
                  {request_type.map(({ value, icon: Icon, label, desc }) => (
                    <label key={value} className="relative">
                      <input
                        name="request_type"
                        type="radio"
                        value={value}
                        onBlur={handleBlur}
                        onChange={() => {
                          // handleChange;
                          console.log(values.request_type);
                        }}
                        // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                        className=" sr-only"
                        // className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                      />

                      {errors.request_type && touched.request_type && (
                        <p className="error text-sm text-red-400">
                          {errors.request_type}
                        </p>
                      )}

                      {/* <Field
                            type="radio"
                            name="request_type"
                            value={value}
                            className="sr-only"
                          /> */}
                      <div
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          values.request_type === value
                            ? "border-green-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => {
                          // Set the value manually when clicking the card
                          handleChange({
                            target: { name: "request_type", value },
                          });
                        }}
                      >
                        <Icon
                          className={`w-8 h-8 mx-auto mb-3 ${
                            values.request_type === value
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
                    needed <span className="text-sm text-red-500">*</span>
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
                      name="preferred_date"
                      type="date"
                      value={values.preferred_date}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />

                    {errors.preferred_date && touched.preferred_date && (
                      <p className="error text-sm text-red-400">
                        {errors.preferred_date}
                      </p>
                    )}
                    {/* <Field
                          name="preferred_date"
                          type="date"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                        <ErrorMessage
                          name="preferred_date"
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
                            name="preferred_time"
                            type="radio"
                            value={values.preferred_time}
                            onBlur={handleBlur}
                            // onChange={handleChange}
                            // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                            // className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            className=" sr-only"
                            
                          />

                          {errors.preferred_time && touched.preferred_time && (
                            <p className="error text-sm text-red-400">
                              {errors.preferred_time}
                            </p>
                          )}
                          {/* <Field
                                type="radio"
                                name="preferred_time"
                                value={value}
                                className="sr-only"
                              /> */}
                          <div
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                              values.preferred_time === value
                                ? "border-green-500 bg-blue-50 text-green-700"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => {
                              handleChange({
                                target: { name: "preferred_time", value },
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
                      value: "dropoff",
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
                            name="service_method"
                            type="radio"
                            value={values.service_method}
                            onBlur={handleBlur}
                            // onChange={handleChange}
                            // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                            // className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            className=" sr-only"
                            required
                          />

                          {errors.service_method && touched.service_method && (
                            <p className="error text-sm text-red-400">
                              {errors.service_method}
                            </p>
                          )}
                      
                      {/* <Field
                            type="radio"
                            name="service_method"
                            value={value}
                            className="sr-only"
                          /> */}
                      <div
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          values.service_method === value
                            ? "border-green-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}

                        
                            onClick={() => {
                              handleChange({
                                target: { name: "service_method", value },
                              });
                            }}
                      >
                        <Icon
                          className={`w-8 h-8 mx-auto mb-3 ${
                            values.service_method === value
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

                {/* Address */}

                
                {(values.service_method === "tow" ||
                  values.service_method === "pickup") && ( 
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address (if pickup/tow)
                  </label>
                  <textarea
                    name="address"
                    rows={4}
                    value={values.address}
                    onBlur={handleBlur}
                    // placeholder="Please describe the symptoms or service you need..."
                    onChange={handleChange}
                    // className="pl-12 w-full py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-purple-100 focus:outline-none"
                    // className=" sr-only"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required={values.service_method === "tow" ||
                  values.service_method === "pickup"}
                  >
                    Enter address for pickup or delivery...
                  </textarea>

                  {errors.address && touched.address && (
                    <p className="error text-sm text-red-400">
                      {errors.address}
                    </p>
                  )} 
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
                      onClick={() => setSelectedPackages([pkg.id])}
                    >
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {pkg.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {pkg.description}
                        </p>
                        <div className="text-2xl font-bold text-green-600">
                          #{pkg.price}
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
                      {values.request_type || "Not selected"}
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
                      {values.preferred_date || "Not selected"}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">

                  <p className="text-xs text-gray-500 mt-2">
                    *Final pricing will be confirmed after inspection
                  </p>
                </div>
              {!isValid ? <p className="text-red-500 text-xs pb-2 text-center">Kindly upload all necessary information.</p>: ''}

                <button
                  type="submit"
                  className={` ${!isValid  ? 'cursor-no-drop bg-gray-400' : 'bg-gradient-to-r from-green-600 to-indigo-600 hover:scale-105'} w-full   text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-indigo-700 transition-all transform  shadow-lg`}
                // disabled
                // onClick={()=>{
                //   console.log({isValid, isSubmitting}, '\n', values);
                
                // }}
                // onClick={handleSubmit}
                disabled={!isValid || isSubmitting}
                >
                  Submit Request
                </button>

                {/* <button type="submit" 
                  onClick={handleSubmit}
                  className="primary__btn w-full"
                >
                  {isSubmitting && <i className="pi pi-spin pi-spinner"></i>}
                  Login
                </button> */}

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
