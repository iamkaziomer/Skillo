import React from "react";
import { useState } from "react";
import { Pencil, Trash, Plus, Github, Linkedin } from "lucide-react";
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
    <div className="mt-20 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
      <div className="p-8">
        {" "}
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-5xl font-bold text-white mb-6 shadow-lg">
            {userDetails.name?.charAt(0)}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {userDetails.name}
          </h2>
          <p className="text-gray-600 mb-4">{userDetails.email}</p>
          
          <div className="flex gap-4 mb-4">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              {userDetails.branch}
            </span>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              Semester {userDetails.semester}
            </span>
          </div>
          
          {/* Social Links */}
          {(userDetails.linkedinUrl || userDetails.githubUrl) && (
            <div className="flex gap-3 mb-4">
              {userDetails.linkedinUrl && (
                <a
                  href={userDetails.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              )}
              {userDetails.githubUrl && (
                <a
                  href={userDetails.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
            </div>
          )}
          
          <div className="flex items-center gap-3 max-w-md">
            {userDetails.bio || "No bio added yet."}
            <button className="text-blue-600 hover:text-blue-800 transition">
              {bio !== "" ? (
                <Pencil className="w-4 h-4" onClick={() => setEditBioModal(true)} />
              ) : (
                <span className="text-sm underline" onClick={() => setEditBioModal(true)}>Add Bio</span>
              )}
            </button>
          </div>
        </div>
        
        {/* Skills Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">My Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills &&
            skills.map((skill, skillIndex) => (
              <div
                key={skillIndex}
                className="border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-semibold text-gray-800">
                    {skill.title}
                  </h4>
                  <div className="flex gap-2">
                    <Pencil
                      className="w-5 h-5 cursor-pointer text-gray-500 hover:text-blue-600 transition"
                      onClick={() => handleEditSkill(skill)}
                    />
                    <Trash
                      className="w-5 h-5 cursor-pointer text-gray-500 hover:text-red-600 transition"
                      onClick={() => handleDeleteSkill(skill)}
                    />
                  </div>
                </div>
                <p className="text-gray-600 mb-4 mt-2">
                  {skill.description}
                </p>
                
                {skill.learntFrom && (
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-500">Learned from:</span>
                    <p className="text-gray-700">{skill.learntFrom}</p>
                  </div>
                )}
                
                {skill.resources.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 mb-2">Resources:</h5>
                    <div className="space-y-2">
                {skill.resources.map((resource, resourceIndex) => {
                  const domain = getDomain(resource);
                  const favicon = getFavicon(resource);
                  return (
                    <a
                      key={resourceIndex}
                      href={resource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition text-sm"
                    >
                      <img src={favicon} alt="favicon" className="w-4 h-4" />
                      <span className="text-gray-700 truncate">{domain}</span>
                    </a>
                  );
                })}
                    </div>
                  </div>
                )}
                
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
