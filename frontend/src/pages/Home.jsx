import { useState, useEffect } from "react";
import ProfileModal from "../components/ProfileModal";
import axios from "axios";
import WelcomeBanner from "./WelcomeBanner"
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No token found, please login');
        }

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/home`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setProfiles(response.data.profiles);
        } else {
          throw new Error('Failed to fetch profiles');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProfiles();
  }, []);

  const openModal = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProfile(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-8 mt-8">
      <WelcomeBanner/>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8 mt-8">Discover Amazing Talent</h1>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {profiles && profiles.length > 0 ? (
            profiles.map((profile) => (
              <div
                key={profile._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out p-6 flex flex-col justify-between border border-gray-200 hover:border-blue-300 hover:-translate-y-1"
                style={{ minHeight: '200px' }} 
              >
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {profile.name?.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
                      <p className="text-gray-600 text-sm">{profile.branch} • Sem {profile.semester}</p>
                    </div>
                  </div>
                  {profile.bio && (
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{profile.bio}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {profile.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill._id}
                      className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium border border-blue-200"
                    >
                      {skill.title}
                      
                    </span>
                    
                  ))}
                  {profile.skills.length > 3 && (
                    <span className="text-blue-600 text-xs cursor-pointer hover:text-blue-800 transition" onClick={() => openModal(profile)}>
                      +{profile.skills.length - 3} more
                    </span>
                  )}
                  {profile.skills.length === 0 && (
                    <span className="text-gray-400 text-xs italic">No skills added yet</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/profile/${profile._id}`)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => openModal(profile)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <p className="text-gray-600 text-lg">No profiles found</p>
              <p className="text-gray-500 text-sm">Be the first to create your profile!</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && selectedProfile && (
        <ProfileModal profile={selectedProfile} onClose={closeModal} />
      )}
    </div>
  );
}
