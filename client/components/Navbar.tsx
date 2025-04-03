"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Icon from "react-feather";
import { useUser } from "@/app/context/UserContext"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser(); 
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full fixed top-0 left-0 bg-green-800 text-white shadow-lg z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          WasteTech Solutions
        </Link>
        <div className="hidden md:flex px-6 py-4 justify-between items-center space-x-6">
          {/* Admin Dashboard Link */}
          {user?.role === "ADMIN" && (
            <Link href="/admin" className="hover:text-yellow-400 transition">
              Admin Dashboard
            </Link>
          )}

          {/* Logout when user is logged in */}
          {user ? (
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition flex items-center gap-2"
            >
              <Icon.LogOut size={16} />
              Logout
            </button>
          ) : (
            // Login/Register when user is not logged in
            <>
              <button
                onClick={() => router.push("/register")}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition flex items-center gap-2"
              >
                <Icon.UserPlus size={16} />
                Register
              </button>
              <button
                onClick={() => router.push("/login")}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md transition flex items-center gap-2"
              >
                <Icon.LogIn size={16} />
                Login
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-green-900 px-6 py-4 absolute top-full left-0 w-full"
          >
            {/* Admin Dashboard Link for Mobile */}
            {user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="block py-2 hover:text-yellow-400"
                onClick={toggleMenu}
              >
                Admin Dashboard
              </Link>
            )}

            {/* Mobile Logout when user is logged in */}
            {user ? (
              <button
                onClick={logout}
                className="w-full mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition flex items-center justify-center gap-2"
              >
                <Icon.LogOut size={16} />
                Logout
              </button>
            ) : (
              // Mobile Login/Register when user is not logged in
              <>
                <button
                  onClick={() => router.push("/register")}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition flex items-center justify-center gap-2"
                >
                  <Icon.UserPlus size={16} />
                  Register
                </button>
                <button
                  onClick={() => router.push("/login")}
                  className="w-full mt-2 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md transition flex items-center justify-center gap-2"
                >
                  <Icon.LogIn size={16} />
                  Login
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
