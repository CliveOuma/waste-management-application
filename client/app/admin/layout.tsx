import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";

export const metadata = {
  title: "Admin page",
  description: "Admin Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-2">
      <Navbar />
      <main className="flex-1 p-6">
        <Suspense>
          {children}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
