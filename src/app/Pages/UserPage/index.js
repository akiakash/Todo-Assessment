import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import Header from "../../Components/Header";

function UserPage() {
  const [tasklist, setTasklist] = useState([]);
  const [taskId, setTaskId] = useState([]);
  const userId = sessionStorage.getItem("userId");

  const getRequest = () => {
    axios
      .get(`http://localhost:9999/taskmanagement/tasks/${userId}`)
      .then((response) => {
        setTasklist(response.data.tasks);

        setTaskId(response.data.task._id);
        console.log("taskid", taskId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTaskUpdate = (taskId, complete) => {
    axios
      .patch(`http://localhost:9999/taskmanagement/tasks/${taskId}`, {
        complete: !complete,
      })
      .then((response) => {
        getRequest(); // Refresh the task list after the update
        console.log(response.data.complete);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center w-screen h-screen font-medium">
        <div className="flex flex-grow items-center justify-center h-full text-gray-600 bg-gray-100">
          <div className="max-w-full p-8 bg-white rounded-lg shadow-lg w-96">
            <div className="flex items-center mb-6">
              <h4 className="font-semibold ml-3 text-lg">Akash's Tasks</h4>
            </div>
            <div>
              {tasklist.length > 0 ? (
                tasklist.map((task) => (
                  <div key={task._id} className="mb-4 flex flex-row gap-4">
                    <div className="flex flex-row gap-4">
                      <input
                        type="checkbox"
                        checked={task.complete}
                        className="round-checkbox"
                        onChange={() =>
                          handleTaskUpdate(task._id, task.complete)
                        }
                      />

                      <label
                        className={`flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100 ${
                          task.completed ? "completed" : ""
                        }`}
                        htmlFor={`task_${task._id}`}
                      >
                        <span className="font-semibold text-gray-800">
                          No: {task.title}
                        </span>
                        <span>Description: {task.description}</span>
                      </label>
                    </div>
                  </div>
                ))
              ) : (
                <p>No tasks available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
