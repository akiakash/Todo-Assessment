import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css"; // Import your CSS file for styling

function AssignTask() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    // Fetch users from the backend
    axios
      .get(
        "https://vital-assessment-server-6rfy.vercel.app/authmanagement/users/"
      )
      .then((response) => {
        setUsers(response.data);
      });
  }, []);

  const handleTaskSubmit = () => {
    // Create a new task and assign it to the selected user
    axios
      .post(
        "https://vital-assessment-server-6rfy.vercel.app/taskmanagement/assigntask",
        {
          title: taskTitle,
          description: taskDescription,
          assignedTo: selectedUserId,
        }
      )
      .then((response) => {
        console.log(response.data.message);
        // Clear the input fields after creating the task
        setTaskTitle("");
        setTaskDescription("");
      })
      .catch((error) => {
        console.error("Error creating task: ", error);
      });
  };

  return (
    <div className="assign-task-container">
      <h1>Task Assignment App</h1>
      <div className="form-group">
        <label>Select a user to assign a task:</label>
        <select
          className="select-user"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Task Title:</label>
        <input
          className="task-input"
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Task Description:</label>
        <input
          className="task-input"
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </div>
      <button className="assign-button" onClick={handleTaskSubmit}>
        Assign Task
      </button>
    </div>
  );
}

export default AssignTask;
