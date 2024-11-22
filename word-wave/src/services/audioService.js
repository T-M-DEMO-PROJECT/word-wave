class AudioService {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = 'metadata';

    // Add event listeners for debugging
    this.audio.addEventListener('loadstart', () => {
      console.log('Audio loading started');
    });

    this.audio.addEventListener('canplay', () => {
      console.log('Audio can play');
    });

    this.audio.addEventListener('playing', () => {
      console.log('Audio is playing');
    });

    this.audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
    });
  }

  async play(url) {
    try {
      console.log('Attempting to play:', url);
      if (this.audio.src !== url) {
        console.log('Setting new audio source');
        this.audio.src = url;
        
        // Wait for audio to be loaded
        await new Promise((resolve, reject) => {
          this.audio.oncanplay = resolve;
          this.audio.onerror = reject;
        });
      }
      
      const playResult = await this.audio.play();
      console.log('Audio playing:', playResult);
      return playResult;
    } catch (error) {
      console.error('Error in audioService.play:', error);
      throw error;
    }
  }

  pause() {
    console.log('Pausing audio');
    this.audio.pause();
  }

  setVolume(value) {
    this.audio.volume = value;
  }

  setPlaybackRate(value) {
    this.audio.playbackRate = value;
  }

  seek(time) {
    if (time >= 0 && time <= this.audio.duration) {
      this.audio.currentTime = time;
    }
  }

  getCurrentTime() {
    return this.audio.currentTime;
  }

  getDuration() {
    return this.audio.duration;
  }

  cleanup() {
    this.audio.pause();
    this.audio.src = '';
  }
}

export const audioService = new AudioService(); 