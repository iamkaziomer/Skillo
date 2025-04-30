import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import profile from "../assets/1722335042999.jpeg";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 md:px-20 py-12 mt-14">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

        {/* Left: Creator Info */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 text-center">
          <img
            src={profile}
            alt="Kazi Omer"
            className="w-24 h-24 rounded-full mx-auto object-cover mb-4"
          />
          <h3 className="text-xl font-semibold">Kazi Omer</h3>
          <p className="text-gray-600 text-sm mb-4">Creator of Skillo</p>
          <div className="flex justify-center gap-4 text-2xl text-gray-600">
            <a href="https://github.com/YOUR_GITHUB" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href="https://twitter.com/YOUR_TWITTER" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com/in/YOUR_LINKEDIN" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Right: Why Skillo */}
        <div className="bg-blue-50 border border-blue-200 shadow-sm rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-3">Why Skillo?</h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            I built <span className="font-semibold">Skillo</span> to create a space where learners
            can showcase their skills, share how they learned them, and recommend the best resources.
            It’s about authentic growth and real experiences — not just portfolio checklists. Skillo is
            designed to make learning social, collaborative, and honest.
          </p>
        </div>

        {/* Learn Together */}
        <div className="md:col-span-2 bg-green-50 border border-green-200 shadow-sm rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-2">Learn Together</h2>
          <p className="text-sm text-gray-700">
            Explore the journeys of fellow learners, contribute your own, and help build a rich ecosystem
            of shared knowledge and practical insights. Skillo grows with every learner who shares.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
