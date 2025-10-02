import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      window.location = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-green-50 via-white to-green-100">
      {/* Left Section - Branding */}
      <motion.div
        className="flex-1 hidden md:flex flex-col items-center justify-center px-10 text-center"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold text-green-700 mb-6">
          Join TaskFlow 🌱
        </h1>
        <p className="text-gray-600 text-lg max-w-md">
          Create your account today and start organizing your tasks the smart
          way. Your productivity journey begins here!
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/7067/7067988.png"
          alt="Register Illustration"
          className="w-72 mt-10"
        />
      </motion.div>

      {/* Right Section - Registration Form */}
      <motion.div
        className="flex-1 flex items-center justify-center w-full p-6"
        initial={{ opacity: 0, x: 60 }}
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
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-extrabold text-center text-gray-800"
          >
            Create Account ✨
          </motion.h2>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-3 bg-red-100 text-red-700 rounded-md text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400 transition-all duration-200"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400 transition-all duration-200"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400 transition-all duration-200"
            />
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-transform"
          >
            Register
          </motion.button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-green-600 hover:underline transition-colors duration-200"
            >
              Login here
            </Link>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Register;
