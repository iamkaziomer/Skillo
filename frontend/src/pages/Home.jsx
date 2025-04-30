import { useState, useEffect } from "react";
import ProfileModal from "../components/ProfileModal";
import axios from "axios";
import WelcomeBanner from "./WelcomeBanner"

export default function Home() {
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8 mt-8">
      <WelcomeBanner/>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-6 mt-5">Student Profiles</h1>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {profiles && profiles.length > 0 ? (
            profiles.map((profile) => (
              <div
                key={profile._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out p-4 flex flex-col justify-between border border-2-[#252525]"
                style={{ minHeight: '200px' }} 
              >
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
                  <p className="text-gray-600 text-sm mt-1">{profile.branch} — Semester {profile.semester}</p>
                  {profile.bio && (
                    <p className="text-gray-700 text-sm mt-2 line-clamp-2">{profile.bio}</p>
                  )}
                </div>
                <div className="flex gap-2 mb-4">
                  {profile.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill._id}
                      className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {skill.title}
                      
                    </span>
                    
                  ))}
                  {profile.skills.length>3&&(<p className="cursor-pointer text-sm" onClick={()=>openModal(profile)}>View all</p>)}
                  {profile.skills.length === 0 && (
                    <span className="text-gray-400 text-xs">No skills added</span>
                  )}
                </div>
                <button
                  onClick={() => openModal(profile)}
                  className="w-full bg-gradient-to-tr from-gray-100 to-sky-100 text-[#252525] border border-2-[#232323] hover:bg-blue-700 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200"
                >
                  View Full Profile
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3"></p>
          )}
        </div>
      </div>

      {isModalOpen && selectedProfile && (
        <ProfileModal profile={selectedProfile} onClose={closeModal} />
      )}
    </div>
  );
}
