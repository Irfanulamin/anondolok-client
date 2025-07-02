"use client";
import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { role } = useAppSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (role === null || role === undefined) {
      router.push("/");
    } else if (role === "admin") {
      router.push("/dashboard");
    }
  }, [role, router]);

  if (role === "user") {
    return <>{children}</>;
  }

  return null;
};

export default UserProtectedLayout;
