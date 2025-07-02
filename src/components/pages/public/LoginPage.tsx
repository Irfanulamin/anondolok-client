"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/feature/authSlice";

type LoginFormInputs = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormInputs>({ mode: "onChange" });

  const dispatch = useDispatch();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result.user.role);
      if (result?.token) {
        localStorage.removeItem("token");
        localStorage.setItem("token", result.token);
        dispatch(
          setUser({ username: result.user.username, role: result.user.role })
        );
      }
      if (result?.user?.role === "user") {
        window.location.href = "/form";
      } else if (result?.user?.role === "admin") {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <Image
          src="/logo.png"
          alt="Anondolok Logo"
          width={500}
          height={500}
          className="mx-auto my-4 w-full h-auto max-w-[200px]"
        />
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-xl font-semibold">Login</span>
              </div>
              <div className="grid gap-3">
                <Label className="text-base font-bold" htmlFor="username">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Username"
                  {...register("username", { required: true })}
                />
              </div>
              <div className="grid gap-3">
                <Label className="text-base font-bold" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </div>
              <div className="text-right mb-2">
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                disabled={!isValid}
                className="w-full bg-amber-300 rounded-lg hover:bg-amber-400 transition-colors ease-in-out"
              >
                Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
