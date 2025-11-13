import React from "react";
import heroImage from "../assets/cl.jpg";

const Feature = ({ title, desc, icon }) => (
  <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 flex-1 shadow-md">
    <div className="text-cyan-300 text-2xl mb-3">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-100 mb-2">{title}</h3>
    <p className="text-gray-300 text-sm">{desc}</p>
  </div>
);

const Landing = () => {
  return (
  <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-transparent">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-50 opacity-80 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:opacity-95" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-blue-700 dark:text-white">
              Reconnect. Showcase. Grow.
            </h1>
            <p className="mt-6 text-gray-700 text-lg dark:text-gray-300">
              A beautiful hub for our alumni to share projects, post events, and stay
              connected with the IT department. Built with speed and accessibility
              in mind.
            </p>





            <div className="mt-8 text-sm text-blue-600 dark:text-gray-400">
              <span className="font-medium text-blue-700 dark:text-gray-200">Tip:</span> Switch to the
              Notifications page to subscribe to event updates and announcements.
            </div>
          </div>

          <div className="w-full md:w-96 flex-shrink-0">
            <div className="rounded-3xl overflow-hidden border border-gray-700 shadow-2xl">
              <img
                src={heroImage}
                alt="Alumni sample"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
  <h2 className="text-2xl font-bold text-blue-700 dark:text-gray-100 mb-6">What you can do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature
            icon={"🚀"}
            title="Showcase Projects"
            desc="Share your work and browse projects from alumni — search, filter and contact creators."
          />

          <Feature
            icon={"📅"}
            title="Events & Meetups"
            desc="Stay up to date with upcoming events, RSVP and get notified about schedule changes."
          />

          <Feature
            icon={"🔔"}
            title="Notifications"
            desc="Subscribe to announcements so you never miss important updates from the department."
          />
        </div>
      </section>

      {/* Callout / Footer spacing */}
      <div className="mt-auto">
        {/* Footer component remains at app-level */}
      </div>
    </div>
  );
};

export default Landing;
