import axios from 'axios';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

const TaskItem = ({ task, onTaskUpdate, onTaskDelete, onEdit, provided, snapshot }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStatusToggle = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      const response = await axios.put(`/api/tasks/${task._id}`, { status: newStatus }, config);
      onTaskUpdate(response.data);
    } catch (error) {
      console.error('Failed to update task status', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`/api/tasks/${task._id}`, config);
        onTaskDelete(task._id);
      } catch (error) {
        console.error('Failed to delete task', error);
      }
    }
  };

  return (
    <motion.div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`p-4 bg-white rounded-lg shadow w-full relative border-l-4 ${
        { High: 'border-red-500', Medium: 'border-yellow-500', Low: 'border-blue-500' }[task.priority]
      } ${snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''} ${
        task.status === 'completed' ? 'opacity-60' : ''
      }`}
    >
      <div>
        <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </h3>
        {task.description && <p className="text-gray-600 my-1 text-sm">{task.description}</p>}
      </div>

      <div className="flex items-center justify-between mt-4 text-xs text-gray-500 border-t pt-2">
        <span>Priority: <span className="font-semibold">{task.priority}</span></span>
        <span>Due: <span className="font-semibold">{new Date(task.dueDate).toLocaleDateString()}</span></span>
      </div>

      <div className="absolute top-2 right-2">
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-full hover:bg-gray-200 transition">
          <BsThreeDotsVertical />
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 border overflow-hidden"
            >
              <button
                onClick={() => { onEdit(task); setMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition"
              >
                Edit Task
              </button>
              <button
                onClick={() => { handleStatusToggle(); setMenuOpen(false); }}
                className={`block w-full text-left px-4 py-2 text-sm font-semibold ${
                  task.status === 'pending' ? 'text-green-700 hover:bg-green-50' : 'text-yellow-700 hover:bg-yellow-50'
                } transition`}
              >
                {task.status === 'pending' ? 'Mark Complete' : 'Mark Pending'}
              </button>
              <button
                onClick={() => { handleDelete(); setMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 transition"
              >
                Delete Task
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TaskItem;
