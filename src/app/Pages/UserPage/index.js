import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import Header from "../../Components/Header";

function UserPage() {
  const [task, setTask] = useState("");
  const [tasklist, setTasklist] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableTask, setEditableTask] = useState(null);
  const [userTask, setUserTask] = useState([]);

  const userId = sessionStorage.getItem("userId");
  const getRequest = () => {
    axios
      .get(`http://localhost:9999/taskmanagement/tasks/${userId}`)
      .then((response) => {
        console.log("Response data:", response.data); // Log the response data
        setTasklist(response.data);
        console.log(userId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRequest();
  }, []);

  //   function toggleTaskCompletion(_id, completed) {
  //     axios
  //       .patch(`http://localhost:9999/todomanagement/${_id}`, {
  //         completed: !completed, // Toggle the completed value
  //       })
  //       .then((response) => {
  //         getRequest(); // Refresh the task list after updating a task
  //       })
  //       .catch((error) => {
  //         console.error("Error Completing task: ", error);
  //       });
  //   }

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
              {tasklist && tasklist.tasks ? (
                tasklist.tasks.map((task) => (
                  <div key={task._id} className="mb-4">
                    <h5 className="font-semibold text-gray-800">
                      Task Title: {task.title}
                    </h5>
                    <p>Description: {task.description}</p>
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
