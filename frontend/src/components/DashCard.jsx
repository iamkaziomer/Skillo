import React from "react";
import { useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";
import EditSkillModal from "./EditSkillModal";
import axios from "axios";
import TrashSkill from "./TrashSkill";
import BioModal from "./BioModal";

// Refined modern, light, and pastel colors
const colors = [
  "bg-cyan-200",
  "bg-lime-200",
  "bg-indigo-200",
  "bg-pink-200",
  "bg-teal-200",
  "bg-blue-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-green-200",
  "bg-red-200",
];

const DashCard = ({
  skills,
  userDetails,
  editSkillModal,
  setEditSkillModal,
  fetchData,
}) => {
  const [currentSkill, setCurrentSkill] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editBioModal, setEditBioModal] = useState(false);
  const [addBioModal, setAddBioModal] = useState(false);
  const [bio,setBio] = useState(userDetails.bio)
  const [error, setError] = useState(false)


  const getDomain = (url) => {
    try {

      const hostname = new URL(url).hostname;
      if(url.length>0&&url!==null)
      return hostname.replace("www.", "");
    } catch (error) {
      console.log("error getting domain");
    }
  };

  const getFavicon = (url) => {
    const domain = getDomain(url);
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    
  };

  // Function to get a random color from the color array
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const EditSkill = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/skill/${id}`,
        updatedData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("edited & saved successfully", response.data);
      return response;
    } catch (error) {
      console.error("error editing the skill", error);
    }
  };

  const deleteSkill = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/skill/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("delted successfully", response.data);
    } catch (error) {
      console.error("error deleting the skill", error);
    }
  };

  const EditBio = async (bio)=>{
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/user/editBio`,{
        bio:bio
      },
      {
        headers:{
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    console.log("edited and saved successfully", response.data)
      setEditBioModal(false)
      fetchData()
    } catch (error) {
      console.error("error editing the bio", error)
    }
  }

  const handleEditSkill = (skill) => {
    setCurrentSkill(skill);
    setEditSkillModal(true);
  };

  const handleDeleteSkill = (skill) => {
    setCurrentSkill(skill);
    setDeleteModal(true);
  };

  return (
    <div className="mt-20 max-w-3xl mx-auto bg-white rounded-lg shadow-lg border border-2-[#212121] overflow-hidden mb-6">
      <div className="p-4">
        {" "}
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl font-bold text-gray-600 mb-4">
            {userDetails.name?.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {userDetails.name}
          </h2>
          <p className="text-gray-600 text-sm mt-1">{userDetails.email}</p>
          <p className="mt-3 text-gray-700 max-w-xs flex items-center gap-2">
            {userDetails.bio || "No bio added yet."}
            <button>
              {!bio==""?(<Pencil className="w-4, h-4" onClick={()=>setEditBioModal(true)} />):(<button onClick={()=>setEditBioModal(true)}>Add Bio</button>)}
            </button>
          </p>
          <span className="mt-2 text-sm text-gray-500">
            Semester: {userDetails.semester}
          </span>
        </div>
        {/* Skills Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {skills &&
            skills.map((skill, skillIndex) => (
              <div
                key={skillIndex}
                className={`border border-2-[#232323] p-4 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {skill.title}
                  </h3>
                  <div className="flex gap-4">

                  <Pencil
                    className="w-4 h-4 cursor-pointer hover:text-blue-800"
                    onClick={() => handleEditSkill(skill)}
                  />
                  <Trash
                    className="w-4 h-4 cursor-pointer hover:text-red-800"
                    onClick={() => handleDeleteSkill(skill)}
                  />
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {skill.description}
                </p>
                {!skill.resources.length==0&&(<p>Resources</p>)}
                <br />
                {skill.resources.map((resource, resourceIndex) => {
                  const domain = getDomain(resource);
                  const favicon = getFavicon(resource);
                  return (
                    <div key={resourceIndex} className="flex">
                      <a
                        href={resource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white p-2 rounded-md hover:bg-gray-100 transition mb-2 text-sm font-medium text-gray-700"
                      >
                        {" "}
                        <img src={favicon} alt="favicon" className="w-5 h-5" />
                        {domain}
                      </a>
                    </div>
                  );
                })}
                {skill.projects && skill.projects.length > 0 && (
                  <div className="">
                    <h4 className="font-semibold text-gray-700">Projects:</h4>
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                      {skill.projects.map((project, projectIndex) => (
                        <li
                          key={projectIndex}
                          className="text-sm text-gray-600"
                        >
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      {editSkillModal && (
        <div>
          <EditSkillModal
            currentSkill={currentSkill}
            setEditSkillModal={setEditSkillModal}
            EditSkill={EditSkill}
            fetchData={fetchData}
          />
        </div>
      )}
      {editBioModal&&(
        <BioModal setEditBioModal={setEditBioModal} setBio={setBio} bio={bio} EditBioFunction={EditBio} />
      )}
      {deleteModal && (
        <div>
          <TrashSkill
            currentSkill={currentSkill}
            setDeleteModal={setDeleteModal}
            deleteSkill={deleteSkill}
            fetchData={fetchData}
          />
        </div>
      )}
    </div>
  );
};

export default DashCard;
