// src/App.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';
import { 
  RiHeadphoneLine,
  RiSparklingFill,
  RiFireFill,
  RiGroupFill,
  RiBookOpenLine,
  RiStarSFill,
  RiVolumeUpFill,
  RiMusic2Line,
  RiBookLine,
  RiTimeLine,
  RiUserHeartLine,
  RiBookFill,
  RiDashboardFill,
  RiArrowRightLine
} from 'react-icons/ri';
import { SiTiktok } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import { FaDiscord, FaTiktok, FaInstagram, FaTwitter } from 'react-icons/fa';

// CSS styles
const styles = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-gradient {
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
  }

  .floating {
    animation: float 6s ease-in-out infinite;
  }

  .glow-on-hover {
    position: relative;
    overflow: hidden;
  }

  .glow-on-hover:after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 90deg at 40% 40%,
      #ff00ea 0deg,
      #6b46c1 90deg,
      #00d4ff 180deg,
      #6b46c1 270deg,
      #ff00ea 360deg
    );
    opacity: 0;
    transition: opacity 0.3s;
    animation: rotate 4s linear infinite;
  }

  .glow-on-hover:hover:after {
    opacity: 0.15;
  }

  @keyframes rotate {
    100% {
      transform: rotate(1turn);
    }
  }

  .text-shimmer {
    background: linear-gradient(
      to right,
      #6b46c1 20%,
      #ff00ea 30%,
      #00d4ff 70%,
      #6b46c1 80%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% auto;
    animation: textShimmer 4s linear infinite;
  }

  @keyframes textShimmer {
    to {
      background-position: 200% center;
    }
  }
`;

const WordWaveLanding = () => {
  const el = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  const features = [
    {
      icon: <RiBookFill className="text-purple-400 text-4xl mb-4" />,
      title: "Immersive Learning",
      description: "Enhance your vocabulary while enjoying captivating audiobooks",
      animation: "fade-right"
    },
    {
      icon: <RiDashboardFill className="text-fuchsia-400 text-4xl mb-4" />,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics",
      animation: "fade-up"
    },
    {
      icon: <RiHeadphoneLine className="text-cyan-400 text-4xl mb-4" />,
      title: "Premium Audio",
      description: "Crystal clear narration by professional voice actors",
      animation: "fade-left"
    }
  ];

  const stats = [
    {
      icon: <RiBookOpenLine className="text-purple-400 text-2xl" />,
      number: 1000,
      label: "Audiobooks",
      animation: "fade-right"
    },
    {
      icon: <RiGroupFill className="text-fuchsia-400 text-2xl" />,
      number: 50000,
      label: "Active Learners",
      animation: "fade-up"
    },
    {
      icon: <RiStarSFill className="text-cyan-400 text-2xl" />,
      number: 4.9,
      label: "User Rating",
      animation: "fade-left"
    }
  ];

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true
    });

    // Initialize Typed.js only if the element exists
    if (el.current) {
      const typed = new Typed(el.current, {
        strings: [
          'enjoying classic stories',
          'building reading streaks',
          'earning achievements',
          'joining the community'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
      });

      // Cleanup
      return () => {
        typed.destroy();
      };
    }

    // Scroll effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Hero Section with Parallax Effect */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-fuchsia-900/20 to-cyan-900/20 animate-gradient"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              {/* Animated Headphone Icon */}
              <div className="relative">
                <RiHeadphoneLine 
                  className="text-3xl text-purple-500 transition-transform duration-300 group-hover:scale-110" 
                />
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-purple-500/20 blur-md rounded-full group-hover:bg-purple-500/30 transition-all duration-300"></div>
              </div>

              {/* WordWave Text with Effects */}
              <div className="relative">
                <span className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    Word
                  </span>
                  <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Wave
                  </span>
                </span>
                
                {/* Sparkle Effects */}
                <span className="absolute -top-1 -right-2 text-purple-400">
                  <RiSparklingFill className="text-sm animate-pulse" />
                </span>
                
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-fuchsia-500/10 to-pink-500/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-x-4 flex items-center"
            >
              {/* Login Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/login"
                  className="relative inline-flex items-center px-6 py-2 group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 rounded-lg blur-sm transition-all duration-300 group-hover:blur-md"></span>
                  <span className="relative text-white font-medium group-hover:text-purple-400 transition-colors duration-300 flex items-center gap-2">
                    <RiUserHeartLine className="text-xl" />
                    Login
                  </span>
                </Link>
              </motion.div>

              {/* Sign Up Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/signup"
                  className="relative inline-flex items-center px-6 py-2 group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-lg"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-lg blur-sm transition-all duration-300 group-hover:blur-md"></span>
                  <span className="relative px-6 py-2 bg-black rounded-lg bg-opacity-90 text-white font-medium group-hover:bg-opacity-80 transition-all duration-300 flex items-center gap-2">
                    <RiSparklingFill className="text-xl" />
                    Sign Up Free
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-white">Join the </span>
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Wave
              </span>
              <span className="text-white"> now</span>
            </h1>

            {/* Key Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Audiobooks */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <RiHeadphoneLine className="text-4xl text-purple-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-2">Audiobook Library</h3>
                <p className="text-gray-400">
                  Dive into our collection of classic literature, ready to stream anytime
                </p>
              </motion.div>

              {/* Vocabulary */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <RiBookLine className="text-4xl text-fuchsia-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-2">Daily Vocabulary</h3>
                <p className="text-gray-400">
                  Level up your language game with curated words for Gen Z
                </p>
              </motion.div>

              {/* Streaks */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <RiFireFill className="text-4xl text-pink-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-2">Track Progress</h3>
                <p className="text-gray-400">
                  Build streaks and watch your knowledge grow day by day
                </p>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-8"
            >
              <Link 
                to="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-xl hover:from-fuchsia-500 hover:to-purple-500 transition-all duration-300 font-medium group text-lg"
              >
                Start Your Journey
                <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-8 pt-12"
            >
              <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full">
                <RiBookFill className="text-purple-400 text-xl" />
                <span className="text-gray-300">100+ Audiobooks</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full">
                <RiFireFill className="text-fuchsia-400 text-xl" />
                <span className="text-gray-300">Daily Challenges</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full">
                <RiGroupFill className="text-pink-400 text-xl" />
                <span className="text-gray-300">Active Community</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-500/20 rounded-full floating"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              data-aos="fade-up"
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Why Choose <span className="text-purple-500">WordWave</span>
            </motion.h2>
            <motion.p 
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Experience the perfect blend of entertainment and education
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                data-aos={feature.animation}
                className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300"
              >
                {feature.icon}
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-black/30 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                data-aos={stat.animation}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-white">
                  <CountUp
                    end={stat.number}
                    duration={2.5}
                    separator=","
                    decimals={stat.number === 4.9 ? 1 : 0}
                    suffix={stat.number === 4.9 ? "/5" : "+"}
                  />
                </h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gen Z Appeal Section */}
      <section className="py-20 px-6 relative z-10 bg-gradient-to-b from-black/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            data-aos="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Left side - Achievement Showcase */}
            <div className="space-y-8">
              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-lg border border-purple-500/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 flex items-center justify-center">
                    <RiFireFill className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">🔥 7-Day Streak!</h3>
                    <p className="text-gray-400">You're on fire! Keep it up!</p>
                  </div>
                </div>
                <div className="w-full bg-black/30 rounded-full h-2">
                  <div className="w-3/4 h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500" />
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-lg border border-purple-500/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <RiSparklingFill className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">✨ New Achievement!</h3>
                    <p className="text-gray-400">Vocabulary Master Level 3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Message */}
            <div className="space-y-6">
              <motion.h2 
                data-aos="fade-left"
                className="text-4xl md:text-5xl font-bold text-white"
              >
                Level Up Your Reading Game 🎮
              </motion.h2>
              <motion.div 
                data-aos="fade-left"
                data-aos-delay="100"
                className="space-y-4"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <p className="text-xl text-gray-300">
                    Build streaks and unlock achievements while exploring classic literature
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🧠</span>
                  <p className="text-xl text-gray-300">
                    Level up your vocabulary without feeling like you're studying
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🏆</span>
                  <p className="text-xl text-gray-300">
                    Compete with friends and top the leaderboards
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Social Proof */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              data-aos="fade-up"
              className="bg-white/5 rounded-xl p-6 backdrop-blur-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" 
                  alt="User Avatar" 
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-bold text-white">@bookworm_sarah</p>
                  <div className="flex text-yellow-400">
                    ⭐️⭐️⭐️⭐️⭐️
                  </div>
                </div>
              </div>
              <p className="text-gray-300">
                "Never thought I'd be hooked on classic lit! The streaks keep me coming back daily 📚✨"
              </p>
            </motion.div>

            <motion.div 
              data-aos="fade-up"
              data-aos-delay="100"
              className="bg-white/5 rounded-xl p-6 backdrop-blur-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" 
                  alt="User Avatar" 
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-bold text-white">@tech_alex</p>
                  <div className="flex text-yellow-400">
                    ⭐️⭐️⭐️⭐️⭐️
                  </div>
                </div>
              </div>
              <p className="text-gray-300">
                "My vocabulary's leveled up so much! Love getting those achievement badges 🎮🏆"
              </p>
            </motion.div>

            <motion.div 
              data-aos="fade-up"
              data-aos-delay="200"
              className="bg-white/5 rounded-xl p-6 backdrop-blur-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" 
                  alt="User Avatar" 
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-bold text-white">@gaming_emma</p>
                  <div className="flex text-yellow-400">
                    ⭐️⭐️⭐️⭐️⭐️
                  </div>
                </div>
              </div>
              <p className="text-gray-300">
                "It's like Duolingo but for literature! Can't break my 30-day streak 🔥"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-10">
        <motion.div 
          data-aos="fade-up"
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of learners transforming their learning experience
          </p>
          <Link 
            to="/signup"
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full hover:from-fuchsia-500 hover:to-purple-500 transition-all duration-300 inline-block"
          >
            Get Started Free
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo and Description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <RiHeadphoneLine className="text-3xl text-purple-500" />
                <span className="text-2xl font-bold text-white">WordWave</span>
              </div>
              <p className="text-gray-400">
                Transforming literature into an immersive learning experience for the next generation.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/audiobooks" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Browse Library
                  </Link>
                </li>
                <li>
                  <Link to="/vocabulary" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Daily Practice
                  </Link>
                </li>
                <li>
                  <a href="#features" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Features
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Community</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Leaderboard
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Reading Challenges
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Study Groups
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                >
                  <FaDiscord className="text-xl text-gray-400 hover:text-purple-400" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                >
                  <FaTiktok className="text-xl text-gray-400 hover:text-purple-400" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                >
                  <FaInstagram className="text-xl text-gray-400 hover:text-purple-400" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                >
                  <FaTwitter className="text-xl text-gray-400 hover:text-purple-400" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 WordWave. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WordWaveLanding;