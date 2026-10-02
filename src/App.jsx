
import Taskform from "./Components/Taskform";
import Tasklist from "./Components/Tasklist";
import Progresstracker from "./Components/Progresstracker";
import { useEffect, useState } from "react";

export default function App() {

  // Load tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Load theme from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true";
  });

  // Save tasks whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save theme
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Add task
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Update task
  const updateTask = (updatedTask, index) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
  };

  // Delete task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Clear all tasks
  const clearTasks = () => {

    const confirmClear = window.confirm(
      "Are you sure you want to clear all tasks?"
    );

    if (confirmClear) {
      setTasks([]);
    }
  };

  // Change theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>

      <div className="container">

        {/* Header */}

        <div className="header">

          <div>
            <h1>To-Do List</h1>
            <p>Simple Task Manager</p>
          </div>

          <button
            className="theme-btn"
            onClick={toggleTheme}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>

        {/* Add Task */}

        <Taskform addTask={addTask} />

        {/* Progress */}

        <Progresstracker tasks={tasks} />

        {/* Tasks */}

        <Tasklist
          tasks={tasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />

        {/* Clear All */}

        {tasks.length > 0 && (
          <button
            className="clear-btn"
            onClick={clearTasks}
          >
            Clear All Tasks
          </button>
        )}

      </div>

    </div>
  );
}
