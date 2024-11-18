import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Logout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setShowConfirmation(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleLogoutClick = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleConfirmLogout = async () => {
    setIsLoading(true);
    try {
      await axios.post('https://wordwave-app-backend.onrender.com/users/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      localStorage.removeItem('token');
      navigate('/login', { 
        state: { message: 'Successfully logged out. See you again soon!' }
      });
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('token');
      navigate('/login');
    } finally {
      setIsLoading(false);
      setShowConfirmation(false);
    }
  };

  return (
    <div className="relative">
      {/* Logout Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogoutClick}
        disabled={isLoading}
        className={`px-6 py-2 rounded-full text-white transition-all duration-300 
          ${isLoading 
            ? 'bg-gray-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 shadow-lg hover:shadow-purple-500/30'
          }`}
      >
        {isLoading ? 'Logging out...' : 'Logout'}
      </motion.button>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleCancel}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#0A0A0F] p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 border border-purple-500/20"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Ready to Leave?
              </h3>
              <p className="text-gray-300 mb-6">
                We'll keep your progress safe until you return to continue your learning journey.
              </p>
              <div className="flex justify-end gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="px-6 py-2 rounded-full border border-purple-500/50 text-white hover:bg-purple-500/10 transition-colors"
                >
                  Stay Here
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirmLogout}
                  disabled={isLoading}
                  className={`px-6 py-2 rounded-full text-white transition-all duration-300
                    ${isLoading
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 shadow-lg hover:shadow-purple-500/30'
                    }`}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Logging out...
                    </span>
                  ) : 'Yes, Log Out'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Logout;