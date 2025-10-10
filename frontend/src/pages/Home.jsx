import React from 'react';
import clImage from '../assets/cl.jpg';


const Home = () => {
  const quotes = [
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Believe you can and you're halfway there."
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 text-center">
      
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-8 drop-shadow-md">
        Welcome to the IT Dept. Alumni Portal
      </h1>
      
      {/* Image */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
        <img
          src={clImage}
          alt="Alumni"
          className="w-full h-full object-cover rounded-3xl shadow-xl transition-transform transform hover:scale-105"
        />
      </div>

      {/* Quotes Section */}
      <div className="max-w-xl space-y-5">
        {quotes.map((quote, index) => (
          <p 
            key={index} 
            className="italic text-gray-700 text-lg md:text-xl px-4 py-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-all"
          >
            "{quote}"
          </p>
        ))}
      </div>

      
      <div className="mt-10">
        <a
          href="/projects"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1"
        >
          Explore Projects
        </a>
      </div>

    </div>
  );
};

export default Home;
