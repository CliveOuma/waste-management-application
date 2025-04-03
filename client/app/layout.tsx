import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Waste Management App",
    description: "A Garbage collection and recycling app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <UserProvider>
                    <Toaster
                        position="top-center"
                    />
                    {children}
                </UserProvider>
            </body>
        </html>
    );
}
