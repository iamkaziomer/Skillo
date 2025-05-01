import React, { useState, useEffect } from "react";
import DashCard from "../components/DashCard";
import axios from "axios";
import AddSkillModal from "../components/AddSkillModal";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [addSkillModal, setAddSkillModal] = useState(false);
  const [editSkillModal, setEditSkillModal] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false)


  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/skill/get`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.data) {
        throw new Error("Failed to fetch data");
      }
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const AddSkill = async (title, description, learntFrom, resources) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/skill/create`,
        {
          title: title,
          description: description,
          learntFrom: learntFrom,
          resources: resources,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAddSkillModal(false);
      console.log("created successfully", response.data);
      setButtonStatus(true)
      await fetchData();
    } catch (error) {
      console.log("error adding skill", error);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      setData(null);
      setError(null);
    };
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Loading...</p>;

  if (data && data.success && data.skills && data.userDetails) {
    return (
      <>
        <DashCard
          fetchData={fetchData}
          skills={data.skills}
          userDetails={data.userDetails}
          setEditSkillModal={setEditSkillModal}
          editSkillModal={editSkillModal}
        />
        {addSkillModal && (
          <div>
            <AddSkillModal
              addFunction={AddSkill}
              setAddSkillModal={setAddSkillModal}
              buttonStatus={buttonStatus}
            />
          </div>
        )}
        <div>
          <button
            onClick={() => setAddSkillModal(true)}
            className="fixed bottom-10 right-10 px-5 py-2 bg-white text-gray-700 border border-gray-300 rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 hover:text-black transition-all duration-200 font-semibold"
          >
            Add Skill +
          </button>
        </div>
      </>
    );
  }
};

export default Dashboard;
