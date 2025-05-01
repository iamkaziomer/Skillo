import React, { useState } from "react";
import { Info } from 'lucide-react'

const AddSkillModal = ({ addFunction, setAddSkillModal, buttonStatus }) => {
  const [skillName, setSkillName] = useState("");
  const [description, setDescription] = useState("");
  const [learntFrom, setLearntFrom] = useState("");
  const [resource, setResource] = useState("");
  const [skillResources, setSkillResources] = useState([]);
  const [submitHandler, setSubmitHandler] = useState(false) // to check if the user pressed button 


  // to append all the resources in one array
  const handleAddResource = (resource) => {

    if (resource.length > 0) {
      setSkillResources((prev) => [...prev, resource]);
      setResource("");
      console.log(resource)
    }
    else {
      console.log('empty resource not allowed')
    }
  };

  // delete any specific resource from the list 
  const handleDeleteResource = (index) => {
    setSkillResources(prev => prev.filter((_, i) => i !== index))
  }

  // main function which trigeers the api and handles empty fieids
  const handleSubmitSkill = () => {
    if (skillName == "" || description == "" || learntFrom == "") {
      setSubmitHandler(true)

    }
    else {
      setSubmitHandler(false)
      addFunction(skillName, description, learntFrom, skillResources)
    }
  }


  return (
    <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-lg shadow-2xl p-6 flex flex-col gap-4">
      <div className="flex justify-end">
        <button className="item-right" onClick={() => setAddSkillModal(false)} >x</button>

      </div>
      <div className="flex flex-col gap-1">

        <input
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          type="text"
          placeholder="Skill Name"
          className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/30"
        />
        {submitHandler && skillName == "" ? (<div className='flex items-center gap-3'>
          <Info className="w-3.5 h-3.5 text-red-600" />
          <p className="text-red-600 text-sm">this is required</p>
        </div>) : <></>}

      </div>

      <div className='flex flex-col gap-1'>

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="One tip or advice for others learning this skill?"
          className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/30"
        />{submitHandler && description == "" ? (<div className='flex items-center gap-3'>
          <Info className="w-3.5 h-3.5 text-red-600" />
          <p className="text-red-600 text-sm">this is required</p>
        </div>) : <></>}
      </div>

      <div className='flex flex-col gap-1'>

        <input
          value={learntFrom}
          onChange={(e) => setLearntFrom(e.target.value)}
          type="text"
          placeholder="Where did you learn it from?"
          className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/30"
        />
        {submitHandler && learntFrom == "" ? (<div className='flex items-center gap-3'>
          <Info className="w-3.5 h-3.5 text-red-600" />
          <p className="text-red-600 text-sm">this is required</p>
        </div>) : <></>}
      </div>


      <div>
        <div className="flex gap-2">
          <input
            value={resource}
            onChange={(e) => setResource(e.target.value)}
            type="text"
            placeholder="Insert resource link(optional)"
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
            <div key={index} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg mb-2 mt-2">
              <p className="text-sm text-gray-700 break-all">{resource}</p>
              <button onClick={() => handleDeleteResource(index)}
                className="text-sm text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-full transition"
                aria-label="Remove resource"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

      </div>

      <button disabled={buttonStatus}
        onClick={() =>
          handleSubmitSkill()
        }
        className="mt-4 bg-gradient-to-tr from-gray-100 to-sky-100 text-gray-800 px-6 py-3 rounded-xl border border-gray-300 hover:shadow-md hover:scale-[1.02] transition-all duration-300"
      >
        Submit Skill
      </button>
    </div>
  );
};

export default AddSkillModal;
