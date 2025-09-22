// VehicleDetailsPage.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  FaCar,
  FaGasPump,
  FaTachometerAlt,
  FaCog,
  FaPaintRoller,
  FaShieldAlt,
} from "react-icons/fa";
import Header from "../../components/Header";
import { Link, useParams } from "react-router-dom";
import { createAVehicleEnquiry, getAVehicle, searchVehiclesAPI } from "../../utils/api/products";
import type { Vehicles } from "../../utils/type/vehicle";
import Footer from "../../components/Footer";
import { Galleria } from "primereact/galleria";
import { Dialog } from "primereact/dialog";

const VehicleDetailsPage = () => {
  const galleria: any = useRef(null);
  const [carItem, setCarItem] = useState<Vehicles>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [otherVehicles, setOtherVehicles] = useState<Vehicles[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [inquiry, setInquiry] = useState<any>({});
  const [loading, setLoading] = useState<any>({})

  const params = useParams();
  // const id = params.slug?.split("-")[0];

  const id = params.id;

  const getCar = () => {
    const imageArray: any = [];

    getAVehicle(id).then((res) => {
      // console.log(res?.data);
      setCarItem(res.data);

      res?.data?.images.forEach((item: any) => {
        imageArray.push(item?.image);
      });
      searchVehicles(res?.data?.make);
    });
  };

  const searchVehicles = async (make?: string) => {
    // setLoading(true);

    await searchVehiclesAPI(`make=${make}`, 1, 5).then((res) => {
      // console.log(res?.data);
      setOtherVehicles(res?.data?.results);
    });

    // setLoading(false);
  };

  const updateRememberMe = () => {
    if (inquiry["delivery_option"] && inquiry["delivery_option"] === true) {
      setInquiry({ ...inquiry, delivery_option: false });
    } else {
      setInquiry({ ...inquiry, delivery_option: true });
    }
  };

  const submitEnquiry = async () => {
    setLoading({...loading, submitEnquiry: true})
    console.log(inquiry);
    const payload = {
      ...inquiry,
      vehicle: id,
    }

    // console.log(payload);
    // setTimeout(() => {
    //   console.log(payload);
    // }, 5000);
    // console.log('after settime out');
    
    await createAVehicleEnquiry(payload).then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
      setLoading({...loading, submitEnquiry: false})
  };

  useEffect(() => {
    getCar();
  }, []);

  const itemTemplate = (item: any) => {
    return (
      <div className="mb-5 transition-all rounded-lg overflow-hidden text-white">
        <img
          src={`https://res.cloudinary.com/drrgthsy5/${item.image}`}
          alt={item.alt}
          style={{ width: "100%", display: "block" }}
        />
      </div>
    );
  };

  const thumbnailTemplate = (item: any) => {
    console.log("item thumbanil", item);
    return (
      <div className="  h-[70px] overflow-hidden">
        <img
          src={`https://res.cloudinary.com/drrgthsy5/${item.image}`}
          alt={item.alt}
          style={{ display: "block" }}
        />
      </div>
    );
  };

  // const images = [img1, img2, img3, img4];
  return (
    <div className="min-h-screen mt-[12vh] bg-gray-100">
      {/* Enquiry form */}
      <Dialog
        header="Process Payment"
        visible={visible}
        className="p-2 min-h-[70vh] bg-white"
        style={{ width: "500px" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className=" pb-14">
          <div className="flex flex-col gap-3 text-xs bg-gray-200  my-2 rounded-lg p-3 text-gray-700">
            <p className="">
              Your information is safe with us. We will only use your details to
              contact you about this vehicle and will never share your data
              without consent.
            </p>
            <p>
              One of our team members will contact you shortly to confirm
              availability and guide you through the next steps.
            </p>
            <p>
              Your information will only be used to assist with this inquiry.
            </p>
          </div>
          <div className="p-3">
            {loading?.submitEnquiry ? 
            <div className="">
              <div className="w-full h-[200px] flex items-center justify-center">
                <i className="pi pi-spinner pi-spin text-6xl text-green-600 "></i>
              </div>
            </div>
            : 
            <div className="transition-all ease-in-out duration-300">
              {/* <input type="text" placeholder="Enter your name:" />
              <input type="text" placeholder="Enter your email:" />
              <input type="text" placeholder="Enter your phone number:" /> */}

              <div>
                <div className="relative flex flex-col borde h-12 mt-8 ">
                  <label
                    className={` ease-in-out text-xs font-bold text-gray-500 uppercase`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="absolut top-0 left-15 h-8 bg-green-200 text-sm w-[100%] border-green-200 rounded border -b py-3 focus:ring-0 focus:ring-orange-100 focus:outline-0"
                    required
                    value={inquiry?.name}
                    onChange={(e) => {
                      setInquiry({ ...inquiry, name: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="relative borde h-12 mt-8 ">
                  <label
                    className={` ease-in-out text-xs font-bold text-gray-500 uppercase`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="absolut top-0 left-15 h-8 bg-green-200 text-sm w-[100%] border-green-200 rounded border -b py-3 focus:ring-0 focus:ring-orange-100 focus:outline-0"
                    required
                    value={inquiry.email}
                    onChange={(e) => {
                      setInquiry({ ...inquiry, email: e.target.value });
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="relative borde h-12 mt-8 ">
                  <label
                    className={` ease-in-out text-xs font-bold text-gray-500 uppercase`}
                  >
                    Phone number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="absolut top-0 left-15 h-8 bg-green-200 text-sm w-[100%] border-green-200 rounded border -b py-3 focus:ring-0 focus:ring-orange-100 focus:outline-0"
                    required
                    value={inquiry.phone}
                    onChange={(e) => {
                      setInquiry({ ...inquiry, phone: e.target.value });
                    }}
                  />
                </div>
              </div>

              {/* delivery_option Checkbox */}
              <div className="flex items-center my-5 mb-2">
                <input
                  type="checkbox"
                  id="remember"
                  value={inquiry.delivery_option}
                  checked={inquiry.delivery_option}
                  onChange={updateRememberMe}
                  className="h-4 w-4 bg-green-600 text-green-600 border-gray-300 rounded focus:ring-green-600"
                />
                <label htmlFor="remember" className="ml-2 block text-gray-700">
                  I want delivery
                </label>
              </div>

              <button
                onClick={submitEnquiry}
                className="mt-8 btn_primary text-white px-10 py-2 rounded-lg"
              >
                Submit
              </button>

              {/* Password Field */}
              <div></div>
            </div>
            }
          </div>
        </div>
      </Dialog>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto py-8 main_padding">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Vehicle Details */}
          <div className="lg:w-2/3">
            {/* Vehicle Header */}
            <div className="mb-3 ">
              <Galleria
                ref={galleria}
                value={carItem?.images}
                numVisible={7}
                className=" p-2 md:p-0"
                style={{ maxWidth: "850px", color: "white" }}
                activeIndex={activeIndex}
                onItemChange={(e) => setActiveIndex(e.index)}
                circular
                fullScreen
                showItemNavigators
                showThumbnails={true}
                item={itemTemplate}
                thumbnail={thumbnailTemplate}
              />

              <div
                style={{
                  backgroundImage: `url(https://res.cloudinary.com/drrgthsy5/${carItem?.images?.[0]?.image})`,
                }}
                onClick={() => {
                  setActiveIndex(0);
                  galleria?.current?.show();
                }}
                className={`h-[50vh] mb-3 rounded-lg bg-center bg-cover `}
              ></div>
              <div className="flex items-center gap-5">
                {carItem?.images &&
                  carItem?.images?.slice(0, 3).map((image, index) => {
                    let imgEl = (
                      <div
                        key={index}
                        style={{
                          backgroundImage: `url(https://res.cloudinary.com/drrgthsy5/${image?.image})`,
                        }}
                        className={`relative rounded overflow-hidden bg-center bg-cover w-[70px] h-[70px]`}
                        onClick={() => {
                          setActiveIndex(index);
                          galleria?.current?.show();
                        }}
                      >
                        {index === carItem?.images?.length - 1 ? (
                          <div className="absolute inset-0 bg-gray-500 mix-blend-multiply"></div>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                    return (
                      <div className="col-3" key={index}>
                        {imgEl}
                      </div>
                    );
                  })} 
                  {carItem?.images?.length > 3 ? 
                  <div
                                          onClick={() => {
                          setActiveIndex(0);
                          galleria?.current?.show();
                        }}
                         className="flex items-center justify-center rounded w-[40px] h-[70px] bg-black"><i className="pi pi-angle-right text-white"></i>
                         </div>
                  :''}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-3xl font-bold text-charcoal mb-2">
                {carItem?.year} {carItem?.make} {carItem?.model}{" "}
              </h1>
              {/* <p className="text-2xl font-bold text-primary-blue mb-4">#{Math.round(parseInt(carItem?.price)).toLocaleString()}</p> */}
              <p className="text-2xl font-bold text-primary-blue mb-4">
                # {Math.round(parseInt(carItem?.price ?? "0")).toLocaleString()}
              </p>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <SpecItem
                  icon={<FaTachometerAlt />}
                  label="Mileage"
                  value={`${carItem?.mileage?.toLocaleString()} mileage`}
                />

                <SpecItem
                  icon={<FaCog />}
                  label="Transmission"
                  value="Automatic"
                />
                <SpecItem
                  icon={<FaGasPump />}
                  label="Fuel Type"
                  value="Gasoline"
                />
                <SpecItem
                  icon={<FaCar />}
                  label="Engine"
                  value="2.5L 4-Cylinder"
                />
                <SpecItem
                  icon={<FaPaintRoller />}
                  label="Color"
                  value="Magnetic Gray Metallic"
                />
                <SpecItem
                  icon={<FaShieldAlt />}
                  label="VIN"
                  value="123ABC456DEF7890"
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-charcoal mb-2">
                  Description
                </h2>
                <p className="text-gray-700">
                  {carItem?.description}
                  {/* This 2020 Toyota RAV4 XLE is in excellent condition, offering a perfect blend of efficiency,
                  style, and reliability. With only 30,000 mileage, it's ready for many more adventures. Features
                  include a spacious interior, advanced safety features, and a smooth driving experience.
                  Perfect for families or anyone seeking a versatile SUV. */}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h2 className="text-xl font-semibold text-charcoal mb-3">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <FeatureItem feature="Apple CarPlay/Android Auto" />
                  <FeatureItem feature="Blind Spot Monitor" />
                  <FeatureItem feature="Adaptive Cruise Control" />
                  <FeatureItem feature="Lane Keeping Assist" />
                  <FeatureItem feature="Power Liftgate" />
                  <FeatureItem feature="Heated Front Seats" />
                </div>
              </div>

              <div className="lghidden mt-3 max-w-[400x] rounded-lg bg-white shadow">
                <div className="">
                  <div className="grid grid-cols-2 gap-2">
                    <div
                      onClick={() => setVisible(true)}
                      className="btn_primary cursor-pointer p-2 flex items-center justify-center gap-3 rounded text-white "
                    >
                      <i className="pi pi-cart-plus"></i>
                      <span>Instant Buy</span>
                    </div>
                    <div className="bg-yellow-600 p-2 flex items-center justify-center gap-3 rounded text-white">
                      <i className="pi pi-heart-fill"></i>
                      <span>Favourite</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                Main Office
              </h2>
              <div className="mb-4">
                {/* <p className="font-medium text-charcoal">
                  <span className="text-primary-blue">
                    AutoTradePro Certified
                  </span>
                </p> */}
                <p className="text-gray-700">
                  Location: 123 Main St, Anytown, USA.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-primary-green text-white px-4 py-2 rounded bg-green-600 transition">
                  Schedule Test Drive
                </button>
                <button className="border border-primary-blue text-primary-blue px-4 py-2 rounded hover:bg-blue-50 transition">
                  Apply for Financing
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Similar Vehicles */}
          <div className="lg:w-1/3 flex flex-col gap-3">
            {/* CTA buttons */}
            <div className=" p-2 rounded-lg bg-white shadow">
              <div className="">
                <div className="grid grid-cols-2 gap-2">
                  <div
                    onClick={() => setVisible(true)}
                    className="btn_primary cursor-pointer p-2 flex items-center justify-center gap-3 rounded text-white"
                  >
                    <i className="pi pi-cart-plus"></i>
                    <span>Instant Buy</span>
                  </div>
                  <div className="bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 p-2 flex items-center justify-center gap-3 rounded text-white">
                    <i className="pi pi-heart-fill"></i>
                    <span>Favourite</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar cars */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                Similar Vehicles You Might Like
              </h2>
              <div className="space-y-4">
                {otherVehicles?.map((item) => (
                  <SimilarVehicle car={item} key={item.id} />
                ))}
              </div>
            </div>

            {/* Other filters */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                Search other vehicles
              </h2>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Helper Components
const SpecItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center space-x-2">
    <div className="text-primary-green">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-charcoal">{value}</p>
    </div>
  </div>
);

const FeatureItem = ({ feature }: { feature: string }) => (
  <div className="flex items-center">
    <div className="w-2 h-2 bg-primary-green rounded-full mr-2"></div>
    <span className="text-gray-700">{feature}</span>
  </div>
);

const SimilarVehicle = ({ car }: any) => (
  //   key={car?.id}
  <div className="border-b border-gray-200 pb-4 last:border-0 last:pb-0 grid grid-cols-[3fr_9fr] gap-3">
    <div className="">
      <img src={car?.first_image} className="rounded" alt="" />
    </div>
    <div className="">
      <h3 className="font-semibold text-charcoal">{car?.model}</h3>
      <p className="text-gray-600 text-sm mb-1">{car?.mileage}</p>
      <p className="text-primary-blue font-bold">
        #{parseInt(car?.price).toLocaleString()}
      </p>
      <Link
        to={`product/${car?.id}-${car?.year}-${car?.make}-${car?.model}`}
        className="mt-2 text-white bg-green-600 p-2 rounded hover:underline text-sm font-medium"
      >
        View Details
      </Link>
    </div>
  </div>

  // <p>Similaring carrs</p>
);

export default VehicleDetailsPage;
