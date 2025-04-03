import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-lg font-bold">WasteTech Solutions</h2>
          <p className="text-sm mt-2">
            Leading waste management company in Machakos, providing superior
            cleaning and waste management services.
          </p>
          <p className="mt-2 flex items-center"><FaMapMarkerAlt className="text-xl mr-4 my-3 text-green-600" /> Machakos, Machakos Town</p>
            <p className="flex items-center">
                <FaEnvelope className="text-xl mr-4 my-3 text-green-600"/>
                <a href="mailto:service@wastesolution.co.ke">service@wastesolution.co.ke</a>
            </p>
            <p className="flex items-center">
                <FaPhone className=" text-xl mr-4 my-3 text-green-600" />
                <a href="tel:+254716192040">+254 716 192 040</a>
            </p>
        </div>
        {/* Our Services */}
        <div>
          <h3 className="text-lg font-bold">Our Services</h3>
          <ul className="mt-2 space-y-1">
            {[
              "Garbage Collection",
              "Waste Sorting",
              "Recycling",
              "Organic Waste Composting",
              "Waste Transfer To Specialized Recyclers",
            ].map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Work Hours</h3>
          <p className="mt-2">Weekdays: 8am - 5pm</p>
          <p>Saturday: 8am - 12pm</p>
          <p>Sunday: Closed</p>
          <p className="mt-4">
            We offer waste management for home and business. Keep your space
            clean and green with us.
          </p>
        </div>
      </div>
      <div className="text-center text-sm mt-8 border-t border-gray-700 pt-4">
        <p>
          &copy; 2025 WasteTech Solutions Ltd | Best Waste Management | All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
