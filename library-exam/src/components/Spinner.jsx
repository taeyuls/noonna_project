import React from "react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
    </div>
  );
}
