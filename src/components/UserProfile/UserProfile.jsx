import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ type: '', title: '', message: '' });
  const [notification, setNotification] = useState(null);
  
  // Add userData state
  const [userData, setUserData] = useState({
    name: 'Loading...',
    email: '',
    joinDate: new Date().toISOString(),
    readingLevel: 'Beginner',
    stats: {
      booksCompleted: 0,
      wordsLearned: 0,
      totalReadingTime: 0,
      streak: 0
    },
    readingHistory: [],
    achievements: [],
    learningProgress: {
      beginner: 0,
      intermediate: 0,
      advanced: 0
    }
  });

  // Form states
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [notificationPreferences, setNotificationPreferences] = useState({
    achievements: true,
    dailyReminders: true,
    weeklyProgress: true,
    newContent: true
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('https://wordwave-app-backend.onrender.com/users/oneUser', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('API Response:', response.data); // Debug log

        if (response.data) {
          // Map the API response to our userData structure
          setUserData({
            name: response.data.name || 'Reader',
            email: response.data.email || '',
            joinDate: response.data.createdAt || new Date().toISOString(),
            readingLevel: response.data.readingLevel || 'Beginner',
            stats: {
              booksCompleted: response.data.booksCompleted || 0,
              wordsLearned: response.data.wordsLearned || 0,
              totalReadingTime: response.data.totalReadingTime || 0,
              streak: response.data.streak || 0
            },
            readingHistory: response.data.readingHistory || [],
            achievements: response.data.achievements || [],
            learningProgress: response.data.learningProgress || {
              beginner: 0,
              intermediate: 0,
              advanced: 0
            }
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        showNotification('Error', 'Failed to load profile data', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Notification helper
  const showNotification = (title, message, type = 'success') => {
    setNotification({ title, message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Profile update handler
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'https://wordwave-app-backend.onrender.com/users/profile',
        {
          name: userData.name,
          email: userData.email,
          readingLevel: userData.readingLevel
        },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      setIsEditing(false);
      showNotification('Success', 'Profile updated successfully');
    } catch (error) {
      showNotification('Error', 'Failed to update profile', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Password change handler
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showNotification('Error', 'Passwords do not match', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'https://wordwave-app-backend.onrender.com/users/change-password',
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      setIsChangingPassword(false);
      showNotification('Success', 'Password updated successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      showNotification('Error', 'Failed to update password', 'error');
    }
  };

  // Notification preferences handler
  const handleNotificationPreferences = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'https://wordwave-app-backend.onrender.com/users/notifications',
        notificationPreferences,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      showNotification('Success', 'Notification preferences updated');
    } catch (error) {
      showNotification('Error', 'Failed to update preferences', 'error');
    }
  };

  // Account deletion handler
  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('https://wordwave-app-backend.onrender.com/users/account', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      showNotification('Error', 'Failed to delete account', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Navigation */}
      <nav className="bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link to="/dashboard">
            <motion.h1 
              className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              WordWave
            </motion.h1>
          </Link>
          <Link 
            to="/dashboard"
            className="px-4 py-2 bg-black/50 border border-purple-500/20 rounded-full hover:bg-black/70 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Profile Header */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 p-8 rounded-2xl border border-purple-500/20"
        >
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-3xl font-bold">
              {userData.name[0]}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
              <p className="text-gray-400">
                Member since {new Date(userData.joinDate).toLocaleDateString()}
              </p>
              <p className="text-purple-400">{userData.readingLevel} Reader</p>
            </div>
          </div>
        </motion.section>

        {/* Quick Stats */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="bg-black/40 p-6 rounded-xl border border-white/5">
            <h3 className="text-gray-400 mb-2">Books Completed</h3>
            <p className="text-2xl font-bold">{userData.stats.booksCompleted}</p>
          </div>
          <div className="bg-black/40 p-6 rounded-xl border border-white/5">
            <h3 className="text-gray-400 mb-2">Words Learned</h3>
            <p className="text-2xl font-bold">{userData.stats.wordsLearned}</p>
          </div>
          <div className="bg-black/40 p-6 rounded-xl border border-white/5">
            <h3 className="text-gray-400 mb-2">Reading Time</h3>
            <p className="text-2xl font-bold">{userData.stats.totalReadingTime}h</p>
          </div>
          <div className="bg-black/40 p-6 rounded-xl border border-white/5">
            <h3 className="text-gray-400 mb-2">Current Streak</h3>
            <p className="text-2xl font-bold">{userData.stats.streak} days</p>
          </div>
        </motion.section>

        {/* Reading History */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/40 p-8 rounded-2xl border border-white/5"
        >
          <h2 className="text-2xl font-bold mb-6">Reading History</h2>
          <div className="space-y-4">
            {userData.readingHistory.map((book) => (
              <motion.div 
                key={book.id}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-4 bg-black/60 rounded-xl border border-white/5 hover:border-purple-500/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-16 bg-purple-500/20 rounded flex items-center justify-center">
                    📚
                  </div>
                  <div>
                    <h3 className="font-semibold">{book.title}</h3>
                    <p className="text-sm text-gray-400">by {book.author}</p>
                    <p className="text-xs text-purple-400">
                      Completed on {new Date(book.completedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-green-400">✓ Complete</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Achievements */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/40 p-8 rounded-2xl border border-white/5"
        >
          <h2 className="text-2xl font-bold mb-6">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userData.achievements.map((achievement) => (
              <motion.div 
                key={achievement.id}
                whileHover={{ scale: 1.05 }}
                className="bg-black/60 p-6 rounded-xl border border-purple-500/20"
              >
                <div className="w-12 h-12 mb-4 bg-purple-500/20 rounded-full flex items-center justify-center text-2xl">
                  {achievement.icon}
                </div>
                <h3 className="font-semibold mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
                <span className="text-xs text-purple-400">
                  Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Learning Progress */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-black/40 p-8 rounded-2xl border border-white/5"
        >
          <h2 className="text-2xl font-bold mb-6">Learning Progress</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Beginner Words</span>
                <span className="text-purple-400">{userData.learningProgress.beginner}%</span>
              </div>
              <div className="w-full bg-black/60 rounded-full h-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${userData.learningProgress.beginner}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-purple-500 h-2 rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Intermediate Words</span>
                <span className="text-purple-400">{userData.learningProgress.intermediate}%</span>
              </div>
              <div className="w-full bg-black/60 rounded-full h-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${userData.learningProgress.intermediate}%` }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="bg-purple-500 h-2 rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Advanced Words</span>
                <span className="text-purple-400">{userData.learningProgress.advanced}%</span>
              </div>
              <div className="w-full bg-black/60 rounded-full h-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${userData.learningProgress.advanced}%` }}
                  transition={{ duration: 1, delay: 0.9 }}
                  className="bg-purple-500 h-2 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Profile Settings */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-black/40 p-8 rounded-2xl border border-white/5"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Profile Settings</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={(e) => {
              e.preventDefault();
              setIsEditing(false);
              // Add your update logic here
            }} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Reading Level</label>
                <select
                  value={userData.readingLevel}
                  onChange={(e) => setUserData({ ...userData, readingLevel: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-full transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <p className="text-white">{userData.email}</p>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Reading Level</label>
                <p className="text-white">{userData.readingLevel}</p>
              </div>
            </div>
          )}
        </motion.section>

        {/* Account Settings */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-black/40 p-8 rounded-2xl border border-white/5"
        >
          <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
          <div className="space-y-4">
            <button className="w-full p-4 bg-black/60 rounded-xl border border-white/5 hover:border-purple-500/20 transition-colors text-left flex justify-between items-center">
              <span>Change Password</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full p-4 bg-black/60 rounded-xl border border-white/5 hover:border-purple-500/20 transition-colors text-left flex justify-between items-center">
              <span>Notification Settings</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default UserProfile;