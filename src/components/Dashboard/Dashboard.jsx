import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logout from '../Auth/Logout';
import axios from 'axios';
import { FaHeadphones, FaBook, FaArrowRight } from 'react-icons/fa';

const api = axios.create({
  baseURL: 'https://wordwave-app-backend.onrender.com'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-[#0A0A0F] text-white animate-pulse">
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Skeleton shapes */}
      <div className="h-32 bg-white/5 rounded-2xl"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-24 bg-white/5 rounded-xl"></div>
        <div className="h-24 bg-white/5 rounded-xl"></div>
        <div className="h-24 bg-white/5 rounded-xl"></div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(true);
  const [userData, setUserData] = useState(null);
  const [notification, setNotification] = useState(null);
  const [currentBooks, setCurrentBooks] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Update these endpoints to match your backend
        const [userResponse, booksResponse] = await Promise.all([
          axios.get('https://wordwave-app-backend.onrender.com/users/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }),
          axios.get('https://wordwave-app-backend.onrender.com/audiobooks/in-progress', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        ]);

        setUserData(userResponse.data);
        setCurrentBooks(booksResponse.data);
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
        // Set default values on error
        setUserData({
          name: 'Reader',
          booksRead: 3,
          wordsLearned: 20,
          streak: 10
        });
        setCurrentBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const showAchievementNotification = (achievement) => {
    setNotification({
      title: 'New Achievement!',
      message: achievement.message,
      type: 'achievement'
    });

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Notification Toast */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-50 bg-purple-500 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          <h4 className="font-bold">{notification.title}</h4>
          <p className="text-sm">{notification.message}</p>
        </motion.div>
      )}

      {/* Navbar */}
      <nav className="bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            WordWave
          </motion.h1>
          <Logout />
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 rounded-2xl p-8 border border-white/5"
        >
          <h2 className="text-4xl font-bold mb-4">
            Hey <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              {userData.name}
            </span> 👋
          </h2>
          <p className="text-gray-400 text-lg">Ready to level up your reading game?</p>
        </motion.section>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/10 hover:border-purple-500/20 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/10 rounded-lg group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Books Read</p>
                <h3 className="text-2xl font-bold">{userData.booksRead}</h3>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-fuchsia-500/10 hover:border-fuchsia-500/20 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-fuchsia-500/10 rounded-lg group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Streak</p>
                <h3 className="text-2xl font-bold">{userData.streak} days 🔥</h3>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-pink-500/10 hover:border-pink-500/20 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-pink-500/10 rounded-lg group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Words Learned</p>
                <h3 className="text-2xl font-bold">{userData.wordsLearned} ✨</h3>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Current Books */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/5"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Continue Reading</h2>
            <Link 
              to="/audiobooks"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBooks.length > 0 ? (
              currentBooks.map((book) => (
                <Link 
                  key={book._id}
                  to={`/audiobook/${book._id}`}
                  className="group relative overflow-hidden rounded-xl aspect-[3/4] hover:scale-105 transition-all duration-300"
                >
                  <img 
                    src={book.coverImage} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/fallback-image.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100">
                    <h3 className="font-medium mb-2">{book.title}</h3>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${book.progress || 0}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{book.progress}% completed</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-8">
                <p>The Great Gatsby.</p>
                <Link 
                  to="/audiobooks"
                  className="text-purple-400 hover:text-purple-300 mt-2 inline-block"
                >
                  Start reading now →
                </Link>
              </div>
            )}
          </div>
        </motion.section>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link 
            to="/audiobooks"
            className="p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/10 hover:border-purple-500/20 transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg group-hover:scale-110 transition-transform">
                <FaHeadphones className="text-2xl text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Audiobooks</h3>
                <p className="text-gray-400">Explore our collection</p>
              </div>
            </div>
            <FaArrowRight className="text-purple-400" />
          </Link>

          <Link 
            to="/vocabulary"
            className="p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-pink-500/10 hover:border-pink-500/20 transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-pink-500/10 rounded-lg group-hover:scale-110 transition-transform">
                <FaBook className="text-2xl text-pink-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Daily Vocabulary</h3>
                <p className="text-gray-400">Learn new words</p>
              </div>
            </div>
            <FaArrowRight className="text-pink-400" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;