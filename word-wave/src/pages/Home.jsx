import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  RiFireFill, 
  RiBookOpenLine,
  RiTimeLine,
  RiVolumeUpFill,
  RiStarFill,
  RiPlayCircleFill,
  RiBarChartBoxLine,
  RiBookmarkLine,
  RiListCheck2,
  RiTrophyLine,
  RiArrowRightLine,
  RiHeadphoneLine
} from 'react-icons/ri';

const Home = () => {
  const userData = {
    name: "Alex",
    streak: 7,
    todaysProgress: 65,
    totalWords: 1250,
    hoursListened: 42
  };

  const currentBook = {
    title: "Atomic Habits",
    author: "James Clear",
    progress: 65,
    lastPlayed: "2 hours ago",
    newWords: 12,
    coverUrl: "https://example.com/cover.jpg"
  };

  const vocabularyStats = {
    learned: 150,
    needsPractice: 23,
    mastered: 127,
    todaysNew: 8
  };

  const [selectedBook, setSelectedBook] = useState(null);
  const [showVocabDetails, setShowVocabDetails] = useState(false);
  const [activeGoal, setActiveGoal] = useState(null);

  const [showStatsDetails, setShowStatsDetails] = useState(false);

  const goals = [
    {
      icon: <RiTrophyLine className="text-yellow-400" />,
      title: "Complete Daily Challenge",
      description: "Earn bonus points by completing today's vocabulary challenge!"
    },
    // Add more goals...
  ];

  const quickActions = [
    {
      title: "Practice Vocabulary",
      primary: true
    },
    // Add more actions...
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <div className="bg-[#12121A] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowStatsDetails(true)}
              className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border border-white/5 cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <RiFireFill className="text-orange-400" />
                <span className="text-sm text-gray-400">Streak</span>
              </div>
              <div className="mt-2 text-2xl font-bold">{userData.streak} days</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-white/5"
            >
              <div className="flex items-center space-x-2">
                <RiBarChartBoxLine className="text-cyan-400" />
                <span className="text-sm text-gray-400">Today's Progress</span>
              </div>
              <div className="mt-2 text-2xl font-bold">{userData.todaysProgress}%</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 border border-white/5"
            >
              <div className="flex items-center space-x-2">
                <RiBookOpenLine className="text-fuchsia-400" />
                <span className="text-sm text-gray-400">Words Learned</span>
              </div>
              <div className="mt-2 text-2xl font-bold">{userData.totalWords}</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-white/5"
            >
              <div className="flex items-center space-x-2">
                <RiHeadphoneLine className="text-purple-400" />
                <span className="text-sm text-gray-400">Hours Listened</span>
              </div>
              <div className="mt-2 text-2xl font-bold">{userData.hoursListened}</div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showStatsDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowStatsDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#12121A] p-6 rounded-2xl max-w-lg w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Detailed Statistics</h2>
              {/* Add detailed stats content */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Continue Learning</h2>
                <button className="text-purple-400 hover:text-purple-300 transition-colors duration-300 flex items-center space-x-1">
                  <span>View Library</span>
                  <RiArrowRightLine />
                </button>
              </div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedBook(currentBook)}
                className="p-6 rounded-2xl bg-[#12121A] border border-white/5 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <RiBookOpenLine className="w-12 h-12 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{currentBook.title}</h3>
                    <p className="text-gray-400">{currentBook.author}</p>
                    <div className="mt-2">
                      <div className="w-full bg-white/5 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-2 rounded-full"
                          style={{ width: `${currentBook.progress}%` }}
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm text-gray-400">
                        <span>{currentBook.progress}% complete</span>
                        <span>{currentBook.lastPlayed}</span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-full bg-purple-500/20 hover:bg-purple-500/30 transition-colors duration-300"
                  >
                    <RiPlayCircleFill className="w-8 h-8 text-purple-400" />
                  </motion.button>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: selectedBook ? "auto" : 0 }}
                  className="overflow-hidden"
                >
                  {selectedBook && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <h4 className="font-semibold mb-2">Recent Words</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {/* Add recent words learned */}
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Vocabulary Progress</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl bg-[#12121A] border border-white/5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-400">Words Learned</div>
                      <div className="text-3xl font-bold mt-1">{vocabularyStats.learned}</div>
                    </div>
                    <RiBookOpenLine className="w-12 h-12 text-purple-400 opacity-20" />
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl bg-[#12121A] border border-white/5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-400">Needs Practice</div>
                      <div className="text-3xl font-bold mt-1">{vocabularyStats.needsPractice}</div>
                    </div>
                    <RiListCheck2 className="w-12 h-12 text-fuchsia-400 opacity-20" />
                  </div>
                </motion.div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-6">Daily Goals</h2>
              <motion.div className="space-y-4">
                {goals.map((goal, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActiveGoal(activeGoal === index ? null : index)}
                    className="p-4 rounded-xl bg-[#12121A] border border-white/5 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {goal.icon}
                        <span>{goal.title}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: activeGoal === index ? 180 : 0 }}
                      >
                        <RiArrowRightLine />
                      </motion.div>
                    </div>
                    <motion.div
                      initial={false}
                      animate={{ height: activeGoal === index ? "auto" : 0 }}
                      className="overflow-hidden"
                    >
                      {activeGoal === index && (
                        <div className="mt-4 pt-4 border-t border-white/5">
                          <p className="text-gray-400">{goal.description}</p>
                          <div className="mt-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400"
                            >
                              Start Now
                            </motion.button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-xl flex items-center justify-between ${
                      action.primary 
                        ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 font-medium'
                        : 'bg-[#12121A] border border-white/5 font-medium'
                    }`}
                  >
                    <span>{action.title}</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <RiArrowRightLine />
                    </motion.div>
                  </motion.button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-lg"
      >
        <RiPlayCircleFill className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default Home;