import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WelcomeBanner() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token")
    
  return (
    <section className="w-full px-6 py-16 bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl shadow-lg mb-12 border border-gray-200">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Text Section */}
        <div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Discover & Showcase Skills with Skillo
          </h1>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Explore real experiences, top resources, and authentic journeys from learners like you.
            Skillo is your home to grow, share, and inspire.
          </p>
          <button
            onClick={!token?()=>navigate('/login'):()=>navigate('/dashboard')}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
          >
            Get Started
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Bento-Style Illustration */}
        <div className="grid grid-cols-2 gap-6">
          <div className="h-36 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 p-6 flex items-center justify-center text-blue-800 font-bold text-center shadow-lg hover:shadow-xl transition-shadow">
            Add Your Skills
          </div>
          <div className="h-36 rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 flex items-center justify-center text-yellow-800 font-bold text-center shadow-lg hover:shadow-xl transition-shadow">
            Share Resources
          </div>
          <div className="h-36 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 p-6 flex items-center justify-center text-green-800 font-bold text-center shadow-lg hover:shadow-xl transition-shadow">
            Learn from Others
          </div>
          <div className="h-36 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 p-6 flex items-center justify-center text-purple-800 font-bold text-center shadow-lg hover:shadow-xl transition-shadow">
            Inspire Your Juniors
          </div>
        </div>
      </div>
    </section>
  );
}
