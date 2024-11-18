import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logout from '../Auth/Logout';
import axios from 'axios';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(true);
  const [userData, setUserData] = useState({
    name: 'Reader',
    booksRead: 0,
    wordsLearned: 0,
    streak: 0
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('https://wordwave-app-backend.onrender.com/users/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log('API Response:', response.data); // Debug log

        setUserData({
          name: response.data.name || 'Reader',
          booksRead: response.data.booksRead || 0,
          wordsLearned: response.data.wordsLearned || 0,
          streak: response.data.streak || 0
        });
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        // Keep default values if fetch fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-purple-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Navbar */}
      <nav className="bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto flex justify-between items-center p-4">
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            WordWave
          </motion.h1>
          <Logout />
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Welcome Section with New User Message */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 border border-purple-500/10 rounded-xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4">
            Welcome to WordWave, <span className="text-purple-400">{userData.name}</span>!
          </h2>
          {isNewUser && (
            <div className="mb-6 text-gray-300">
              <p className="mb-4">Let's get started with your learning journey:</p>
              <ul className="space-y-2 list-disc list-inside text-purple-300">
                <li>Browse our collection of audiobooks</li>
                <li>Start with beginner-friendly content</li>
                <li>Track your daily vocabulary progress</li>
                <li>Set your learning goals</li>
              </ul>
            </div>
          )}
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/audiobook-list" 
              className="px-6 py-3 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors flex items-center gap-2"
            >
              <span>Start Reading</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link 
              to="/daily-vocabulary" 
              className="px-6 py-3 bg-black/50 border border-purple-500/20 rounded-full hover:bg-black/70 transition-colors"
            >
              Daily Practice
            </Link>
          </div>
        </motion.section>

        {/* Getting Started Section for New Users */}
        {isNewUser && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500/10 to-black/40 border border-purple-500/10 rounded-xl p-6"
          >
            <h2 className="text-xl font-bold mb-6">Quick Start Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-semibold">Choose a Book</h3>
                <p className="text-gray-400 text-sm">Browse our collection and find the perfect book for your level.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <h3 className="font-semibold">Listen & Learn</h3>
                <p className="text-gray-400 text-sm">Follow along with audio narration and interactive transcripts.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold">Track Progress</h3>
                <p className="text-gray-400 text-sm">Monitor your learning journey and vocabulary growth.</p>
              </div>
            </div>
          </motion.section>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-black/40 border border-white/5 rounded-xl p-6 hover:border-purple-500/20 transition-colors"
          >
            <h3 className="text-gray-400 mb-2">Books Read</h3>
            <p className="text-2xl font-bold">{userData.booksRead}</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/40 border border-white/5 rounded-xl p-6 hover:border-purple-500/20 transition-colors"
          >
            <h3 className="text-gray-400 mb-2">Words Learned</h3>
            <p className="text-2xl font-bold">{userData.wordsLearned}</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black/40 border border-white/5 rounded-xl p-6 hover:border-purple-500/20 transition-colors"
          >
            <h3 className="text-gray-400 mb-2">Reading Streak</h3>
            <p className="text-2xl font-bold">{userData.streak} days</p>
          </motion.div>
        </div>

        {/* Continue Reading Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-black/40 border border-white/5 rounded-xl p-6"
        >
          <h2 className="text-xl font-bold mb-4">Continue Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Placeholder for books */}
            <div className="bg-black/60 rounded-lg p-4">
              <div className="aspect-[3/4] bg-gray-800 rounded-lg mb-4"></div>
              <h3 className="font-medium mb-2">Sample Book</h3>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full w-1/2"></div>
              </div>
              <p className="text-sm text-gray-400 mt-2">50% completed</p>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Dashboard; 