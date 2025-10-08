
import React from 'react';
import { PlayerProvider } from './context/PlayerContext';
import Sidebar from './components/Sidebar';
import MainView from './components/MainView';
import PlayerControls from './components/PlayerControls';

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <div className="h-screen w-screen bg-black text-gray-300 flex flex-col font-sans overflow-hidden">
        <div className="flex flex-grow" style={{ height: 'calc(100vh - 90px)' }}>
          <Sidebar />
          <MainView />
        </div>
        <PlayerControls />
      </div>
    </PlayerProvider>
  );
};

export default App;
