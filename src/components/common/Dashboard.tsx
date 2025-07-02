"use client";
import { logOut } from "@/redux/feature/authSlice";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/admin", label: "Admin Panel" },
  { to: "/register", label: "Register User" },
];

const DashboardNavbar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("token");
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-3">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-4 relative">
        <Link href="/dashboard" className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10" />
        </Link>
        <button
          className="md:hidden flex flex-col justify-between w-8 h-6 focus:outline-none"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-1 bg-gray-800 rounded transition-all"></span>
          <span className="block h-1 bg-gray-800 rounded transition-all"></span>
          <span className="block h-1 bg-gray-800 rounded transition-all"></span>
        </button>
        <div
          className={`flex-col md:flex-row md:flex gap-6 absolute md:static top-full left-0 right-0 bg-white md:bg-transparent border-b md:border-0 z-10 transition-all ${
            open ? "flex" : "hidden"
          } md:items-center`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className="block px-4 py-3 md:p-0 text-lg text-gray-800 font-medium hover:text-blue-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              handleLogout();
              setOpen(false);
            }}
            className="block px-4 py-3 md:p-0 text-lg text-red-600 font-medium hover:text-red-800 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
