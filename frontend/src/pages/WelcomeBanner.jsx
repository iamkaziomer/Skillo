import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WelcomeBanner() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token")
    
  return (
    <section className="w-full px-4 py-12 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-sm mb-8">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Text Section */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
            Discover & Showcase Skills with Skillo
          </h1>
          <p className="text-gray-600 mb-6">
            Explore real experiences, top resources, and authentic journeys from learners like you.
            Skillo is your home to grow, share, and inspire.
          </p>
          <button
            onClick={!token?()=>navigate('/login'):()=>navigate('/dashboard')}
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition"
          >
            Get Started
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Bento-Style Illustration */}
        <div className="grid grid-cols-2 gap-4">
          <div className="h-32 rounded-xl bg-blue-100 p-4 flex items-center justify-center text-blue-700 font-semibold text-center text-sm shadow-sm">
            Add Your Skills
          </div>
          <div className="h-32 rounded-xl bg-yellow-100 p-4 flex items-center justify-center text-yellow-800 font-semibold text-center text-sm shadow-sm">
            Share Resources
          </div>
          <div className="h-32 rounded-xl bg-green-100 p-4 flex items-center justify-center text-green-800 font-semibold text-center text-sm shadow-sm">
            Learn from Others
          </div>
          <div className="h-32 rounded-xl bg-purple-100 p-4 flex items-center justify-center text-purple-800 font-semibold text-center text-sm shadow-sm">
            Inspire Your Juniors
          </div>
        </div>
      </div>
    </section>
  );
}
