
import React from 'react';
import { usePlayer } from '../hooks/usePlayer';
import { PlayIcon, PauseIcon, NextIcon, PrevIcon, VolumeIcon } from './icons';

const PlayerControls: React.FC = () => {
  const { isPlaying, currentTrack, togglePlay, playNext, playPrev, seek, setVolume, duration, currentTime } = usePlayer();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  if (!currentTrack) {
    return (
        <div className="h-[90px] bg-gray-900 border-t border-gray-800 flex items-center justify-center p-4">
            <p className="text-gray-400">Select a song to play</p>
        </div>
    );
  }

  return (
    <div className="h-[90px] bg-gray-900 border-t border-gray-800 grid grid-cols-3 items-center px-4">
      {/* Track Info */}
      <div className="flex items-center space-x-4">
        <img src={currentTrack.artwork} alt={currentTrack.title} className="w-14 h-14 rounded-md" />
        <div>
          <p className="font-semibold text-white">{currentTrack.title}</p>
          <p className="text-sm text-gray-400">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center space-x-6">
          <button onClick={playPrev} className="text-gray-400 hover:text-white transition-colors">
            <PrevIcon />
          </button>
          <button onClick={togglePlay} className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center hover:scale-105 transition-transform">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button onClick={playNext} className="text-gray-400 hover:text-white transition-colors">
            <NextIcon />
          </button>
        </div>
        <div className="flex items-center space-x-2 w-full max-w-xl mt-2">
            <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
            <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
            />
            <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center justify-end space-x-2">
        <VolumeIcon />
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          defaultValue="1"
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full" 
        />
      </div>
    </div>
  );
};

export default PlayerControls;
