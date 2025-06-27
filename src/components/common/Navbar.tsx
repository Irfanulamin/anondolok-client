"use client";

import { Menu, Mountain, LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

export default function Navbar() {
  const handleLogout = () => {
    // Dummy logout function for now
    console.log("Logout clicked");
  };

  return (
    <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6  absolute top-0 left-0 z-50  bg-amber-300/65">
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden bg-transparent"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="/" className="flex items-center mb-6">
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="h-12 w-12 object-contain"
            />
          </Link>
          <div className="grid gap-4">
            <Link
              href="/form"
              className="flex w-full items-center py-2 text-lg font-medium hover:text-primary transition-colors"
            >
              Form
            </Link>
            <Link
              href="/history/1"
              className="flex w-full items-center py-2 text-lg font-medium hover:text-primary transition-colors"
            >
              History
            </Link>
            <Link
              href="/about-us"
              className="flex w-full items-center py-2 text-lg font-medium hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Button
              variant="outline"
              className="justify-start mt-4 bg-transparent"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="mr-6 hidden lg:flex">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="h-12 w-12 object-contain"
          />
        </Link>
      </div>

      {/* Desktop Navigation - Centered */}
      <div className="flex-1 flex justify-center">
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/form"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Form
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/history/1"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  History
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/about-us"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  About Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Logout Button - Right Side */}
      <div className="ml-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="hidden lg:flex bg-transparent"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
