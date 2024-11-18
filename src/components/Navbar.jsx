import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiLogout } from '../services/Auth';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await apiLogout();
      localStorage.clear();
      sessionStorage.clear();
      setUser(null);
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 100);
    } catch (err) {
      console.error("Logout failed:", err);
      const errorMessage = err.response?.data?.message || "Logout failed. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="flex justify-between items-center">
        {/* WordWave Logo or App Name */}
        <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          WordWave
        </Link>

        {/* Navbar Links */}
        <ul className="flex space-x-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/library">Library</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/streaks">Streaks</Link></li>
          <li><Link to="/vocabulary">Vocabulary</Link></li>

          {user ? (
            <li>
              <button
                onClick={handleLogout}
                className="text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-pink-500 hover:to-red-500 p-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
