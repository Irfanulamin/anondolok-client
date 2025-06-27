"use client";

import { useState } from "react";
import { User, UserRoundCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function LoginPage() {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  const [adminCredentials, setAdminCredentials] = useState({
    admin: "",
    password: "",
  });

  const handleUserLogin = () => {
    console.log("User Login Credentials:", userCredentials);
  };

  const handleAdminLogin = () => {
    console.log("Admin Login Credentials:", adminCredentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Image
          src="/logo.png"
          alt="Anondolok Logo"
          width={500}
          height={500}
          className="mx-auto my-4 w-full h-auto max-w-[200px] "
        />
        <Tabs defaultValue="user">
          <TabsList>
            <TabsTrigger value="user" className="p-4">
              <span className="text-base font-semibold">User</span>{" "}
              <User className="inline-block w-6 h-6" />
            </TabsTrigger>
            <TabsTrigger value="admin" className="p-4">
              <span className="text-base font-semibold">Admin</span>{" "}
              <UserRoundCog className="inline-block w-6 h-6" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="user">
            <Card>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label className="text-base font-bold" htmlFor="username">
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="Username"
                    value={userCredentials.username}
                    onChange={(e) =>
                      setUserCredentials((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="grid gap-3">
                  <Label
                    className="text-base font-bold"
                    htmlFor="user-password"
                  >
                    Password
                  </Label>
                  <Input
                    id="user-password"
                    type="password"
                    placeholder="Password"
                    value={userCredentials.password}
                    onChange={(e) =>
                      setUserCredentials((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleUserLogin}
                  disabled={
                    !userCredentials.username || !userCredentials.password
                  }
                  className="w-full"
                >
                  Login as user
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="admin">
            <Card>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label className="text-base font-bold" htmlFor="admin">
                    Admin
                  </Label>
                  <Input
                    id="admin"
                    placeholder="Admin Username"
                    value={adminCredentials.admin}
                    onChange={(e) =>
                      setAdminCredentials((prev) => ({
                        ...prev,
                        admin: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="grid gap-3">
                  <Label
                    className="text-base font-bold"
                    htmlFor="admin-password"
                  >
                    Password
                  </Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Admin Password"
                    value={adminCredentials.password}
                    onChange={(e) =>
                      setAdminCredentials((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleAdminLogin}
                  disabled={
                    !adminCredentials.admin || !adminCredentials.password
                  }
                  className="w-full bg-amber-300 rounded-lg hover:bg-amber-400 transition-colors ease-in-out "
                >
                  Login as admin
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
