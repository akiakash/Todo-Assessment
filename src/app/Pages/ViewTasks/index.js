// UserTasksList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function UserTasksList() {
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    // Fetch all users
    axios
      .get(
        "https://vital-assessment-server-6rfy.vercel.app/authmanagement/users/"
      )
      .then((userResponse) => {
        const users = userResponse.data;

        // Fetch tasks for each user
        const userTaskPromises = users.map((user) =>
          axios.get(
            `https://vital-assessment-server-6rfy.vercel.app/taskmanagement/tasks/${user._id}`
          )
        );

        Promise.all(userTaskPromises)
          .then((taskResponses) => {
            // Combine users and their respective tasks
            const userTasksData = users.map((user, index) => ({
              user,
              tasks: taskResponses[index].data.tasks,
            }));
            setUserTasks(userTasksData);
          })
          .catch((error) => {
            console.error("Error fetching tasks: ", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching users: ", error);
      });
  }, []);

  return (
    <div>
      <h2>All Users and Their Tasks</h2>
      {userTasks.map((userTaskData) => (
        <div key={userTaskData.user._id}>
          <h3>User: {userTaskData.user.username}</h3>
          <ul>
            {userTaskData.tasks.map((task) => (
              <li key={task._id}>
                <strong>Title:</strong> {task.title}
                <br />
                <strong>Description:</strong> {task.description}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default UserTasksList;
