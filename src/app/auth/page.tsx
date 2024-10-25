"use client";

import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

const AuthPage = () => {
  const { signIn, setActive } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const signInAttempt = await signIn?.create({
        identifier: email,
        password: password,
      });

      if (signInAttempt?.status === "complete") {
        if (setActive) {
          await setActive({ session: signInAttempt?.createdSessionId });
        }
        toast.success("Logging in...");
        router.push("/overview");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="px-20 h-screen flex flex-col items-center justify-center">
        <Image src="/images/logo.png" width={60} height={60} alt="Logo" />
        <p className="font-semibold text-2xl mt-5">Sign in to your account</p>
        <p className="text-muted-foreground text-sm md:w-[500px] w-full mt-2 text-center">
          By signing in you are agreeing to our Terms and Conditions, Privacy
          Policy, and Cookie Policy. You also confirm that the entered data is
          accurate.
        </p>
        <Card className="mt-10 md:w-96 w-full">
          <CardContent>
            <form onSubmit={onSubmit} className="mt-5">
              <div className="space-y-1">
                <Label>
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="jdelacruz@gmail.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-1 mt-3 relative">
                <Label>
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="--------"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <Button
                  onClick={handleShowPassword}
                  type="button"
                  className="absolute top-6 right-1 hover:bg-transparent"
                  size="icon"
                  variant="ghost"
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </Button>
              </div>
              <Button type="submit" disabled={loading} className="mt-5 w-full">
                {loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
