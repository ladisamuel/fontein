// src/components/ErrorPage.tsx
import React from "react";
import { useRouteError, Link } from "react-router-dom";
import Header from "../../components/Header";


const ErrorPage: React.FC = () => {
  const error = useRouteError() as any;

  return (
    <div className=" ">
      <Header />
      <div className="my-[12vh] min-h-[50vh] border-t border-t-green-400/20 flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-xl mb-2">Sorry, an unexpected error has occurred.</p>
        <p className="text-gray-600 mb-6">
          {error?.statusText || error?.message || "Unknown error"}
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Go to Home
        </Link>
      </div>

      
    </div>
  );
};

export default ErrorPage;
