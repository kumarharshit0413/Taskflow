import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <motion.header
      className="bg-purple-200 shadow-md sticky top-0 z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          TaskFlow
        </Link>

        <div className="flex items-center gap-4">
          {userInfo && userInfo.isAdmin && (
            <Link
              to="/admin/userlist"
              className="font-semibold text-blue-600 hover:underline"
            >
              Manage Users
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
