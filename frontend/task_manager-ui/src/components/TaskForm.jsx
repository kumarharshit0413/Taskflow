import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [dueDate, setDueDate] = useState(tomorrow.toISOString().split("T")[0]);
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.post(
        "/api/tasks",
        { title, description, dueDate, priority },
        config
      );

      setTitle("");
      setDescription("");
      setDueDate(tomorrow.toISOString().split("T")[0]);
      setPriority("Medium");
      onTaskCreated(response.data);
    } catch (err) {
      setError("Failed to create task. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-6 mb-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-2xl font-extrabold mb-4 text-gray-800 text-center"
      >
        Add a New Task ✍️
      </motion.h2>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-4 p-2 text-center bg-red-100 text-red-600 rounded-lg"
        >
          {error}
        </motion.p>
      )}

      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label htmlFor="dueDate" className="block text-gray-700 font-semibold mb-2">
            Due Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="priority" className="block text-gray-700 font-semibold mb-2">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.05 }}
        whileTap={{ scale: loading ? 1 : 0.95 }}
        className={`w-full font-bold py-2 px-4 rounded-lg shadow-md ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {loading ? "Adding..." : "Add Task"}
      </motion.button>
    </motion.form>
  );
};

export default TaskForm;
