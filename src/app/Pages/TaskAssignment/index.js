import React, { useState, useEffect } from "react";
import axios from "axios";

function TaskAssignment({ selectedTeam }) {
  const [tasks, setTasks] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    if (selectedTeam) {
      // Fetch tasks for the selected team
      axios
        .get(`http://localhost:9999/teammanagement/tasks/${selectedTeam._id}`)
        .then((response) => {
          setTasks(response.data.tasks);
        })
        .catch((error) => {
          console.error("Error fetching tasks: ", error);
        });
    }
  }, [selectedTeam]);

  const handleAssignTask = () => {
    // Send a POST request to assign a task to the selected member
    axios
      .post("http://localhost:9999/taskmanagement/assigntask", {
        title: taskTitle,
        description: taskDescription,
        assignedTo: selectedMember,
      })
      .then((response) => {
        console.log(response.data.message);
        alert("Task assigned successfully");
        setTaskTitle("");
        setTaskDescription("");
        // Refresh the tasks list after assigning
        if (selectedTeam) {
          axios
            .get(
              `http://localhost:9999/taskmanagement/tasks/${selectedTeam._id}`
            )
            .then((response) => {
              setTasks(response.data.tasks);
            })
            .catch((error) => {
              console.error("Error fetching tasks: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error assigning task: ", error);
      });
  };

  return (
    <div className="mt-4">
      {selectedTeam ? (
        <div>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">
            Task Assignment
          </h2>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Select Team Member to Assign Task:
            </label>
            <select
              className="w-full p-2 border rounded"
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              <option value="">Select a member</option>
              {selectedTeam.members.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.username}
                </option>
              ))}
            </select>
            <label className="block text-gray-700 text-sm font-semibold mt-4">
              Task Title:
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <label className="block text-gray-700 text-sm font-semibold mt-4">
              Task Description:
            </label>
            <textarea
              className="w-full p-2 border rounded"
              rows="3"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            ></textarea>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold mt-4 py-2 px-4 rounded"
              onClick={handleAssignTask}
            >
              Assign Task
            </button>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Tasks</h2>
            <ul className="list-disc list-inside">
              {tasks.map((task) => (
                <li key={task._id}>
                  <strong>{task.title}:</strong> {task.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Please select a team to assign tasks.</p>
      )}
    </div>
  );
}

export default TaskAssignment;
