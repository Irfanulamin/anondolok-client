"use client";
import React from "react";
import UserNavbar from "@/components/common/Navbar";
import UserProtectedLayout from "@/components/common/UserProtectedLayer";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <UserProtectedLayout>
      <UserNavbar />
      <div className="h-full w-full max-w-[1920px] mx-auto px-2 md:px-12  lg:px-24 min-h-screen">
        {children}
      </div>
    </UserProtectedLayout>
  );
};

export default layout;
