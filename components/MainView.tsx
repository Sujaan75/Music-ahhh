
import React, { useEffect, useState } from 'react';
import type { Playlist } from '../types';
import { getFeaturedPlaylists } from '../services/musicService';
import { usePlayer } from '../hooks/usePlayer';
import TrackList from './TrackList';
import Visualizer from './Visualizer';

const MainView: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { play, playlist: activePlaylist } = usePlayer();

  useEffect(() => {
    getFeaturedPlaylists().then(data => {
      setPlaylists(data);
      setSelectedPlaylist(data[0] || null);
      setLoading(false);
    });
  }, []);

  const handlePlaylistSelect = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
  };
  
  if (loading) {
    return (
        <div className="flex-grow bg-gradient-to-b from-gray-900 to-black p-8 text-white flex items-center justify-center">
            <div className="text-2xl">Loading...</div>
        </div>
    );
  }

  return (
    <main className="flex-grow bg-gradient-to-b from-gray-900 to-black p-8 text-white overflow-y-auto">
      <div className="relative h-96 rounded-xl overflow-hidden mb-8 flex items-end p-8 bg-cover bg-center" style={{backgroundImage: `url(${selectedPlaylist?.coverArt})`}}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <h2 className="text-sm font-bold uppercase tracking-widest">Playlist</h2>
          <h1 className="text-7xl font-black">{selectedPlaylist?.name}</h1>
          <p className="text-gray-300 mt-2">{selectedPlaylist?.description}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {playlists.map(p => (
            <div key={p.id} className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-300 cursor-pointer" onClick={() => handlePlaylistSelect(p)}>
              <img src={p.coverArt} alt={p.name} className="w-full h-auto rounded-md mb-3 aspect-square object-cover" />
              <h3 className="font-bold text-white truncate">{p.name}</h3>
              <p className="text-sm text-gray-400 truncate">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {activePlaylist?.id === selectedPlaylist?.id && <Visualizer />}

      {selectedPlaylist && <TrackList playlist={selectedPlaylist} onPlay={play} />}

    </main>
  );
};

export default MainView;
