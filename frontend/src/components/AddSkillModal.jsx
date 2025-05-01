import React, { useState } from "react";

const AddSkillModal = ({ addFunction, setAddSkillModal,buttonStatus }) => {
  const [skillName, setSkillName] = useState("");
  const [description, setDescription] = useState("");
  const [learntFrom, setLearntFrom] = useState("");
  const [resource, setResource] = useState("");
  const [skillResources, setSkillResources] = useState([""]);
  const [dataError, setDataError] = useState(false)
  const [buttonStatus, setButtonStatus] = useState(false)

  const handleAddResource = (resource) => {

    if (resource.length > 0 && resource!=="") {
      setSkillResources((prev) => [...prev, resource]);
      setResource("");
    }console.log('please empty resources')
  };
  return (
    <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-lg shadow-2xl p-6 flex flex-col gap-4">
      <div className="flex justify-end">
        <button className="item-right" onClick={() => setAddSkillModal(false)} >x</button>

      </div>
      <input
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
        type="text"
        placeholder="Skill Name"
        className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/30"
      />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="One tip or advice for others learning this skill?"
        className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/30"
      />

      <input
        value={learntFrom}
        onChange={(e) => setLearntFrom(e.target.value)}
        type="text"
        placeholder="Where did you learn it from?"
        className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/30"
      />
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
            onClick={() => handleAddResource(resource)}
            className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-900 transition"
          >
            Add
          </button>
        </div>
        <div>
          {skillResources.map((resource, index) => (
            <p key={index}>{resource}</p>
          ))}
        </div>
      </div>

      <button disable={buttonStatus}
        onClick={() => 
          addFunction(skillName, description, learntFrom, skillResources)
        }
        className="mt-4 bg-gradient-to-tr from-gray-100 to-sky-100 text-gray-800 px-6 py-3 rounded-xl border border-gray-300 hover:shadow-md hover:scale-[1.02] transition-all duration-300"
      >
        Submit Skill
      </button>
    </div>
  );
};

export default AddSkillModal;
