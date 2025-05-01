import React, { useState } from 'react';
import { Info } from 'lucide-react';

const EditSkillModal = ({
  currentSkill,
  setEditSkillModal,
  EditSkill,
  fetchData,
}) => {
  const [updatedSkillName, setUpdatedSkillName] = useState(currentSkill.title);
  const [updatedDescription, setUpdatedDescription] = useState(currentSkill.description);
  const [updatedLearntFrom, setUpdatedLearntFrom] = useState(currentSkill.learntFrom);
  const [updatedResources, setUpdatedResources] = useState([...currentSkill.resources || []]);
  const [resource, setResource] = useState('');
  const [submitError, setSubmitError] = useState(false);

  const handleAddResource = () => {
    if (resource.trim().length > 0) {
      setUpdatedResources((prev) => [...prev, resource]);
      setResource('');
    }
  };

  const handleDeleteResource = (index) => {
    setUpdatedResources((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateSkill = async () => {
    if (
      updatedSkillName.trim() === '' ||
      updatedDescription.trim() === '' ||
      updatedLearntFrom.trim() === ''
    ) {
      setSubmitError(true);
      return;
    }

    const updates = {};
    if (currentSkill.title !== updatedSkillName) updates.title = updatedSkillName;
    if (currentSkill.description !== updatedDescription) updates.description = updatedDescription;
    if (currentSkill.learntFrom !== updatedLearntFrom) updates.learntFrom = updatedLearntFrom;
    updates.resources = updatedResources;


    await EditSkill(currentSkill._id, updates);
    await fetchData();
    setEditSkillModal(false);
  };

  return (
    <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-lg shadow-2xl p-6 flex flex-col gap-4">
      <div className="flex justify-end">
        <button onClick={() => setEditSkillModal(false)}>×</button>
      </div>

      {/* Skill Name */}
      <div className="flex flex-col gap-1">
        <input
          value={updatedSkillName}
          onChange={(e) => setUpdatedSkillName(e.target.value)}
          type="text"
          placeholder="Skill Name"
          className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/30"
        />
        {submitError && updatedSkillName.trim() === '' && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <Info className="w-4 h-4" />
            <p>This is required</p>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <input
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
          type="text"
          placeholder="One tip or advice for others learning this skill?"
          className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/30"
        />
        {submitError && updatedDescription.trim() === '' && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <Info className="w-4 h-4" />
            <p>This is required</p>
          </div>
        )}
      </div>

      {/* Learnt From */}
      <div className="flex flex-col gap-1">
        <input
          value={updatedLearntFrom}
          onChange={(e) => setUpdatedLearntFrom(e.target.value)}
          type="text"
          placeholder="Where did you learn it from?"
          className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/30"
        />
        {submitError && updatedLearntFrom.trim() === '' && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <Info className="w-4 h-4" />
            <p>This is required</p>
          </div>
        )}
      </div>

      {/* Add Resource */}
      <div>
        <div className="flex gap-2">
          <input
            value={resource}
            onChange={(e) => setResource(e.target.value)}
            type="text"
            placeholder="Insert resource link"
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/30"
          />
          <button
            onClick={handleAddResource}
            className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-900 transition"
          >
            Add
          </button>
        </div>

        {/* Show added resources */}
        <div className="mt-2">
          {updatedResources.map((res, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg mb-2"
            >
              <p className="text-sm text-gray-700 break-all">{res}</p>
              <button
                onClick={() => handleDeleteResource(index)}
                className="text-sm text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-full transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleUpdateSkill}
        className="mt-4 bg-gradient-to-tr from-gray-100 to-sky-100 text-gray-800 px-6 py-3 rounded-xl border border-gray-300 hover:shadow-md hover:scale-[1.02] transition-all duration-300"
      >
        Update Skill
      </button>
    </div>
  );
};

export default EditSkillModal;
