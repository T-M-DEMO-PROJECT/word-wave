import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FaPlay, FaPause, FaArrowLeft, FaHeart, FaRegHeart, FaForward, FaBackward, FaStar, FaArrowUp, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BiTime, BiShare, BiComment } from 'react-icons/bi';
import { BsBookmarkPlus, BsBookmarkFill, BsDownload, BsSpeedometer } from 'react-icons/bs';
import { MdVolumeUp, MdVolumeMute } from 'react-icons/md';
import { useSwipeable } from 'react-swipeable';
import { audioService } from '../services/audioService';
import sampleAudio from '../assets/audio/audio-file.mp3';

const PlaybackSpeedControl = ({ playbackSpeed, setPlaybackSpeed }) => {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  
  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowSpeedMenu(!showSpeedMenu)}
        className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
      >
        <BsSpeedometer />
        {playbackSpeed}x
      </motion.button>
      
      <AnimatePresence>
        {showSpeedMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full right-0 mb-2 bg-[#1A1A1F] rounded-xl border border-white/10 overflow-hidden shadow-xl"
          >
            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
              <button
                key={speed}
                onClick={() => {
                  setPlaybackSpeed(speed);
                  setShowSpeedMenu(false);
                }}
                className={`block w-full px-6 py-2 text-left hover:bg-white/10 transition-colors ${
                  playbackSpeed === speed ? 'text-purple-500' : 'text-white'
                }`}
              >
                {speed}x
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AudioControls = ({ 
  audiobook, 
  isPlaying,
  currentTime,
  currentChapter,
  volume,
  isMuted,
  playbackSpeed,
  togglePlayPause,
  setVolume,
  setIsMuted,
  setPlaybackSpeed,
  onSeek,
  onSkipForward,
  onSkipBackward,
  onNextChapter,
  onPreviousChapter
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragY = useMotionValue(0);
  const dragOpacity = useTransform(dragY, [0, 100], [1, 0]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      switch(e.code) {
        case 'Space':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowUp':
          if (e.altKey) {
            e.preventDefault();
            setIsExpanded(true);
          }
          break;
        case 'ArrowDown':
          if (e.altKey) {
            e.preventDefault();
            setIsExpanded(false);
          }
          break;
        case 'ArrowLeft':
          if (e.shiftKey) onPreviousChapter();
          else onSkipBackward();
          break;
        case 'ArrowRight':
          if (e.shiftKey) onNextChapter();
          else onSkipForward();
          break;
        case 'KeyM':
          setIsMuted(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => setIsExpanded(true),
    onSwipedDown: () => setIsExpanded(false),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  // Mini player with enhanced controls
  const MiniPlayer = () => (
    <motion.div 
      className="bg-black/95 backdrop-blur-sm border-t border-white/10"
      style={{ opacity: dragOpacity }}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left: Play/Pause + Title */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlayPause}
              className="bg-purple-500 p-2 rounded-full"
            >
              {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
            </motion.button>
            <div className="hidden sm:block">
              <p className="text-sm font-medium truncate">{audiobook?.title}</p>
              <p className="text-xs text-gray-400 truncate">
                Chapter {currentChapter?.number}: {currentChapter?.title}
              </p>
            </div>
          </div>

          {/* Center: Progress (Optional in mini mode) */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-[400px] mx-8">
            <span className="text-xs min-w-[40px]">{formatTime(currentTime)}</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full">
              <div 
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${(currentTime / parseDuration(audiobook?.duration || '0:00')) * 100}%` }}
              />
            </div>
            <span className="text-xs min-w-[40px]">{audiobook?.duration}</span>
          </div>

          {/* Right: Expand Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white p-2"
          >
            {isExpanded ? <FaChevronDown /> : <FaChevronUp />}
          </button>
        </div>
      </div>
    </motion.div>
  );

  // Early return if audiobook is not loaded yet
  if (!audiobook) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Mini Player (Always Visible) */}
      <MiniPlayer />

      {/* Expanded Controls */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="bg-black/95 backdrop-blur-sm overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Full Controls Content */}
              {/* ... your existing full controls ... */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LoadingSkeleton = () => {
  const Skeleton = ({ className }) => (
    <motion.div
      className={`bg-white/5 rounded-lg ${className}`}
      animate={{ opacity: [0.5, 0.7, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  );

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column Skeleton */}
        <div className="space-y-6">
          {/* Cover Image Skeleton */}
          <Skeleton className="aspect-[2/3] w-full rounded-2xl" />
          
          {/* Quick Stats Skeleton */}
          <div className="bg-black/40 p-6 rounded-2xl border border-white/5 space-y-4">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="md:col-span-2 space-y-6">
          {/* Title and Author Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </div>

          {/* Description Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Chapters Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-black/40 p-4 rounded-xl border border-white/5">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Tracker Skeleton */}
      <div className="bg-black/40 p-6 rounded-2xl border border-white/5 space-y-4">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
        </div>
      </div>

      {/* Social Features Skeleton */}
      <div className="bg-black/40 p-6 rounded-2xl border border-white/5 space-y-4">
        <Skeleton className="h-6 w-1/4" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
};

const AudiobookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Add this check at the start of your component
  if (!id) {
    navigate('/dashboard');
    return null;
  }

  // All state definitions
  const [audiobook, setAudiobook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showVocabularyModal, setShowVocabularyModal] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  
  // Add currentChapter state
  const [currentChapter, setCurrentChapter] = useState({
    number: 1,
    title: 'Chapter 1',
    startTime: 0,
    endTime: 0
  });

  // Add chapter management functions
  useEffect(() => {
    const updateCurrentChapter = (time) => {
      if (!audiobook?.chapters) return;

      let totalTime = 0;
      for (let i = 0; i < audiobook.chapters.length; i++) {
        const chapter = audiobook.chapters[i];
        const chapterDuration = parseDuration(chapter.duration);
        if (totalTime <= time && time < totalTime + chapterDuration) {
          setCurrentChapter({
            number: i + 1,
            title: chapter.title,
            startTime: totalTime,
            endTime: totalTime + chapterDuration
          });
          break;
        }
        totalTime += chapterDuration;
      }
    };

    updateCurrentChapter(currentTime);
  }, [currentTime, audiobook]);

  // Add chapter navigation functions
  const goToNextChapter = () => {
    if (!audiobook?.chapters || currentChapter.number >= audiobook.chapters.length) return;
    
    let totalTime = 0;
    for (let i = 0; i < currentChapter.number; i++) {
      totalTime += parseDuration(audiobook.chapters[i].duration);
    }
    setCurrentTime(totalTime);
  };

  const goToPreviousChapter = () => {
    if (!audiobook?.chapters || currentChapter.number <= 1) return;
    
    let totalTime = 0;
    for (let i = 0; i < currentChapter.number - 2; i++) {
      totalTime += parseDuration(audiobook.chapters[i].duration);
    }
    setCurrentTime(totalTime);
  };

  // Update your fetchAudiobookDetails function to include chapter data
  useEffect(() => {
    const fetchAudiobookDetails = async () => {
      setIsLoading(true);
      try {
        // If using a generated ID, you might need to parse it
        const bookIndex = id.startsWith('book-') ? parseInt(id.split('-')[1]) - 1 : null;
        
        const response = await fetch('https://wordwave-app-backend.onrender.com/audiobooks');
        const data = await response.json();
        
        // Find the correct book either by ID or index
        const book = bookIndex !== null ? data[bookIndex] : data.find(b => b._id === id);
        
        if (!book) {
          throw new Error('Book not found');
        }

        const transformedData = {
          id: id,
          title: book.title,
          author: book.author,
          narrator: book.narrator,
          coverImage: book.coverImage || "https://via.placeholder.com/300x400",
          description: book.description || "No description available",
          duration: typeof book.duration === 'number' ? `${book.duration}:00` : book.duration || "0:00",
          progress: book.progress || 0,
          genre: book.genre || "Unknown",
          audioUrl: book.audioUrl || sampleAudio // Fallback to sample audio if no URL provided
        };

        setAudiobook(transformedData);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load audiobook details');
        setAudiobook(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchAudiobookDetails();
    }
  }, [id]);

  // Add modal components
  const ShareModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={() => setShowShareModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#1A1A1F] p-8 rounded-2xl max-w-md w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold mb-6">Share Audiobook</h3>
        <div className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              value={`https://wordwave.com/audiobook/${id}`}
              readOnly
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
            />
            <div className="flex gap-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://wordwave.com/audiobook/${id}`);
                  setShowShareModal(false);
                }}
                className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
              >
                Copy Link
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const ReviewModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={() => setShowReviewModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#1A1A1F] p-8 rounded-2xl max-w-md w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold mb-6">Write a Review</h3>
        <div className="space-y-6">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => {}}
                className="text-2xl text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <FaStar />
              </button>
            ))}
          </div>
          <textarea
            placeholder="Share your thoughts about this audiobook..."
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white min-h-[120px]"
          />
          <div className="flex gap-4">
            <button
              onClick={() => setShowReviewModal(false)}
              className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {}}
              className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
            >
              Submit Review
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const VocabularyModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={() => setShowVocabularyModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#1A1A1F] p-8 rounded-2xl max-w-md w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold mb-6">Vocabulary</h3>
        <div className="space-y-4">
          {/* Add vocabulary content here */}
          <p>Vocabulary features coming soon...</p>
        </div>
      </motion.div>
    </motion.div>
  );

  // Note-taking system
  const NoteSystem = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={() => setIsAddingNote(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#1A1A1F] p-8 rounded-2xl max-w-md w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold mb-6">Add Note</h3>
        <div className="space-y-4">
          {/* Add note-taking content here */}
          <p>Note-taking features coming soon...</p>
        </div>
      </motion.div>
    </motion.div>
  );

  // Progress tracking animations
  const ProgressTracker = () => (
    <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
      <h3 className="text-lg font-semibold mb-6">Reading Progress</h3>
      <div className="space-y-6">
        {/* Progress content */}
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-purple-500 h-2 rounded-full"
            style={{ width: `${audiobook?.progress || 0}%` }}
          />
        </div>
      </div>
    </div>
  );

  // Social features
  const SocialFeatures = () => (
    <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
      <h3 className="text-lg font-semibold mb-6">Community</h3>
      <div className="space-y-4">
        {/* Social features content */}
        <button
          onClick={() => setShowShareModal(true)}
          className="w-full p-4 bg-black/20 rounded-xl hover:bg-black/30 transition-colors"
        >
          Share this audiobook
        </button>
      </div>
    </div>
  );

  // Audio control functions
  const togglePlayPause = useCallback(async () => {
    try {
      if (isPlaying) {
        audioService.pause();
        setIsPlaying(false);
      } else {
        await audioService.play(audiobook.audioUrl);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling audio:', error);
    }
  }, [isPlaying, audiobook]);

  const handleVolumeChange = useCallback((newVolume) => {
    audioService.setVolume(newVolume);
    setVolume(newVolume);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
    if (!isMuted) {
      setPreviousVolume(volume);
      setVolume(0);
    } else {
      setVolume(previousVolume);
    }
  }, [isMuted, volume]);

  const handleSeek = useCallback((time) => {
    audioService.seek(time);
    setCurrentTime(time);
  }, []);

  const skipForward = useCallback(() => {
    setCurrentTime(prev => Math.min(prev + 15, parseDuration(audiobook?.duration || "0:00")));
  }, [audiobook]);

  const skipBackward = useCallback(() => {
    setCurrentTime(prev => Math.max(prev - 15, 0));
  }, []);

  // Add state for previous volume
  const [previousVolume, setPreviousVolume] = useState(volume);

  // Add keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.code) {
        case 'Space':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowRight':
          skipForward();
          break;
        case 'ArrowLeft':
          skipBackward();
          break;
        case 'KeyM':
          toggleMute();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [togglePlayPause, skipForward, skipBackward, toggleMute]);

  const [showScrollBottom, setShowScrollBottom] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isNearBottom = window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 100;
      setShowScrollBottom(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add cleanup
  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audioService.getCurrentTime());
    };

    const handleAudioEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audioService.audio.addEventListener('timeupdate', handleTimeUpdate);
    audioService.audio.addEventListener('ended', handleAudioEnded);

    return () => {
      audioService.audio.removeEventListener('timeupdate', handleTimeUpdate);
      audioService.audio.removeEventListener('ended', handleAudioEnded);
      audioService.cleanup();
    };
  }, []);

  const testAudioPlayback = async () => {
    try {
      if (isPlaying) {
        audioService.pause();
        setIsPlaying(false);
      } else {
        console.log('Playing audio from:', sampleAudio); // Debug log
        await audioService.play(sampleAudio);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!audiobook) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Audiobook Not Found</h2>
          <p className="text-gray-400">The audiobook you're looking for doesn't exist or was removed.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl transition-colors"
          >
            Return to Library
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src={audiobook?.coverImage}
          alt=""
          className="w-full h-full object-cover opacity-10 blur-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#0A0A0F]/90 to-[#0A0A0F]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/80 to-transparent">
          <div className="container mx-auto px-6 py-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <FaArrowLeft />
              <span>Back to Library</span>
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-6 pt-24 pb-20">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-72 shrink-0"
            >
              <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={audiobook?.coverImage}
                  alt={audiobook?.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-5xl font-bold mb-3">{audiobook?.title}</h1>
                <p className="text-2xl text-gray-400">{audiobook?.author}</p>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                {audiobook?.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-purple-500 hover:bg-purple-600 rounded-xl transition-colors flex items-center space-x-2">
                  <FaPlay />
                  <span>Continue Listening</span>
                </button>
                <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                  <BiShare className="text-2xl" />
                </button>
                <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                  <BsBookmarkPlus className="text-2xl" />
                </button>
              </div>
            </div>
          </div>

          {/* Chapters Grid */}
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold">Chapters</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {audiobook?.chapters?.map((chapter, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-6 bg-white/5 hover:bg-white/10 rounded-2xl transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium mb-2">{chapter.title}</h3>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400">{chapter.duration}</span>
                        {chapter.progress > 0 && (
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-1 bg-purple-500/30 rounded-full">
                              <div
                                className="h-full bg-purple-500 rounded-full"
                                style={{ width: `${chapter.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-purple-400">{chapter.progress}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaPlay className="text-purple-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>

        {/* Scroll to Bottom Button */}
        <AnimatePresence>
          {showScrollBottom && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}
              className="fixed right-4 bottom-20 z-40 p-3 bg-purple-500 hover:bg-purple-600 rounded-full shadow-lg"
            >
              <FaChevronDown />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Audio Player */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <AudioControls
            audiobook={audiobook}
            isPlaying={isPlaying}
            currentTime={currentTime}
            currentChapter={currentChapter}
            volume={volume}
            isMuted={isMuted}
            playbackSpeed={playbackSpeed}
            togglePlayPause={togglePlayPause}
            setVolume={handleVolumeChange}
            setIsMuted={toggleMute}
            setPlaybackSpeed={setPlaybackSpeed}
            onSeek={handleSeek}
            onSkipForward={skipForward}
            onSkipBackward={skipBackward}
            onNextChapter={goToNextChapter}
            onPreviousChapter={goToPreviousChapter}
          />
        </div>
      </div>
    </div>
  );
};

// Helper functions
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hours ? hours + ':' : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const parseDuration = (duration) => {
  const [hours = 0, minutes = 0, seconds = 0] = duration.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

export default AudiobookDetail;
