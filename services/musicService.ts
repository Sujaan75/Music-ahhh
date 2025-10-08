
import type { Track, Playlist } from '../types';

const mockTracks: Track[] = [
  { id: 't1', title: 'Cosmic Drift', artist: 'Astro Beats', album: 'Galaxy Grooves', duration: 210, artwork: 'https://picsum.photos/seed/cosmic/300', url: 'https://cdn.pixabay.com/audio/2022/02/07/audio_c4d51c339c.mp3' },
  { id: 't2', title: 'Oceanic Pulse', artist: 'Deep Wave', album: 'Tidal Rhythms', duration: 185, artwork: 'https://picsum.photos/seed/oceanic/300', url: 'https://cdn.pixabay.com/audio/2023/07/11/audio_165db91217.mp3' },
  { id: 't3', title: 'City Night Lights', artist: 'Urban Glow', album: 'Metropolis', duration: 240, artwork: 'https://picsum.photos/seed/city/300', url: 'https://cdn.pixabay.com/audio/2022/11/17/audio_85d138814a.mp3' },
  { id: 't4', title: 'Forest Awakening', artist: 'Natura Sonus', album: 'Earthen Melodies', duration: 195, artwork: 'https://picsum.photos/seed/forest/300', url: 'https://cdn.pixabay.com/audio/2022/05/23/audio_adf3a8265e.mp3' },
  { id: 't5', title: 'Retro Drive', artist: '80s Kid', album: 'Neon Sunset', duration: 220, artwork: 'https://picsum.photos/seed/retro/300', url: 'https://cdn.pixabay.com/audio/2023/11/15/audio_51b6ce3489.mp3' },
  { id: 't6', title: 'Lofi Chill', artist: 'Study Buddy', album: 'Rainy Day', duration: 180, artwork: 'https://picsum.photos/seed/lofi/300', url: 'https://cdn.pixabay.com/audio/2022/08/04/audio_2bbe619949.mp3' },
];

const mockPlaylists: Playlist[] = [
  {
    id: 'pl1',
    name: 'Chill Vibes',
    description: 'Relax and unwind with these laid-back tracks.',
    coverArt: 'https://picsum.photos/seed/chill/400',
    tracks: [mockTracks[5], mockTracks[1], mockTracks[3]],
  },
  {
    id: 'pl2',
    name: 'Energetic Mix',
    description: 'Get pumped with this high-energy playlist.',
    coverArt: 'https://picsum.photos/seed/energy/400',
    tracks: [mockTracks[0], mockTracks[2], mockTracks[4]],
  },
  {
    id: 'pl3',
    name: 'Focus Flow',
    description: 'Instrumental beats to help you concentrate.',
    coverArt: 'https://picsum.photos/seed/focus/400',
    tracks: [mockTracks[3], mockTracks[1], mockTracks[5], mockTracks[0]],
  },
];

const apiDelay = 500; // ms

export const getFeaturedPlaylists = (): Promise<Playlist[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockPlaylists);
    }, apiDelay);
  });
};

export const getPlaylistById = (id: string): Promise<Playlist | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockPlaylists.find(p => p.id === id));
    }, apiDelay);
  });
};
