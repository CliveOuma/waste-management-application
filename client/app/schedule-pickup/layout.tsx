"use client";

import Navbar from "@/components/Navbar";
import { Suspense } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main className="flex-1 p-6 h-screen ">
                <Suspense>
                    {children}
                </Suspense>
            </main>
        </>
    );
}
