import DashboardNavbar from "@/components/common/Dashboard";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <DashboardNavbar />
      <div className="h-full w-full max-w-[1920px] mx-auto px-2 md:px-12  lg:px-24 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default layout;
