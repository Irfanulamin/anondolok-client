"use client";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src="/logo.png"
        alt="Logo"
        className="w-30 mb-8"
        style={{ width: 120 }}
      />
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="mt-2 text-gray-600 text-center">
        Sorry, the page you are looking for does not exist.
        <br />
        Please choose the path correctly.
      </p>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
