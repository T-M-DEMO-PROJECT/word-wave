import React, { useState, useEffect } from 'react';
import sampleAudio from '../assets/audio/audio-file.mp3';

const AudioTest = () => {
  const [audio] = useState(new Audio(sampleAudio));
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play()
        .then(() => console.log('Audio playing'))
        .catch(e => console.error('Playback failed:', e));
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // Add event listeners for debugging
    audio.addEventListener('loadstart', () => console.log('Loading started'));
    audio.addEventListener('canplay', () => console.log('Can play'));
    audio.addEventListener('playing', () => console.log('Playing'));
    audio.addEventListener('error', (e) => console.error('Error:', e));

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audio]);

  return (
    <div className="p-4">
      <h2>Audio Test</h2>
      <button 
        onClick={togglePlay}
        className="bg-purple-500 text-white px-4 py-2 rounded"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <p>Audio source: {sampleAudio}</p>
    </div>
  );
};

export default AudioTest; 