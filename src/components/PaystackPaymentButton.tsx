import React, { useEffect } from "react";
import { PaystackButton } from "react-paystack";
import { createNewOrderAPI } from "../utils/api/ordersAPI";

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


/*

{
    "id": "FNT20251026121912PJzT8yORD",
    "py_ref": "T332890738232430",
    "status": "('PENDING', 'pending')",
    "details": {
        "userDetails": {
            "fullName": "SupryTech",
            "email": "suprytech@email.com",
            "phone": "+2347051900086",
            "address": "Shop 18, Irepodun Ultra shopping complex.",
            "city": "Ikeja",
            "state": "lagos",
            "country": "Nigeria",
            "zip": "200282",
            "notes": "Call 30 mins before arrival"
        },
        "deliveryMethod": "home",
        "totalBalance": [
            {
                "name": "subtotal",
                "amount": 15023233
            },
            {
                "name": "taxes",
                "amount": 7450
            },
            {
                "name": "total",
                "amount": 15030683
            }
        ],
        "productItems": [
            {
                "id": 3,
                "make": "Toyota",
                "model": "venza",
                "year": 2015,
                "quantity": 1,
                "price": 15000000
            },
            {
                "id": 1,
                "make": "Toyota",
                "model": "dkkjk",
                "year": 2018,
                "quantity": 1,
                "price": 23233
            }
        ],
        "reference": {
            "reference": "T332890738232430",
            "trans": "5469428113",
            "status": "success",
            "message": "Approved",
            "transaction": "5469428113",
            "trxref": "T332890738232430",
            "redirecturl": "?trxref=T332890738232430&reference=T332890738232430"
        }
    },
    "created_at": "2025-10-26T19:19:12.725964Z",
    "updated_at": "2025-10-26T19:19:12.725964Z",
    "user": "1",
    "coupon": null
}
*/


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
        await createNewOrderAPI({...payload, reference}).then((res)=>{
          console.log('Order created successfully', res.data)
        });
        onSuccess({...payload,
          reference: reference,
        });
      }
    },
    onClose: () => {
      console.log("Payment closed");
      if (onClose) onClose();
    },
  };

  useEffect(()=>{
    console.log('In payment button useeffect')
    console.log('amount,', amount * 100)
    console.log('publicKey', publicKey)
    console.log('email', email)
    console.log('payload', payload)
    console.log('In payment button useeffect')
    
  }, [])
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

// className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold ${className || ''}`}
  // disabled={disabled} // This prevents Paystack popup when form invalid

  // won n se e - they are doing you
  // se won se e ni - are they doing you?
