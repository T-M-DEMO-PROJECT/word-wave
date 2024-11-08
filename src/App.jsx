// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Library from './pages/Library';
import Profile from './pages/Profile';
import Streaks from './pages/Streaks';
import Vocabulary from './pages/Vocabulary';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/streaks" element={<Streaks />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
      </Routes>
    </Router>
  );
}

export default App;
