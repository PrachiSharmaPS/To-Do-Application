import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
   
      <div className="nav-links">
        <h2 className="logo">To Do App</h2>
        <div>
        <Link to={"/"} className="nav-link">
          Home
        </Link>
        <Link to={"/login"} className="nav-link">
          Login
        </Link>
        <Link to={"/register"} className="nav-link">
          Register
        </Link>
      </div>
      </div>
 

    <div class="body-container">
      <h1 class="title">Welcome to Task Tracker</h1>
      <p class="description">
      Task Tracker is an application designed to help you stay on top of your daily tasks and increase your productivity. With Task Tracker, you can easily create and manage your to-do lists, set reminders for important deadlines, and track your progress as you work towards completing your tasks
      </p>
     
    </div>
   
  
    </>
  );
}
