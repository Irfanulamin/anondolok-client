"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, Eye, EyeOff, CheckCircle } from "lucide-react";
import Link from "next/link";

type FormValues = {
  email: string;
  code: string;
  newPassword: string;
};

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const resetEmail = localStorage.getItem("resetEmail");
    if (resetEmail) setValue("email", resetEmail);
  }, [setValue]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setSuccess(true);
        localStorage.removeItem("resetEmail");
        setTimeout(() => router.push("/"), 3000);
      } else {
        // Show server errors at the relevant field or as a general error
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, message]) => {
            setError(field as keyof FormValues, { message: String(message) });
          });
        } else {
          setError("root", {
            message: result.message || "Failed to reset password",
          });
        }
      }
    } catch {
      setError("root", { message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-sm">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold">
              Password Reset Successful!
            </h2>
            <p className="text-gray-600">You will be redirected to login.</p>
            <Button
              onClick={() => router.push("/")}
              className="w-full bg-amber-300"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Reset Password
          </CardTitle>
          <p className="text-center">
            Enter the code sent to your email and your new password
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {errors.root && (
              <Alert variant="destructive">
                <AlertDescription>{errors.root.message}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                {...register("email", { required: "Email is required" })}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Reset Code</Label>
              <Input
                id="code"
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit code"
                className="text-center text-lg tracking-widest"
                {...register("code", { required: "Reset code is required" })}
                autoComplete="one-time-code"
              />
              {errors.code && (
                <p className="text-xs text-red-600">{errors.code.message}</p>
              )}
              <p className="text-xs text-gray-500">
                Check your email for the 6-digit reset code
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  {...register("newPassword", {
                    required: "New password is required",
                  })}
                  autoComplete="new-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.newPassword && (
                <p className="text-xs text-red-600">
                  {errors.newPassword.message}
                </p>
              )}
              <p className="text-xs text-red -500">
                Password must contain at least one uppercase letter, one
                lowercase letter, and one number
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-amber-300"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting Password...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
