import React from "react";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <button onClick={onClose} className="text-xl font-semibold text-gray-500 hover:text-gray-800">
            ×
          </button>
        </div>
        <p className="text-gray-600 text-sm mb-2">{profile.branch} — Semester {profile.semester}</p>
        {profile.bio && <p className="text-gray-700 mb-4">{profile.bio}</p>}

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[65vh] pr-2">
          <h3 className="text-lg font-medium mb-2">Skills</h3>
          <ul className="space-y-4">
            {profile.skills.length === 0 ? (
              <li className="text-gray-400">No skills added</li>
            ) : (
              profile.skills.map((skill) => (
                <li key={skill._id} className="border-b pb-2 border-gray-200">
                  <p className="font-semibold text-gray-800">{skill.title}</p>
                  {skill.description && <p className="text-gray-600 text-sm">{skill.description}</p>}
                  {skill.resources && skill.resources.length > 0 && (
                    <div className="mt-1 text-xs text-gray-600">
                      <h4 className="font-medium">Resources:</h4>
                      <ul className="list-disc pl-5">
                        
                        {skill.resources.map((resource, index) => (
                          <li key={index} className="flex items-center gap-2 p-2 border border-2-[#232323] rounded-2xl">
                            {getFavicon(resource) && (
                              <img src={getFavicon(resource)} alt="favicon" className="w-4 h-4" />
                            )}
                            <a
                              href={resource}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline break-all"
                            >
                              {resource}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
