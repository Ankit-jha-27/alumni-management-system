import React from 'react';
import clImage from '../assets/cl.jpg';

const Home = () => {
  const quotes = [
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Believe you can and you're halfway there."
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Alumni Project</h1>
      <img
        src={clImage}
        alt="Alumni"
        className="w-64 h-auto rounded-lg shadow-lg mb-6"
      />
      <div className="space-y-3 max-w-md">
        {quotes.map((quote, index) => (
          <p key={index} className="italic text-gray-700">
            "{quote}"
          </p>
        ))}
      </div>
    </div>
  );
};

export default Home;
