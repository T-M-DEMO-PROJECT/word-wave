import { useState } from "react";
import { apiLogin } from "../../services/Auth";  
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi"; // Add some icon flair

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (email, password) => {
    try {
      const response = await apiLogin({ email, password }); 
      console.log("Login successful:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setError(""); 
      navigate('/'); 
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 via-purple-800 to-pink-600">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center flex items-center justify-center gap-2">
          <FiLogIn className="text-pink-500" /> Login
        </h2>

        {error && <div className="text-red-400 text-center mb-4 font-medium">{error}</div>}

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 p-3 w-full bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 p-3 w-full bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold text-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
