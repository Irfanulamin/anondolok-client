"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
type FormData = { email: string };

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setServerMsg("");
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email }),
        }
      );
      const result = await res.json();
      if (result.success) {
        setServerMsg(result.message);
        setCodeSent(true);
        localStorage.setItem("resetEmail", data.email);
        setTimeout(() => router.push("/reset-password"), 2000);
      } else {
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, message]) => {
            setError(field as keyof FormData, { message: String(message) });
          });
          toast.error(result.message || "Failed to send reset code");
        }
        setServerMsg(result.message || "Failed to send reset code");
      }
    } catch {
      setServerMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl text-center">Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          {!codeSent ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {serverMsg && (
                <Alert variant="destructive">
                  <AlertDescription>{serverMsg}</AlertDescription>
                </Alert>
              )}
              <div>
                <Label htmlFor="email" className="mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-amber-300"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Code
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <Mail className="mx-auto h-8 w-8 text-green-600" />
              <Alert>
                <AlertDescription>{serverMsg}</AlertDescription>
              </Alert>
              <p className="text-sm text-gray-600">Redirecting...</p>
            </div>
          )}
          <div className="mt-4 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-blue-600 hover:underline"
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
