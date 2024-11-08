// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/library">Library</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/streaks">Streaks</Link></li>
        <li><Link to="/vocabulary">Vocabulary</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
