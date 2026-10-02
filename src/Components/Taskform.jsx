
import { useState } from "react";

export default function TaskForm({ addTask }) {

  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Don't allow empty task
    if (task.trim() === "") {
      alert("Please enter a task.");
      return;
    }

    addTask({ text: task.trim(), priority, category: category, completed: false });

    // Reset form
    setTask("");
    setPriority("Medium");
    setCategory("General");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>

      <div className="input-row">

        <input
          type="text"
          placeholder="Enter your task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button id="btn" type="submit"> Add Task </button>

      </div>

      <div className="options-row">

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>

      </div>

    </form>
  );
}
