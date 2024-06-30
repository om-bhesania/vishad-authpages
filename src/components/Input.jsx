import React from "react";

function Input({ className, ...rest }) {
  return (
    <input
      className={`block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${className}`}
      {...rest}
    />
  );
}

export default Input;
