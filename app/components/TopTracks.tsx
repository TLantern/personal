"use client";

import React, { useEffect, useState } from 'react';

interface Track {
  rank: number;
  title: string;
  artist: string;
  albumArt: string;
  spotifyUrl?: string;
}

export const TopTracks = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch('/api/spotify/tracks');
        if (response.ok) {
          const data = await response.json();
          setTracks(data);
        }
      } catch (error) {
        console.error('Error fetching tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  if (loading) {
    return (
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 text-white">♪</div>
          <h4 className="text-white font-bold text-lg">Top Tracks</h4>
        </div>
        <p className="text-white/60 text-xs mb-4">Loading...</p>
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 text-white">♪</div>
          <h4 className="text-white font-bold text-lg">Top Tracks</h4>
        </div>
        <p className="text-white/60 text-xs mb-4">No tracks available</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 text-white">♪</div>
        <h4 className="text-white font-bold text-lg">Top Tracks</h4>
      </div>
      <p className="text-white/60 text-xs mb-4">My current most-played songs from Spotify</p>
      <div className="space-y-3">
        {tracks.map((track) => (
          <a
            key={track.rank}
            href={track.spotifyUrl || `https://open.spotify.com/search/${encodeURIComponent(`${track.title} ${track.artist}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 rounded-lg p-2 -m-2 transition-colors"
          >
            <div className="relative flex-shrink-0 w-12 h-12 rounded overflow-hidden">
              <img src={track.albumArt || 'https://via.placeholder.com/48'} alt={`${track.title} by ${track.artist}`} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">{track.rank}</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{track.title}</p>
              <p className="text-white/60 text-xs truncate">{track.artist}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

