import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import Header from "../../Components/Header";
import UserHeader from "../../Components/UserHeader";

function UserPage() {
  const [tasklist, setTasklist] = useState([]);
  const [taskId, setTaskId] = useState([]);
  const userId = sessionStorage.getItem("userId");

  const getRequest = () => {
    axios
      .get(
        `https://vital-assessment-server-6rfy.vercel.app/taskmanagement/tasks/${userId}`
      )
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
      .patch(
        `https://vital-assessment-server-6rfy.vercel.app/taskmanagement/tasks/${taskId}`,
        {
          complete: !complete,
        }
      )
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
      <UserHeader />
      <div className="flex justify-center w-screen h-screen font-medium ">
        <div className="flex flex-grow items-center justify-center h-full text-gray-600 bg-gray-100">
          <div className="max-w-full p-8 bg-white rounded-lg shadow-lg w-[600px]">
            <div className="flex items-center mb-6">
              <h4 className="font-semibold text-lg">Tasks</h4>
            </div>
            <div>
              {tasklist.length > 0 ? (
                tasklist.map((task) => (
                  <div key={task._id} className="mb-4 flex flex-row gap-4">
                    <div className="flex flex-row gap-4 items-center">
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
                        htmlhtmlFor={`task_${task._id}`}
                      >
                        <span className="font-semibold text-gray-800">
                          Title: {task.title}
                        </span>
                        <span className="ml-4 font-semibold text-gray-800">
                          Description: {task.description}
                        </span>
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
