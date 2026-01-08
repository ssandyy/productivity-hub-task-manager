"use client";

import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:1234/task";

export default function Home() {
  const [Task, setTask] = useState("");
  const [TaskList, setTaskList] = useState<{ id: number; text: string, done: boolean }[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  // Fetch tasks from backend on load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(API_URL);
        if (res.ok) {
          const data = await res.json();
          setTaskList(data);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, []);


  const handleUpdateTask = async () => {
    if (editingText.trim() !== "" && editingTaskId !== null) {
      try {
        const response = await fetch(`${API_URL}/${editingTaskId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: editingText.trim() }),
        });
        if (response.ok) {
          const updatedTask = await response.json();
          setTaskList(
            TaskList.map((task) =>
              task.id === editingTaskId ? updatedTask : task
            )
          );
          setEditingTaskId(null);
          setEditingText("");
        }
      } catch (error) {
        console.error("Failed to update task:", error);
      }
    }
  };

  const handleAddTask = async () => {
    if (Task.trim() !== "") {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: Task }),
        });
        if (response.ok) {
          const newTask = await response.json();
          setTaskList([...TaskList, newTask]);
          setTask("");
        }
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    }
  };

  const toggleTask = async (id: number) => {
    const task = TaskList.find(t => t.id === id);
    if (!task) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !task.done }),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setTaskList(TaskList.map(t => t.id === id ? updatedTask : t))
      }
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  }

  const handleDeleteTask = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTaskList(TaskList.filter((task) => task.id != id));
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  return (
    <main
      className={`min-h-screen pt-12 items-center ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-red-200 to-gray-500 text-gray-900"
        } `}
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-2">
          Welcome to Productivity Hub
        </h1>
        <p className="text-lg">
          Your all-in-one solution for managing tasks, notes, and projects
          efficiently.
        </p>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 bg-gray-300 p-3 rounded-full"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="mt-10 flex justify-center space-x-4">
        <input
          type="text"
          placeholder="add tasks, notes, projects..."
          value={editingTaskId ? editingText : Task}
          onChange={(e) =>
            editingTaskId
              ? setEditingText(e.target.value)
              : setTask(e.target.value)
          }
          className={`w-1/2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300 transition ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900"
            }`}
        />
        <button
          onClick={editingTaskId ? handleUpdateTask : handleAddTask}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition font-semibold"
        >
          {editingTaskId ? "Update" : "Add Task"}
        </button>
        {editingTaskId && (
          <button
            onClick={() => {
              setEditingTaskId(null);
              setEditingText("");
            }}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </div>
      <div className="mt-5 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? "text-blue-400" : "text-gray-900"}`}>Task List</h2>
        {TaskList.length === 0 ? (
          <p className="text-gray-600">No tasks added yet</p>
        ) : (
          <ul className="list-disc list-inside space-y-2 rounded-md">
            {TaskList.map((task) => (
              <li
                className="flex justify-between bg-green-100 py-2 px-4 rounded-md items-center"
                key={task.id}
              >
                <div className={`flex items-center`}>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className="w-6 h-6 text-red-600 rounded focus:ring-red-500"
                  />
                  <span
                    className={`ml-4 text-lg ${task.done
                      ? "line-through text-gray-500 opacity-70"
                      : "text-gray-800"
                      }`}
                  >
                    {task.text}
                  </span>
                </div>
                <div className="gap-2 flex">
                  <button
                    onClick={() => {
                      setEditingTaskId(task.id);
                      setEditingText(task.text);
                    }}
                    className="ml-4 hover:text-blue-800 font-medium bg-orange-200 rounded-md p-2"
                  >
                    Edit
                  </button>
                  <button
                    className="p-2 bg-red-200 rounded-md"
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
