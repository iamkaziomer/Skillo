import React, { useState } from 'react';
import { X } from 'lucide-react';

const BioModal = ({ bio, setEditBioModal, setBio, EditBioFunction }) => {
  const [editedBio, setEditedBio] = useState(bio || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!editedBio.trim()) return; // prevent empty submit
    setLoading(true);
    EditBioFunction(editedBio);
    setEditBioModal(false);
    setLoading(false);
    setBio(editedBio)
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-lg shadow-2xl p-6 flex flex-col gap-6">
      
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Edit Bio</h2>
        <button onClick={() => setEditBioModal(false)} className="text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Input */}
      <textarea
        value={editedBio}
        onChange={(e) => setEditedBio(e.target.value)}
        onKeyDown={handleKeyDown}
        rows="4"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none bg-white/70 placeholder-gray-400"
        placeholder="Tell something about yourself..."
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !editedBio.trim()}
        className={`bg-gray-900 text-white py-2 rounded-lg transition ${
          loading || !editedBio.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
        }`}
      >
        {loading ? "Saving..." : "Submit"}
      </button>
    </div>
  );
};

export default BioModal;
