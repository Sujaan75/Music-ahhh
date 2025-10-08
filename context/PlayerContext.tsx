
import React, { createContext, useState, useRef, useCallback, ReactNode, useEffect } from 'react';
import type { Track, Playlist } from '../types';
import { getPlaylistById } from '../services/musicService';

interface PlayerContextType {
  isPlaying: boolean;
  currentTrack: Track | null;
  currentTrackIndex: number | null;
  playlist: Playlist | null;
  play: (playlistId: string, trackIndex: number) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  duration: number;
  currentTime: number;
  audioRef: React.RefObject<HTMLAudioElement>;
  analyser: AnalyserNode | null;
}

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const currentTrack = playlist && currentTrackIndex !== null ? playlist.tracks[currentTrackIndex] : null;

  const setupAudioContext = useCallback(() => {
    if (audioRef.current && !audioContextRef.current) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = audioContext.createMediaElementSource(audioRef.current);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
    }
  }, []);

  const play = useCallback(async (playlistId: string, trackIndex: number) => {
    const newPlaylist = await getPlaylistById(playlistId);
    if (newPlaylist) {
      setPlaylist(newPlaylist);
      setCurrentTrackIndex(trackIndex);
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
        audioRef.current.src = currentTrack.url;
        audioRef.current.play().then(() => {
            setIsPlaying(true);
            setupAudioContext();
        }).catch(e => {
            console.error("Error playing audio:", e);
            setIsPlaying(false);
        });
    }
  }, [currentTrack, setupAudioContext]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
       if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
         audioContextRef.current.resume();
       }
       setupAudioContext();
       audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, setupAudioContext]);

  const playNext = useCallback(() => {
    if (!playlist || currentTrackIndex === null) return;
    const nextIndex = (currentTrackIndex + 1) % playlist.tracks.length;
    setCurrentTrackIndex(nextIndex);
  }, [playlist, currentTrackIndex]);

  const playPrev = useCallback(() => {
    if (!playlist || currentTrackIndex === null) return;
    const prevIndex = (currentTrackIndex - 1 + playlist.tracks.length) % playlist.tracks.length;
    setCurrentTrackIndex(prevIndex);
  }, [playlist, currentTrackIndex]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const value: PlayerContextType = {
    isPlaying,
    currentTrack,
    currentTrackIndex,
    playlist,
    play,
    togglePlay,
    playNext,
    playPrev,
    seek,
    setVolume,
    duration,
    currentTime,
    audioRef,
    analyser: analyserRef.current
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={playNext}
        crossOrigin="anonymous"
      />
    </PlayerContext.Provider>
  );
};
