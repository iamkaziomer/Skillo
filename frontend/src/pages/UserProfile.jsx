import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, Linkedin, ExternalLink, Globe } from 'lucide-react';
import axios from 'axios';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile/${userId}`);
        if (response.data.success) {
          setProfileData(response.data);
        }
      } catch (error) {
        setError('Failed to load profile');
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const getDomain = (url) => {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace("www.", "");
    } catch (error) {
      return url;
    }
  };

  const getFavicon = (url) => {
    const domain = getDomain(url);
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const { user, skills } = profileData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-lg">
              {user.name?.charAt(0)}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
              <p className="text-gray-600 mb-2">{user.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {user.branch}
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Semester {user.semester}
                </span>
              </div>
              
              {user.bio && (
                <p className="text-gray-700 mb-4 max-w-2xl">{user.bio}</p>
              )}

              {/* Social Links */}
              <div className="flex justify-center md:justify-start gap-4">
                {user.linkedinUrl && (
                  <a
                    href={user.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
                {user.githubUrl && (
                  <a
                    href={user.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills & Expertise</h2>
          
          {skills.length === 0 ? (
            <div className="text-center py-12">
              <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No skills added yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{skill.title}</h3>
                  
                  {skill.description && (
                    <p className="text-gray-600 mb-4">{skill.description}</p>
                  )}
                  
                  {skill.learntFrom && (
                    <div className="mb-4">
                      <span className="text-sm font-medium text-gray-500">Learned from:</span>
                      <p className="text-gray-700">{skill.learntFrom}</p>
                    </div>
                  )}

                  {skill.resources && skill.resources.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Resources:</h4>
                      <div className="space-y-2">
                        {skill.resources.map((resource, index) => (
                          <a
                            key={index}
                            href={resource}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition text-sm"
                          >
                            <img 
                              src={getFavicon(resource)} 
                              alt="favicon" 
                              className="w-4 h-4" 
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                            <span className="text-gray-700 truncate flex-1">{getDomain(resource)}</span>
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;