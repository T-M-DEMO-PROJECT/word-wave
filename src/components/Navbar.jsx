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
              className="text-white bg-red-500 p-2 rounded"
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
    </nav>
  );
}

export default Navbar;