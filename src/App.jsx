// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import Home from './pages/Home';
import Library from './pages/Library';
import Profile from './pages/Profile';
import Streaks from './pages/Streaks';
import Vocabulary from './pages/Vocabulary';
import Navbar from './components/Navbar';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';

function App() {
  return (
    <AuthProvider> {/* Wrap your app in AuthProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/streaks" element={<Streaks />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
