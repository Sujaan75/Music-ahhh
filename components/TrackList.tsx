
import React from 'react';
import type { Playlist } from '../types';
import { usePlayer } from '../hooks/usePlayer';
import { PlayIcon, PauseIcon } from './icons';

interface TrackListProps {
  playlist: Playlist;
  onPlay: (playlistId: string, trackIndex: number) => void;
}

const TrackList: React.FC<TrackListProps> = ({ playlist, onPlay }) => {
  const { currentTrack, isPlaying } = usePlayer();

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div>
        <h3 className="text-xl font-bold mb-4">Tracks</h3>
        <table className="w-full text-left text-sm text-gray-400">
            <thead className="border-b border-gray-700">
                <tr className="text-xs uppercase">
                    <th className="p-3 w-10 text-center">#</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Album</th>
                    <th className="p-3 text-right"><i className="far fa-clock"></i></th>
                </tr>
            </thead>
            <tbody>
                {playlist.tracks.map((track, index) => {
                    const isActive = currentTrack?.id === track.id;
                    return (
                        <tr key={track.id} 
                            className="hover:bg-gray-800/50 rounded-lg group cursor-pointer"
                            onDoubleClick={() => onPlay(playlist.id, index)}
                        >
                            <td className="p-3 text-center">
                                <span className={`group-hover:hidden ${isActive && isPlaying ? 'hidden' : 'inline-block'}`}>{index + 1}</span>
                                <button onClick={() => onPlay(playlist.id, index)} className="hidden group-hover:inline-block">
                                    {isActive && isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
                                </button>
                            </td>
                            <td className="p-3 flex items-center space-x-3">
                                <img src={track.artwork} alt={track.title} className="w-10 h-10 rounded" />
                                <div>
                                    <p className={`font-semibold ${isActive ? 'text-purple-400' : 'text-white'}`}>{track.title}</p>
                                    <p>{track.artist}</p>
                                </div>
                            </td>
                            <td className="p-3">{track.album}</td>
                            <td className="p-3 text-right">{formatDuration(track.duration)}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  );
};

export default TrackList;
