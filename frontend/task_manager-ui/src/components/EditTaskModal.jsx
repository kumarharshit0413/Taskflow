import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const EditTaskModal = ({ isOpen, onRequestClose, task, onTaskUpdate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setDueDate(new Date(task.dueDate).toISOString().split('T')[0]);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const updatedData = { title, description, dueDate };

      const response = await axios.put(`/api/tasks/${task._id}`, updatedData, config);
      onTaskUpdate(response.data);
      onRequestClose();
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Task"
      className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-auto mt-20 border"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="edit-title" className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            id="edit-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="edit-description" className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="edit-dueDate" className="block text-gray-700 font-semibold mb-2">Due Date</label>
          <input
            id="edit-dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button type="button" onClick={onRequestClose} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;