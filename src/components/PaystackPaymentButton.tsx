import React from "react";
import { PaystackButton } from "react-paystack";

interface PaystackProps {
  className?: string;
  email: string;
  amount: number; // amount in Naira
  productUserDetails: any;
  deliveryMethod: any;
  totalBalance: any;
  cartItems: any;
  onSuccess?: (reference: any) => void;
  onClose?: () => void;
  // disabled?: boolean;
}



const PaystackPaymentButton: React.FC<
  PaystackProps & { disabled?: boolean }
> = ({
  className,
  email,
  amount,
  productUserDetails,
  deliveryMethod,
  totalBalance,
  cartItems,
  onSuccess,
  onClose,
}) => {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || ""; // Replace with your key or env var

  const getProducts = () => {
    const data: any = cartItems.map((item: any) => {
      return {
        id: item.id,
        make: item.make,
        model: item.model,
        year: item.year,
        quantity: item.quantity,
        price: item.price,
      };
    });
    return data;
  };  
 
 
      const payload = {
        // userDetails: productUserDetails,
        // deliveryMethod: deliveryMethod,
        totalBalance: totalBalance,
        productItems: getProducts(),
      };

  const componentProps = {
    email,
    amount: amount * 100,
    metadata: {
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "name",
          value: productUserDetails.fullName,
        },
        {
          display_name: "Email",
          variable_name: "email",
          value: productUserDetails.email,
        },

        {
          display_name: "Phone",
          variable_name: "phone",
          value: productUserDetails.phone,
        },
        {
          display_name: "Address",
          variable_name: "address",
          value: productUserDetails.address,
        },
            
        {
          display_name: "City",
          variable_name: "city",
          value: productUserDetails.city,
        },
            
        {
          display_name: "State",
          variable_name: "state",
          value: productUserDetails.state,
        },
            
        {
          display_name: "Country",
          variable_name: "country",
          value: productUserDetails.country,
        },
            
        {
          display_name: "Zip",
          variable_name: "zip",
          value: productUserDetails.zip,
        },
            
        {
          display_name: "Special notes",
          variable_name: "notes",
          value: productUserDetails.notes,
        },
        {
          display_name: "Delivery Method",
          variable_name: "deliveryMethod",
          value: deliveryMethod,
        },
      ],
      payload: payload,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: async (reference: any) => {
     
      if (onSuccess) { 
        onSuccess(reference);
      }
    },
    onClose: () => {
      if (onClose) onClose();
    },
  };
 
  return (
    <PaystackButton
    className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 w-full rounded-md font-semibold ${
      className || ""
    }`}
    {...componentProps}
    /> 
  );
};

export default PaystackPaymentButton;

