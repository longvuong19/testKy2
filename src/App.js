import React, { useState, useEffect } from "react";
import "./App.css";

const Filters = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState(Filters.ALL);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = {
        id: Math.floor(Math.random() * 1000),
        content: inputValue,
        completed: false,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setInputValue("");
    }
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleDeleteAllTasks = () => {
    setTasks([]);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case Filters.ACTIVE:
        return tasks.filter((task) => !task.completed);
      case Filters.COMPLETED:
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className="App">
      <h1>#todo App</h1>

      <div className="TaskList">
        <div className="FiltersBtns">
          <button
            className={filter === Filters.ALL ? "active" : ""}
            onClick={() => handleFilterChange(Filters.ALL)}
          >
            All
          </button>
          <button
            className={filter === Filters.ACTIVE ? "active" : ""}
            onClick={() => handleFilterChange(Filters.ACTIVE)}
          >
            Active
          </button>
          <button
            className={filter === Filters.COMPLETED ? "active" : ""}
            onClick={() => handleFilterChange(Filters.COMPLETED)}
          >
            Completed
          </button>
        </div>

        <div className="AddTask">
          <input
            type="text"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={handleInputChange}
            style={{ paddingLeft: 8 }}
          />
          <button onClick={handleAddTask} className="addBtn">
            Add
          </button>
        </div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {getFilteredTasks().map((task) => (
            <li key={task.id}>
              <div className="Tasks">
                <div style={{ display: 'flex', marginBottom: 20 }}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCompleteTask(task.id)}
                    style={{ width: 16, height: 16, cursor: 'pointer' }}
                  />
                  <div className={task.completed ? "completed" : ""}>
                    {task.content}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="delBtn"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        {tasks.length > 0 && (
          <div className="TaskDelAll">
            <button onClick={handleDeleteAllTasks} className="delBtn">
              Delete All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
