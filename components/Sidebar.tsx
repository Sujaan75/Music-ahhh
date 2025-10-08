
import React from 'react';
import { HomeIcon, LibraryIcon, SearchIcon, RadioIcon, PlusIcon } from './icons';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: <HomeIcon />, name: 'Home' },
    { icon: <SearchIcon />, name: 'Search' },
    { icon: <LibraryIcon />, name: 'Your Library' },
  ];

  const playlists = ['Chill Vibes', 'Workout Mix', 'Late Night Lo-fi', 'Road Trip'];

  return (
    <aside className="w-64 bg-black p-4 flex-shrink-0 flex flex-col space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-6 flex items-center">
            <i className="fas fa-headphones-alt mr-2 text-purple-500"></i>
            VibeStream
        </h1>
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200 py-2 font-semibold">
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex-grow flex flex-col min-h-0">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Playlists</h2>
            <button className="text-gray-400 hover:text-white transition-colors duration-200">
                <PlusIcon />
            </button>
        </div>
        <ul className="space-y-2 overflow-y-auto flex-grow">
          {playlists.map((name, index) => (
            <li key={index}>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
