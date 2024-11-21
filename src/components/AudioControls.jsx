const AudioControls = ({ 
  audiobook, 
  isPlaying,
  currentTime,
  volume,
  playbackSpeed,
  togglePlayPause,
  onVolumeChange,
  onSeek,
  onPlaybackSpeedChange
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="p-3 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          {/* Audio Element */}
          <audio 
  controls
  onTimeUpdate={() => currentTime(audio.currentTime)}
  onEnded={() => {
    isPlaying(false);
    currentTime(0);
  }}
>
            <source src="https://savefiles.org/secure/uploads/22831?shareable_link=552" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          {/* Progress Bar */}
          <div className="flex-1 flex items-center gap-3">
            <span className="text-sm">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={audioService.getDuration() || 100}
              value={currentTime}
              onChange={(e) => onSeek(Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
            />
            <span className="text-sm">{audiobook?.duration}</span>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <MdVolumeUp />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              className="w-20 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
            />
          </div>

          {/* Playback Speed */}
          <select
            value={playbackSpeed}
            onChange={(e) => onPlaybackSpeedChange(Number(e.target.value))}
            className="bg-transparent border border-white/10 rounded px-2 py-1"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </div>
    </div>
  );
};