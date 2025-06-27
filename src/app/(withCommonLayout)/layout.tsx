"use client";
import { Footer } from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React from "react";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isRoot = pathname === "/";

  return (
    <div>
      {!isRoot && <Navbar />}
      <div className="h-full w-full max-w-[1920px] mx-auto px-2 md:px-12  lg:px-24 min-h-screen">
        {children}
      </div>
      {!isRoot && <Footer />}
    </div>
  );
};

export default layout;
