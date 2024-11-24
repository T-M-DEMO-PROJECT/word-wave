import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [author, setAuthor] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true); // Assuming you have a loading state to indicate progress
  setError(null); // Clear any previous errors

  try {
    const response = await axios.post('https://wordwave-app-backend.onrender.com/users/register', 
      {
        name,
        email,
        password,
        author: author.toString() // Ensure admin is sent as a string
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("Sign up successful:", response.data);
    navigate("/login"); // Navigate to login on success

  } catch (err) {
    console.error("Sign up error details:", err); // Log the entire error object

    // Check if the error response exists
    if (err.response) {
      // Log the details for debugging
      console.log("Error details:", err.response.data.details); // Log the details array

      // Set a user-friendly error message
      const errorMessage = err.response.data.message || 'Failed to sign up';

      // If there are specific details, handle them
      if (err.response.data.details && Array.isArray(err.response.data.details)) {
        err.response.data.details.forEach(detail => {
          // Assuming each detail has a message property
          setError(prev => prev ? `${prev} ${detail.message}` : detail.message); // Append messages if multiple
        });
      } else {
        setError(errorMessage); // Fallback to general error message
      }
    } else if (err.request) {
      setError("No response from server. Please try again."); // Handle no response
    } else {
      setError("Failed to make request. Please try again."); // Handle other errors
    }
  } finally {
    setIsLoading(false); // Stop loading regardless of success or failure
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-blue-500">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-lg text-white"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center">Sign Up</h2>

        {error && (
          <div className="bg-red-500 text-white text-center p-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 p-3 w-full bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 p-3 w-full bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 p-3 w-full bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500"
            required
            minLength="8"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-2 p-3 w-full bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-pink-500"
            required
            minLength="8"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="author"
            checked={author}
            onChange={(e) => setAuthor(e.target.checked)}
            className="mr-2 text-pink-500 focus:ring-pink-500"
          />
          <label htmlFor="author" className="text-sm font-medium">
            Register as Author
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;