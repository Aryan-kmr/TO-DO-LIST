
import { useState } from "react";

export default function TaskList({tasks, updateTask, deleteTask}) {

  const [editingIndex, setEditingIndex] = useState(null);

  const [editText, setEditText] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");
  const [editCategory, setEditCategory] = useState("General");

  // Complete / Undo
  const toggleComplete = (index) => {

    const updatedTask = {...tasks[index],completed: !tasks[index].completed};

    updateTask(updatedTask, index);
  };

  // Start editing
  const startEdit = (index) => {

    const task = tasks[index];

    setEditingIndex(index);
    setEditText(task.text);
    setEditPriority(task.priority);
    setEditCategory(task.category);
  };

  // Save edited task
  const saveEdit = (index) => {

    if (editText.trim() === "") {
      alert("Task cannot be empty.");
      return;
    }

    const updatedTask = {...tasks[index],text: editText.trim(),
        priority: editPriority, category: editCategory};

    updateTask(updatedTask, index);

    setEditingIndex(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <div className="task-list">

      {tasks.length === 0 ? (

        <div className="empty-box">
          <h3>No tasks yet</h3>
          <p>Add a task to get started.</p>
        </div>

      ) : (

        tasks.map((task, index) => (

          <div
            className={ task.completed ? "task-card completed" : "task-card" }
            key={index}>

            {editingIndex === index ? (

              /* EDIT MODE */

              <div className="edit-box">

                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

                <div className="edit-options">

                  <select
                    value={editPriority}
                    onChange={(e) =>
                      setEditPriority(e.target.value)
                    }
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>

                  <select
                    value={editCategory}
                    onChange={(e) =>
                      setEditCategory(e.target.value)
                    }
                  >
                    <option value="General">General</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                  </select>

                </div>

                <div className="edit-buttons">

                  <button
                    className="save-btn"
                    onClick={() => saveEdit(index)}
                  >
                    Save
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>

                </div>

              </div>

            ) : (

              /* NORMAL MODE */

              <>

                <div className="task-info">

                  <div className="task-name">
                    <span>
                      {task.text}
                    </span>
                  </div>

                  <div className="task-details">

                    <span>
                      Priority:- {task.priority}
                    </span>

                    <span>
                      Category:- {task.category}
                    </span>

                  </div>

                </div>

                <div className="task-buttons">

                  <button onClick={() => startEdit(index)}> Edit </button>

                  <button onClick={() => toggleComplete(index)}>{task.completed ? "Undo" : "Complete"}</button>

                  <button className="delete-btn" onClick={() => deleteTask(index)}> Delete </button>

                </div>

              </>

            )}

          </div>

        ))

      )}

    </div>
  );
}
