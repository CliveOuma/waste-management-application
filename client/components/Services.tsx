import Image from "next/image";
import React from "react";

const Card = ({ title, description, image }: { title: string; description: string; image: string }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-80">
      <Image 
        src={image} 
        alt={title} 
        width={320} 
        height={192}
        className="w-full h-48 object-cover" 
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

const Services = () => {
  const cards = [
    {
      title: "Garbage Collection",
      description: "We provide efficient and reliable waste collection services, ensuring proper disposal and environmentally responsible sorting and processing.",
      image: "/images/pic1.jpg",
    },
    {
      title: "Recycling",
      description: "We breathe new life into materials through creative repurposing & recycling methods to promote a sustainable and circular economy.",
      image: "/images/pic2.jpg", 
    },
    {
      title: "Smart Disposal",
      description: "Our comprehensive waste management solutions focus on reducing landfill waste, and promoting sustainable practices.",
      image: "/images/pic3.jpg",
    },
  ];

  return (
    <div className="bg-gray-100 mt-10 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Our Services</h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Services;
