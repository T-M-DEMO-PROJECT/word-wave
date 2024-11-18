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
  RiTwitterXFill,
  RiInstagramFill,
  RiDiscordFill,
  RiVolumeUpFill,
  RiMusic2Line,
  RiBookLine,
  RiTimeLine,
  RiUserHeartLine
} from 'react-icons/ri';
import { SiTiktok } from 'react-icons/si';

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
  const typedRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });

    // Initialize Typed.js
    const typed = new Typed(typedRef.current, {
      strings: [
        'Learn While You Listen',
        'Expand Your Vocabulary',
        'Master New Words',
        'Level Up Your Learning'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true
    });

    // Scroll handler
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      typed.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: <RiHeadphoneLine className="h-6 w-6 text-cyan-400" />,
      title: "Smart Word Detective",
      description: "Level up your vocabulary while vibing to audiobooks 🎧",
      gradient: "from-cyan-500/20 to-purple-500/20"
    },
    {
      icon: <RiFireFill className="h-6 w-6 text-fuchsia-400" />,
      title: "Streak Master",
      description: "Keep your learning streak lit! 🔥",
      gradient: "from-fuchsia-500/20 to-purple-500/20"
    },
    {
      icon: <RiBookLine className="h-6 w-6 text-purple-400" />,
      title: "Personalized Learning",
      description: "Adaptive learning path just for you 📚",
      gradient: "from-purple-500/20 to-fuchsia-500/20"
    },
    {
      icon: <RiTimeLine className="h-6 w-6 text-cyan-400" />,
      title: "Progress Tracking",
      description: "Watch your vocabulary grow daily 📈",
      gradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      icon: <RiUserHeartLine className="h-6 w-6 text-fuchsia-400" />,
      title: "Community Learning",
      description: "Learn together with friends 👥",
      gradient: "from-fuchsia-500/20 to-purple-500/20"
    },
    {
      icon: <RiMusic2Line className="h-6 w-6 text-purple-400" />,
      title: "Audio Excellence",
      description: "Crystal clear audio experience 🎵",
      gradient: "from-purple-500/20 to-cyan-500/20"
    }
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden">
        <div className="relative">
          {/* Background with parallax effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-fuchsia-600/10 to-cyan-600/10 animate-gradient"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />

          {/* Navigation - Mobile Friendly */}
          <nav className="relative z-10 px-4 sm:px-6 py-4 bg-[#0A0A0F]/80 backdrop-blur-sm border-b border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                {/* Logo section */}
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-lg opacity-20 group-hover:opacity-30 transition-all duration-300" />
                  <div className="relative p-2">
                    <RiHeadphoneLine className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400" />
                    <RiSparklingFill className="h-3 w-3 sm:h-4 sm:w-4 absolute -top-1 -right-1 text-fuchsia-400 animate-pulse" />
                  </div>
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold text-shimmer">
                    WordWave
                  </span>
                  <span className="text-xs text-cyan-400/80 hidden sm:block">
                    Level Up Your Audio Learning
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 sm:px-6 py-2 rounded-full bg-[#0A0A0F] border border-purple-500/50 hover:border-purple-500 text-purple-400 hover:text-purple-300 transition-all duration-300 text-sm sm:text-base"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 sm:px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-fuchsia-500 hover:to-purple-500 transition-all duration-300 text-white font-medium text-sm sm:text-base"
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </nav>

          {/* Hero Section - Mobile Optimized */}
          <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-7xl mx-auto text-center"
            >
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight">
                <span ref={typedRef} className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400" />
              </h1>
              
              {/* Mobile-friendly floating badge */}
              <motion.div 
                animate={{ y: [-10, 10] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 2 
                }}
                className="absolute top-4 right-4 sm:top-10 sm:right-10 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm"
              >
                New Features! ✨
              </motion.div>
            </motion.div>
          </section>

          {/* Features Grid - Mobile Responsive */}
          <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: [0, 1, -1, 0],
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative p-4 sm:p-6 rounded-2xl bg-[#12121A] border border-white/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                       style={{
                         background: `linear-gradient(45deg, 
                           ${feature.gradient.split(' ')[1]}, 
                           ${feature.gradient.split(' ')[3]})`,
                         filter: 'blur(20px)',
                         transform: 'scale(0.9)',
                       }}
                  />
                  
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Stats Section - Mobile Friendly */}
          <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 bg-[#12121A]">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                {[
                  {
                    number: 50000,
                    label: "Active Learners",
                    icon: <RiGroupFill className="h-6 w-6 text-purple-400" />
                  },
                  {
                    number: 1000000,
                    label: "Words Learned",
                    icon: <RiBookOpenLine className="h-6 w-6 text-fuchsia-400" />
                  },
                  {
                    number: 100000,
                    label: "Audio Hours",
                    icon: <RiHeadphoneLine className="h-6 w-6 text-cyan-400" />
                  },
                  {
                    number: 4.9,
                    label: "User Rating",
                    icon: <RiStarSFill className="h-6 w-6 text-yellow-400" />
                  }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 mb-4">
                      {stat.icon}
                    </div>
                    <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-400">
                      <CountUp
                        end={stat.number}
                        duration={2.5}
                        separator=","
                        decimals={stat.number === 4.9 ? 1 : 0}
                        suffix={stat.number === 4.9 ? "/5" : "+"}
                      />
                    </h3>
                    <p className="mt-1 text-gray-400">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative z-10 py-20 px-6">
            <motion.div 
              whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400">
                Ready to Level Up Your Learning?
              </h2>
              <p className="mt-6 text-xl text-gray-400">
                Join thousands of learners transforming their audio experience 🚀
              </p>
              <motion.button
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 25px rgba(168,85,247,0.5)"
                }}
                whileTap={{ scale: 0.9 }}
                className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-fuchsia-500 hover:to-purple-500 transition-all duration-300 text-white font-medium text-lg"
              >
                Start Your Journey
              </motion.button>
            </motion.div>
          </section>

          {/* Footer - Mobile Optimized */}
          <footer className="relative z-10 bg-[#0A0A0F] border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Brand Column */}
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <RiHeadphoneLine className="h-6 w-6 text-cyan-400" />
                    <span className="text-xl font-bold text-shimmer">
                      WordWave
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4 max-w-md">
                    Transform your audio learning experience with WordWave. 
                    Level up your vocabulary while enjoying your favorite audiobooks.
                  </p>
                  <div className="flex space-x-4">
                    {[
                      { icon: <RiTwitterXFill />, href: "#", label: "Twitter" },
                      { icon: <RiInstagramFill />, href: "#", label: "Instagram" },
                      { icon: <RiDiscordFill />, href: "#", label: "Discord" },
                      { icon: <SiTiktok />, href: "#", label: "TikTok" }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300"
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Quick Links - Mobile Friendly */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Quick Links</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "About Us",
                      "Features",
                      "Pricing",
                      "Blog",
                      "Contact"
                    ].map((link, index) => (
                      <motion.li 
                        key={index}
                        whileHover={{ x: 5 }}
                      >
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                          {link}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Legal Links - Mobile Friendly */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Legal</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Terms of Service",
                      "Privacy Policy",
                      "Cookie Policy",
                      "GDPR",
                      "FAQ"
                    ].map((link, index) => (
                      <motion.li 
                        key={index}
                        whileHover={{ x: 5 }}
                      >
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                          {link}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Bar - Mobile Friendly */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                  <p className="text-gray-400 text-sm text-center sm:text-left">
                    © 2024 WordWave. All rights reserved.
                  </p>
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <span className="text-gray-400 text-sm">Made with</span>
                    <motion.span 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2 
                      }}
                      className="text-fuchsia-400"
                    >
                      ♥
                    </motion.span>
                    <span className="text-gray-400 text-sm">for audio learners</span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default WordWaveLanding;