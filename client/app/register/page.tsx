"use client";
import React from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import Link from "next/link";
import { Button } from "../components/ui/Button";

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name should have at least 2 characters.")
      .max(50, "Name should not exceed 50 characters")
      .refine(
        (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value),
        "Name should contain only alphabets."
      ),
    email: z.string().email("Email must be valid"),
    password: z.string().min(6, "Password should have at least 6 characters."),
    confirmPassword: z.string().min(6, "Password should have at least 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Page = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.message === "Email already exists") {
          toast.error("User already exists!");
        } else {
          toast.error(data.message || "Something went wrong");
        }
        return;
      }

      toast.success("Account created successfully!");
      form.reset();
      router.push("/login");
    } catch (error) {
      console.error("Registration Failed:", error);
      toast.error("Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center dark:bg-gray-900 transition-all duration-300">
      <div className=" md:w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h3 className="text-center text-2xl font-semibold text-gray-900 dark:text-gray-100">Register Here</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-6 space-y-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600" />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                  <FormControl>
                    <Input {...field} className="dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600" />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600" />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )} />
              <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600" />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )} />
              <Button type="submit" className="w-full bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 transition-colors">
                Submit
              </Button>
            </form>
            <p className="text-sm mt-4 text-center">
              Already registered? <Link className="underline text-blue-600" href="/login">Sign in</Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;
