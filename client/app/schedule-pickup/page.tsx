"use client";

import React, { useState } from "react";
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

const SchedulePickup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            customerName: "",
            address: "",
            pickupDate: "",
            wasteType: "",
            contactNumber: "",
            timeSlot: "",
        },
    });

    const handleSubmit = async (values: {
        customerName: string;
        address: string;
        pickupDate: string;
        wasteType: string;
        contactNumber: string;
        timeSlot: string;
    }) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("You must be logged in!");
                return;
            }

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/schedule`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Pickup scheduled successfully!");
            form.reset();
            router.push("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Something went wrong.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen mt-16 p-10 flex items-center justify-center dark:bg-gray-900 transition-all duration-300">
            <div className="md:w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <div className="p-8">
                    <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">Schedule a Pickup</h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-6 space-y-4">
                            <FormField control={form.control} name="customerName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Customer Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter your full name" className="dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="address" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter pickup address" className="dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="pickupDate" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Pickup Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} className="dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="wasteType" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Waste Type</FormLabel>
                                    <FormControl>
                                        <select
                                            {...field}
                                            className="dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 w-full p-2 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        >
                                            <option value="" disabled>Select waste type</option>
                                            <option value="electronic">Electronic Waste</option>
                                            <option value="plastic">Plastic Waste</option>
                                            <option value="organic">Organic Waste</option>
                                            <option value="metal">Metal Waste</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />


                            <FormField control={form.control} name="contactNumber" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Contact Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter your phone number" className="dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="timeSlot" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Preferred Time Slot</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} className="dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <Button type="submit" disabled={isLoading} className="w-full bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 transition-colors">
                                {isLoading ? "Scheduling..." : "Schedule Pickup"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SchedulePickup;
