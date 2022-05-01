import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1 className="flex justify-center bg-gray-100 mt-32 p-8">
        <Link className="text-blue-600" to="/">
          Page not found {":("} click here to go back to index page
        </Link>
      </h1>
    </>
  );
};

export default NotFound;
