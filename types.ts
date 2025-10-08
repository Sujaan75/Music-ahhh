
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  artwork: string;
  url: string; // URL to the audio file
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverArt: string;
  tracks: Track[];
}
