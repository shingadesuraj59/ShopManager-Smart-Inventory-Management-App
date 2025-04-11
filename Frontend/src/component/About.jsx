import React from 'react';
import Navbar from './navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="relative">
        {/* Decorative Background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
        </div>

        {/* Main Content */}
        <div className="min-h-screen flex flex-col justify-center items-center py-12">
          <div className="max-w-5xl w-full p-10 bg-white shadow-2xl rounded-lg relative overflow-hidden">
            {/* Floating Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>

            {/* About Section */}
            <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
              About Our Inventory Management System
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed text-center mb-6">
              Our Inventory Management System helps businesses manage their stock, sales, and overall operations efficiently. From tracking product quantities to generating bills, this system enhances workflow, reduces errors, and improves business performance.
            </p>

            {/* Key Features */}
            <h2 className="text-3xl font-semibold text-gray-800 mt-8 mb-4 text-center">
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-600 text-center">
              <li>Real-time product tracking with low-stock and expiration notifications.</li>
              <li>Automated bill generation with product quantity adjustments.</li>
              <li>Personalized user authentication for shop owners.</li>
              <li>Advanced data analytics for sales and inventory trends.</li>
            </ul>

            {/* Technology Stack */}
            <h2 className="text-3xl font-semibold text-gray-800 mt-10 mb-6 text-center">
              Technology Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Frontend</h3>
                <p className="text-gray-600">React with Tailwind CSS</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Backend</h3>
                <p className="text-gray-600">Node.js with Express.js</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Database</h3>
                <p className="text-gray-600">MongoDB</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 flex justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-8 rounded-full shadow-lg hover:scale-105 transform transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;




