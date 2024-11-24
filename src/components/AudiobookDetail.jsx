import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import axios from 'axios';
import { AUDIO_SOURCES } from '../utils/audioSources';

const AudiobookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [audiobook, setAudiobook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchAudiobookDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://wordwave-app-backend.onrender.com/audiobooks', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const books = response.data;
        const bookIndex = parseInt(id.split('-').pop());
        const book = books[bookIndex];

        if (!book) {
          throw new Error('Audiobook not found');
        }

        setAudiobook({
          ...book,
          audioUrl: AUDIO_SOURCES[book.title] || AUDIO_SOURCES.default
        });

      } catch (err) {
        console.error('Error:', err);
        setError(err.message || 'Failed to fetch audiobook details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAudiobookDetails();
  }, [id]);

  const handlePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Create a new audio element each time we play
      audioRef.current = new Audio(audiobook.audioUrl);
      audioRef.current.crossOrigin = 'anonymous';
      
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });

      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio playback error:', e);
        setError('Failed to play audio');
        setIsPlaying(false);
      });

      audioRef.current.play().catch(err => {
        console.error('Play error:', err);
        setError('Failed to play audio');
        setIsPlaying(false);
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-8">
      {audiobook && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/40 rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Cover Image */}
              <div className="w-full md:w-1/3">
                <img
                  src={audiobook.coverImage}
                  alt={audiobook.title}
                  className="w-full rounded-lg shadow-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x400?text=No+Cover';
                  }}
                />
              </div>

              {/* Details */}
              <div className="w-full md:w-2/3">
                <h1 className="text-3xl font-bold mb-4">{audiobook.title}</h1>
                <p className="text-gray-400 mb-2">By {audiobook.author}</p>
                <p className="text-gray-400 mb-4">Narrated by {audiobook.narrator}</p>
                <p className="text-gray-300 mb-6">{audiobook.description}</p>

                {/* Audio Controls */}
                <div className="flex items-center space-x-4 mb-6">
                  <button
                    onClick={handlePlay}
                    className={`px-6 py-3 rounded-xl flex items-center space-x-2 ${
                      audioRef.current && audioRef.current.canPlayType('audio/mp3') ? 'bg-purple-500 hover:bg-purple-600' : 'bg-purple-500/50 cursor-not-allowed'
                    }`}
                  >
                    {isPlaying ? <FaPause className="mr-2" /> : <FaPlay className="mr-2" />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  <button
                    onClick={handleMute}
                    className={`p-3 rounded-xl ${
                      audioRef.current && audioRef.current.canPlayType('audio/mp3') ? 'bg-white/10 hover:bg-white/20' : 'bg-white/5 cursor-not-allowed'
                    }`}
                  >
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>
                </div>

                {error && (
                  <p className="text-red-400 mb-4">{error}</p>
                )}

                <button
                  onClick={() => navigate('/audiobook-list')}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl"
                >
                  Back to List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudiobookDetail;