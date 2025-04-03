"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/input";
import { useUser } from "../context/UserContext";
import Link from "next/link";

const signInSchema = z.object({
  email: z.string().email("Email must be valid"),
  password: z.string().min(6, "Password should have at least 6 characters."),
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useUser();  

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, values, {
        withCredentials: true,  
      });

      const { token, user } = response.data;
      if (!token || !user) throw new Error("Invalid response from server");

      login(user, token);  

      toast.success("Logged In Successfully");
      router.push("/");  
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center dark:bg-gray-900 transition-all duration-300">
      <div className="md:w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">Login</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-6 space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@gmail.com"
                        {...field}
                        className="dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
                        {...field}
                        className="dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <p className="text-sm mt-4 text-center">
              Do not have an account?{" "}
              <Link className="underline text-blue-600" href="/register">
                Sign Up
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
