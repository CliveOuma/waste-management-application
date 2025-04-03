"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { useRouter } from "next/navigation";

const HomeBanner = () => {
  const router = useRouter()
  return (
    <section className="relative w-full h-screen bg-green-800 text-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Sustainable Waste Management
        </motion.h1>
        <motion.p 
          className="mt-4 text-lg md:text-xl text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Join us in making a greener planet by managing waste responsibly. Track, collect, recycle, and dispose of waste efficiently.
        </motion.p>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button 
            className="bg-green-600 hover:bg-green-700 px-6 py-3 text-lg rounded-lg"
            onClick={() => router.push("/schedule-pickup")}
          >
            Schedule a Pickup
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeBanner;
