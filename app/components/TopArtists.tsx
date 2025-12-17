"use client";

import React, { useEffect, useState } from 'react';

interface Artist {
  rank: number;
  name: string;
  image: string;
  spotifyUrl?: string;
}

export const TopArtists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('/api/spotify/artists');
        if (response.ok) {
          const data = await response.json();
          setArtists(data);
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return (
      <div className="flex-1">
        <h4 className="text-white font-bold text-lg mb-3">Top Artists</h4>
        <p className="text-white/60 text-xs">Loading...</p>
      </div>
    );
  }

  if (artists.length === 0) {
    return (
      <div className="flex-1">
        <h4 className="text-white font-bold text-lg mb-3">Top Artists</h4>
        <p className="text-white/60 text-xs">No artists available</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <h4 className="text-white font-bold text-lg mb-3">Top Artists</h4>
      <div className="flex flex-wrap gap-4">
        {artists.map((artist) => (
          <a
            key={artist.rank}
            href={artist.spotifyUrl || `https://open.spotify.com/search/${encodeURIComponent(artist.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-colors">
                <img src={artist.image || 'https://via.placeholder.com/80'} alt={artist.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white/20">
                <span className="text-white text-xs font-bold">{artist.rank}</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-white text-xs text-center max-w-[80px] truncate">{artist.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

