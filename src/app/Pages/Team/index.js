import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskAssignment from "../TaskAssignment/index"; // Import the TaskAssignment component
import Header from "../../Components/Header";
import "./index.css";

function TeamForm() {
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [createdTeam, setCreatedTeam] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:9999/authmanagement/users/")
      .then((response) => {
        setUsers(response.data);
      });

    axios
      .get("http://localhost:9999/teammanagement/viewteams")
      .then((response) => {
        setTeams(response.data.teams);
      })
      .catch((error) => {
        console.error("Error fetching teams: ", error);
      });
  }, []);

  const handleCreateTeam = () => {
    axios
      .post("http://localhost:9999/teammanagement/createteam", {
        memberIds: selectedMembers,
        teamName: teamName,
      })
      .then((response) => {
        console.log(response.data.message);
        alert("Team created successfully");
        setSelectedMembers([]);
        setTeamName("");
        setCreatedTeam(response.data.team);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error creating team: ", error);
      });
  };

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  useEffect(() => {
    // Add an event listener to close the modal when clicking outside of it
    const closeModal = (e) => {
      if (e.target.classList.contains("modal")) {
        setSelectedTeam(null);
      }
    };

    window.addEventListener("click", closeModal);

    return () => {
      window.removeEventListener("click", closeModal);
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 pt-[50px]">
        <h1 className="text-3xl font-semibold text-blue-600 mb-4 text-center text-[#D7263D]">
          Create a Team
        </h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Select Team Members:
          </label>
          <select
            multiple
            className="w-full p-2 border rounded"
            value={selectedMembers}
            onChange={(e) =>
              setSelectedMembers(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Team Name:
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-[#D7263D]  text-white font-semibold py-2 px-4 rounded"
            onClick={handleCreateTeam}
          >
            Create Team
          </button>
        </div>

        {createdTeam && (
          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-green-600 mb-2">
              Team Members
            </h2>
            <ul className="list-disc list-inside">
              {createdTeam.members.map((member) => (
                <li key={member._id}>{member.username}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-3xl font-semibold text-blue-600 mb-4 text-[#D7263D] text-center">
            Teams
          </h2>
          <ul className="list-none p-0 m-0">
            <h1 className="text-center text-[#D7263D] mb-4 text-2xl font-bold">
              Select a team to manage tasks
            </h1>
            {teams.map((team, index) => (
              <li
                key={team._id}
                onClick={() => handleTeamClick(team)}
                className="cursor-pointer bg-white hover:bg-gray-100 p-4 border border-gray-200 rounded shadow-md mb-4 flex items-center justify-between transition-transform transform hover:scale-105"
              >
                <div className="flex items-center">
                  <div className="bg-[#D7263D] text-white p-2 rounded-full mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#D7263D]">
                      {team.name}
                    </h3>
                    <p className="text-gray-600">{team.description}</p>
                  </div>
                </div>
                <div className="text-[#D7263D]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 5.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L8.586 8 5.293 4.707a1 1 0 0 1 0-1.414z"
                    />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal for "Selected Team Members" section */}
      <div className={`modal ${selectedTeam ? "visible" : ""}`}>
        <div className="modal-content">
          <div
            className="close-icon flex justify-end cursor-pointer"
            onClick={() => setSelectedTeam(null)}
          >
            &#10006; {/* Close icon (X) */}
          </div>
          <h2 className="text-2xl font-semibold text-[#D7263D]  mb-2">
            Selected Team Members
          </h2>
          <ul className="list-disc list-inside">
            {selectedTeam &&
              selectedTeam.members.map((member) => (
                <li key={member._id}>{member.username}</li>
              ))}
          </ul>
          <TaskAssignment selectedTeam={selectedTeam} />
        </div>
      </div>
    </div>
  );
}

export default TeamForm;
