import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get('/api/users', config);
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`/api/users/${id}`, config);
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.error('Failed to delete user', error);
      }
    }
  };

  return (
    <motion.div
      className="w-screen min-h-screen bg-amber-300 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="text-blue-700 hover:underline mb-4 inline-block"
        >
          &larr; Back to Tasks
        </Link>

        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          User Management
        </h1>

        <div className="bg-white/90 shadow-lg rounded-lg overflow-hidden border border-gray-200">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-5 py-3 border-b border-gray-300 bg-gray-100"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {user.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {user.email}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {user.isAdmin ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-600 font-semibold">No</span>
                    )}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm text-right">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-900 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default UserListPage;
