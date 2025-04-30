import React from 'react'
import {useState} from "react"

const EditSkillModal = ({currentSkill, setEditSkillModal, EditSkill,fetchData}) => {

    const [updatedSkillName, setUpdatedSkillName] = useState(currentSkill.title)
    const [updatedDescription, setUpdatedDescription] = useState(currentSkill.description)
    const [updatedLearntFrom, setUpdatedLearntFrom] = useState(currentSkill.learntFrom)
    const [updatedResource, setUpdatedResource] = useState(currentSkill.resources)
    const [resource, setResource] = useState("")

    const handleAddResource = (resource) => {
        setUpdatedResource((prev) => [...prev, resource]);
        setResource("");
      };
    const handleSubmitSkill = async ()=>{
        const updates = {}

        if(currentSkill.title!==updatedSkillName){
            updates.title = updatedSkillName
        }
        if(currentSkill.description!==updatedDescription){
            updates.description = updatedDescription
        }
        if(currentSkill.learntFrom!==updatedLearntFrom){
            updates.learntFrom = updatedLearntFrom
        }
        if(currentSkill.resources!==updatedResource){
            updates.resources = updatedResource
        }

        await EditSkill(currentSkill._id, updates)
        await fetchData()
        setEditSkillModal(false)
        console.log(updates)

    }
  return (
    <div>
         <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-lg shadow-2xl p-6 flex flex-col gap-4">
        <div className="flex justify-end">
        <button className="item-right" onClick={()=>setEditSkillModal(false)} >x</button>

        </div>
      <input
        value={updatedSkillName}
        onChange={(e) => setUpdatedSkillName(e.target.value)}
        type="text"
        placeholder="Skill Name"
        className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/30"
      />

      <input
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
        type="text"
        placeholder="One tip or advice for others learning this skill?"
        className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/30"
      />

      <input
        value={updatedLearntFrom}
        onChange={(e) => setUpdatedLearntFrom(e.target.value)}
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
          {updatedResource.map((resource, index) => (
            <p key={index}>{resource}</p>
            
          ))}

        </div>
      </div>

      <button
        onClick={() =>
            handleSubmitSkill()
        }
        className="mt-4 bg-gradient-to-tr from-gray-100 to-sky-100 text-gray-800 px-6 py-3 rounded-xl border border-gray-300 hover:shadow-md hover:scale-[1.02] transition-all duration-300"
      >
        Update Skill
      </button>
    </div>
    </div>
  )
}

export default EditSkillModal