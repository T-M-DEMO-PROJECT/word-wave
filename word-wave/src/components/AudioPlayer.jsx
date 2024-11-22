import React, { useState, useRef } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const AudioPlayer = ({ audioUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

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

  return (
    <div className="bg-white/5 rounded-xl p-4">
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="flex items-center space-x-4">
        <button
          onClick={togglePlay}
          className="p-3 bg-purple-500 hover:bg-purple-600 rounded-full"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        
        <button
          onClick={toggleMute}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full"
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        
        <div className="text-sm text-gray-400">
          Now Playing: {title}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer; 