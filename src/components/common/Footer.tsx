import Image from "next/image";
import React from "react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-amber-300/65">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={32}
            height={32}
            className="rounded"
          />
          <p className="text-sm text-muted-foreground">
            © 2028 Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
