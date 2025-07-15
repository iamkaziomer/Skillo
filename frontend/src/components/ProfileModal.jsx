import React from "react";
import { Github, Linkedin, ExternalLink } from "lucide-react";

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const getDomain = (url) => {
  if (isValidUrl(url)) {
    return new URL(url).hostname;
  }
  return null;
};

const getFavicon = (url) => {
  const domain = getDomain(url);
  return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=32` : "";
};

const ProfileModal = ({ profile, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] p-8 overflow-hidden m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {profile.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
              <p className="text-gray-600">{profile.branch} — Semester {profile.semester}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-2xl font-semibold text-gray-400 hover:text-gray-600 transition">
            ×
          </button>
        </div>
        
        {profile.bio && <p className="text-gray-700 mb-6 leading-relaxed">{profile.bio}</p>}
        
        {/* Social Links */}
        {(profile.linkedinUrl || profile.githubUrl) && (
          <div className="flex gap-3 mb-6">
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            )}
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition text-sm"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        )}

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[65vh] pr-2">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Skills & Expertise</h3>
          <div className="space-y-4">
            {profile.skills.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No skills added yet</p>
              </div>
            ) : (
              profile.skills.map((skill) => (
                <div key={skill._id} className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-white to-gray-50">
                  <h4 className="font-semibold text-gray-800 text-lg mb-2">{skill.title}</h4>
                  {skill.description && <p className="text-gray-600 mb-3">{skill.description}</p>}
                  {skill.learntFrom && (
                    <p className="text-sm text-gray-500 mb-3">
                      <span className="font-medium">Learned from:</span> {skill.learntFrom}
                    </p>
                  )}
                  {skill.resources && skill.resources.length > 0 && (
                    <div className="mt-3">
                      <h5 className="font-medium text-gray-700 mb-2 text-sm">Resources:</h5>
                      <div className="space-y-2">
                        {skill.resources.map((resource, index) => (
                          <a
                            key={index}
                            href={resource}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-sm group"
                          >
                            {getFavicon(resource) && (
                              <img src={getFavicon(resource)} alt="favicon" className="w-4 h-4" />
                            )}
                            <span className="text-gray-700 truncate flex-1">{resource}</span>
                            <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-gray-600" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
