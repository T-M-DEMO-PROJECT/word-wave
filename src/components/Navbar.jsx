// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext'; // Import AuthContext

function Navbar() {
  // const { user, logout } = useContext(AuthContext); // Get user and logout function from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout function to clear the user data
    navigate('/'); // Redirect to the homepage or login page after logout
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/library">Library</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/streaks">Streaks</Link></li>
        <li><Link to="/vocabulary">Vocabulary</Link></li>

        {/* Conditional rendering based on whether the user is logged in */}
        {/* {!user ? ( */}
          <>
            <li><Link to="/signup" className="text-white">Sign Up</Link></li>
            <li><Link to="/login" className="text-white">Login</Link></li>
          </>
        {/* ) : ( */}
          <li>
            <button onClick={handleLogout} className="text-white bg-red-500 p-2 rounded">
              Logout
            </button>
          </li>
        {/* )} */}
      </ul>
    </nav>
  );
}

export default Navbar;
