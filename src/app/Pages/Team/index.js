import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskAssignment from "../TaskAssignment/index"; // Import the TaskAssignment component

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-blue-600 mb-4">
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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        onClick={handleCreateTeam}
      >
        Create Team
      </button>

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
        <h2 className="text-3xl font-semibold text-blue-600 mb-4">Teams</h2>
        <ul className="list-none">
          {teams.map((team) => (
            <li
              key={team._id}
              onClick={() => handleTeamClick(team)}
              className="cursor-pointer text-blue-600 hover:text-blue-800"
            >
              {team.name}
            </li>
          ))}
        </ul>
        {selectedTeam && (
          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              Selected Team Members
            </h2>
            <ul className="list-disc list-inside">
              {selectedTeam.members.map((member) => (
                <li key={member._id}>{member.username}</li>
              ))}
            </ul>
            <TaskAssignment selectedTeam={selectedTeam} />{" "}
            {/* TaskAssignment component */}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamForm;
