import React from "react";

export function Button({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
      {...props}
    >
      {children}
    </button>
  );
}
