import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import Header from "../../Components/Header";

function Todo() {
  const [task, setTask] = useState("");
  const [tasklist, setTasklist] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableTask, setEditableTask] = useState(null);
  const [userTask, setUserTask] = useState([]);

  function addTask() {
    axios
      .post("http://localhost:9999/todomanagement/", {
        task: task,
      })
      .then((res) => {
        alert("Successfully added");
        setTask("");
        getRequest(); // Refresh the task list after adding a new task
      })
      .catch((err) => {
        alert("Failed");
      });
  }

  const getRequest = () => {
    axios
      .get(`http://localhost:9999/todomanagement/`)
      .then((res) => {
        setTasklist(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRequest();
  }, []);

  function deleteTask(_id) {
    alert("Are you sure you want to delete?");
    fetch(`http://localhost:9999/todomanagement/${_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        response.json();
        alert("Task Successfully Deleted...!");
        getRequest(); // Refresh the task list after deleting a task
      })
      .catch((error) => {
        console.error("Error deleting task: ", error);
      });
  }

  // function closeModal(_id) {
  //   setIsModalOpen(false);
  //   setEditableTask(null); // Clear the editable task when closing the modal
  // }

  function openModal(_id) {
    // Fetch data based on the ID
    axios
      .get(`http://localhost:9999/todomanagement/${_id}`)
      .then((response) => {
        // Print the response data
        console.log("Response data for ID", _id, ":", response.data);

        console.log(response.data.task);
        console.log(response);
        setUserTask(response.data.task);
        setEditableTask(response.data);
        console.log("editable task:", editableTask);
        // Then, open the modal
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function updateTask() {
    if (editableTask) {
      axios
        .patch(`http://localhost:9999/todomanagement/${editableTask._id}`, {
          task: editableTask.task,
          // Provide the task property
        })
        .then((response) => {
          alert("Task Successfully Updated...!");
          getRequest(); // Refresh the task list after updating a task
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("Error updating task: ", error);
        });
    }
  }

  function toggleTaskCompletion(_id, completed) {
    axios
      .patch(`http://localhost:9999/todomanagement/${_id}`, {
        completed: !completed, // Toggle the completed value
      })
      .then((response) => {
        getRequest(); // Refresh the task list after updating a task
      })
      .catch((error) => {
        console.error("Error Completing task: ", error);
      });
  }

  return (
    <div>
      <Header />
      <div class="flex items-center justify-center w-screen h-screen font-medium">
        <div class="flex flex-grow items-center justify-center h-full text-gray-600 bg-gray-100">
          <div class="max-w-full p-8 bg-white rounded-lg shadow-lg w-96">
            <div class="flex items-center mb-6">
              <h4 class="font-semibold ml-3 text-lg">Akash's Tasks</h4>
            </div>
            <div>
              {tasklist.map((item) => (
                <div className="flex flex-row justify-between items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`task_${item._id}`}
                      checked={item.completed}
                      className="round-checkbox"
                      onChange={() =>
                        toggleTaskCompletion(item._id, item.completed)
                      }
                    />
                    <label
                      className={`flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100 ${
                        item.completed ? "completed" : ""
                      }`}
                      htmlFor={`task_${item._id}`}
                    >
                      <span className="ml-4 text-sm">{item.task}</span>
                    </label>
                  </div>

                  <div className="flex flex-row gap-4">
                    <div
                      className="cursor-pointer"
                      onClick={() => openModal(item._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => deleteTask(item._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button class="flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded">
              <div onClick={addTask}>
                <svg
                  class="w-5 h-5 text-gray-400 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <input
                className="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium"
                type="text"
                onChange={(e) => setTask(e.target.value)}
              />
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="bg-white p-4 w-[300px] rounded-lg shadow-lg z-50 text-center">
            <h2 className="text-lg font-semibold mb-2 text-center">
              Edit Task
            </h2>
            <input
              className="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium"
              type="text"
              defaultValue={userTask}
              onChange={(e) => {
                setEditableTask({ ...editableTask, task: e.target.value });
                console.log(editableTask);
              }}
            />

            <button
              className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              onClick={updateTask}
            >
              UPDATE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Todo;
