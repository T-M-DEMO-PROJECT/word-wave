import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay, FaPause, FaBackward, FaForward, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import axios from 'axios';

const AudiobookPlayer = () => {
  const { id } = useParams();
  const [audiobook, setAudiobook] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchAudiobook = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `https://wordwave-app-backend.onrender.com/audiobooks/${id}/details`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        if (response.data) {
          setAudiobook(response.data);
        } else {
          throw new Error('No audiobook data received');
        }
      } catch (err) {
        console.error('Failed to fetch audiobook:', err);
        setError('Unable to load audiobook. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAudiobook();
  }, [id]);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(progress);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center">
        <div className="animate-pulse text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Book Info */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <img 
              src={audiobook?.coverImage} 
              alt={audiobook?.title}
              className="w-full rounded-xl shadow-2xl"
            />
          </div>
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{audiobook?.title}</h1>
            <p className="text-gray-400 text-xl mb-4">{audiobook?.author}</p>
            <p className="text-gray-300">{audiobook?.description}</p>
          </div>
        </div>

        {/* Audio Player */}
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <audio
            ref={audioRef}
            src={audiobook?.audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          />
          
          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-2 mb-8">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8">
            <button className="text-white/80 hover:text-white transition-colors">
              <FaBackward size={24} />
            </button>
            
            <button 
              onClick={togglePlay}
              className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
            >
              {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
            </button>
            
            <button className="text-white/80 hover:text-white transition-colors">
              <FaForward size={24} />
            </button>

            <button
              onClick={toggleMute}
              className="text-white/80 hover:text-white transition-colors"
            >
              {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
            </button>
          </div>

          <div className="text-sm text-gray-400 text-center mt-4">
            Now Playing: {audiobook?.title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudiobookPlayer; 