import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const googleAuth = () => {
    window.location.href = "http://localhost:5000/api/users/auth/google";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/login", { email, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <motion.div
        className="flex-1 hidden md:flex flex-col items-center justify-center px-10 text-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold text-blue-700 mb-6">
          Welcome to TaskFlow 🚀
        </h1>
        <p className="text-gray-600 text-lg max-w-md">
          Organize your tasks, boost your productivity, and stay on track.  
          Sign in to access your personalized task board.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
          alt="Task Illustration"
          className="w-72 mt-10"
        />
      </motion.div>
      
      <motion.div
        className="flex-1 flex items-center justify-center w-full p-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-extrabold text-center text-gray-800">
            Login to Continue
          </h2>

          {error && (
            <p className="p-3 bg-red-100 text-red-700 rounded-md text-center">
              {error}
            </p>
          )}

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-200"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Login
          </motion.button>

          <div className="text-center text-gray-500">OR</div>

          <button
            type="button"
            onClick={googleAuth}
            className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-red-700"
          >
            Sign in with Google
          </button>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:underline transition-colors duration-200"
            >
              Register here
            </Link>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
