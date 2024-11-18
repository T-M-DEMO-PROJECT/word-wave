import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  RiUserLine, 
  RiLockLine, 
  RiGoogleFill, 
  RiGithubFill, 
  RiDiscordFill,
  RiEyeLine,
  RiEyeOffLine,
  RiHeadphoneLine,
  RiSparklingFill
} from 'react-icons/ri';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin?.(email, password);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-fuchsia-500/20 to-cyan-500/20 animate-gradient bg-[length:400%_400%]" />
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse-slow delay-700" />
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md mx-auto"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center justify-center space-x-2"
          >
            <div className="relative">
              <RiHeadphoneLine className="w-8 h-8 text-purple-400" />
              <RiSparklingFill className="absolute -top-1 -right-1 w-4 h-4 text-fuchsia-400 animate-pulse" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400">
              WordWave
            </span>
          </motion.div>
        </div>

        {/* Form Card */}
        <motion.div
          layout
          className="bg-[#12121A]/80 backdrop-blur-xl rounded-2xl p-8 border border-white/5 shadow-xl"
        >
          {/* Auth Toggle */}
          <div className="flex mb-8 bg-[#0A0A0F] rounded-lg p-1">
            {['Login', 'Sign Up'].map((text) => (
              <motion.button
                key={text}
                onClick={() => setIsLogin(text === 'Login')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  (text === 'Login') === isLogin
                    ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {text}
              </motion.button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Email</label>
              <div className="relative group">
                <RiUserLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0A0A0F] rounded-lg py-3 px-10 text-white border border-white/5 
                           focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300
                           placeholder-gray-500 hover:border-purple-500/50"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Password</label>
              <div className="relative group">
                <RiLockLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0A0A0F] rounded-lg py-3 px-10 text-white border border-white/5 
                           focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300
                           placeholder-gray-500 hover:border-purple-500/50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-400">
                <input
                  type="checkbox"
                  className="rounded bg-[#0A0A0F] border-white/5 text-purple-500 
                           focus:ring-purple-500 focus:ring-offset-0"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 
                       text-white font-medium transform transition-all duration-300
                       hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] active:opacity-90"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </motion.button>

            {/* Social Login Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#12121A] text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: RiGoogleFill, color: 'hover:bg-red-500/20 hover:text-red-400' },
                { icon: RiGithubFill, color: 'hover:bg-gray-500/20 hover:text-gray-400' },
                { icon: RiDiscordFill, color: 'hover:bg-indigo-500/20 hover:text-indigo-400' }
              ].map((social, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className={`p-3 rounded-lg bg-[#0A0A0F] border border-white/5 
                           transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="w-5 h-5 mx-auto" />
                </motion.button>
              ))}
            </div>
          </form>
        </motion.div>

        {/* Terms */}
        <p className="mt-6 text-center text-sm text-gray-400">
          By continuing, you agree to our{' '}
          <a
            href="#"
            className="text-purple-400 hover:text-purple-300 transition-colors duration-300 hover:underline"
          >
            Terms of Service
          </a>
          {' '}and{' '}
          <a
            href="#"
            className="text-purple-400 hover:text-purple-300 transition-colors duration-300 hover:underline"
          >
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login; 