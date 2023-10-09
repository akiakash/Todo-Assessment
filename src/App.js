import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./app/Pages/SignIn";
import SignUp from "./app/Pages/SignUp";
import Todo from "./app/Pages/Todo";
import AssignTask from "./app/Pages/AssignTask";
import UserTasksList from "./app/Pages/ViewTasks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
    // <div>
    //   <AssignTask />
    //   <UserTasksList />
    // </div>
  );
}

export default App;
