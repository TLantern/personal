interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    images: Array<{ url: string }>;
  };
  external_urls?: {
    spotify: string;
  };
}

interface SpotifyArtist {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  external_urls?: {
    spotify: string;
  };
}

interface SpotifyTopTracksResponse {
  items: SpotifyTrack[];
}

interface SpotifyTopArtistsResponse {
  items: SpotifyArtist[];
}

export interface Track {
  rank: number;
  title: string;
  artist: string;
  albumArt: string;
  spotifyUrl?: string;
}

export interface Artist {
  rank: number;
  name: string;
  image: string;
  spotifyUrl?: string;
}

let accessToken: string | null = null;
let tokenExpiry: number = 0;

async function getAccessToken(): Promise<string> {
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Spotify API credentials not configured');
  }

  // Encode credentials for Basic Auth
  const credentials = `${clientId}:${clientSecret}`;
  const encodedCredentials = Buffer.from(credentials).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${encodedCredentials}`,
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get Spotify access token');
  }

  const data: SpotifyTokenResponse = await response.json();
  accessToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000; // Refresh 60s before expiry

  return accessToken;
}

// Note: Top tracks/artists require user OAuth authorization
// For now, this uses a user access token from environment variable
// You'll need to implement OAuth flow or use a long-lived user token
export async function getTopTracks(userId: string, limit: number = 5): Promise<Track[]> {
  try {
    // Check if user access token is provided (from OAuth)
    const userToken = process.env.SPOTIFY_USER_ACCESS_TOKEN;
    
    if (userToken) {
      const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=short_term`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        const data: SpotifyTopTracksResponse = await response.json();
        return data.items.map((track, index) => ({
          rank: index + 1,
          title: track.name,
          artist: track.artists.map(a => a.name).join(', '),
          albumArt: track.album.images[0]?.url || '',
          spotifyUrl: track.external_urls?.spotify || `https://open.spotify.com/track/${track.id}`,
        }));
      }
    }
    
    // Fallback to featured tracks if user data not available
    return getFeaturedTracks(limit);
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return getFeaturedTracks(limit);
  }
}

export async function getTopArtists(userId: string, limit: number = 5): Promise<Artist[]> {
  try {
    // Check if user access token is provided (from OAuth)
    const userToken = process.env.SPOTIFY_USER_ACCESS_TOKEN;
    
    if (userToken) {
      const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=short_term`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        const data: SpotifyTopArtistsResponse = await response.json();
        return data.items.map((artist, index) => ({
          rank: index + 1,
          name: artist.name,
          image: artist.images[0]?.url || '',
          spotifyUrl: `https://open.spotify.com/artist/${artist.id}`,
        }));
      }
    }
    
    // Fallback to featured artists if user data not available
    return getFeaturedArtists(limit);
  } catch (error) {
    console.error('Error fetching top artists:', error);
    return getFeaturedArtists(limit);
  }
}

// Fallback functions for public data
async function getFeaturedTracks(limit: number): Promise<Track[]> {
  const defaultTracks = [
    { title: 'Idea 12', artist: 'Gibran Alcocer' },
    { title: 'BESO', artist: 'ROSALÍA, Rauw Alejandro' },
    { title: 'Mount Everest', artist: 'K Suave' },
    { title: 'Tarot', artist: 'Bad Bunny, JHAYCO' },
    { title: 'Bae Bae', artist: 'Ruger, BNXN' },
    { title: 'Bounce', artist: 'Ruger' },
  ];

  try {
    const token = await getAccessToken();
    const tracks: Track[] = [];

    for (let i = 0; i < Math.min(defaultTracks.length, limit); i++) {
      const trackInfo = defaultTracks[i];
      try {
        const query = `${trackInfo.title} ${trackInfo.artist}`;
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const track = data.tracks?.items?.[0];
          if (track) {
            tracks.push({
              rank: i + 1,
              title: track.name,
              artist: track.artists?.map((a: any) => a.name).join(', ') || trackInfo.artist,
              albumArt: track.album?.images?.[0]?.url || '',
              spotifyUrl: track.external_urls?.spotify || `https://open.spotify.com/track/${track.id}`,
            });
          } else {
            // Fallback if track not found
            tracks.push({
              rank: i + 1,
              title: trackInfo.title,
              artist: trackInfo.artist,
              albumArt: '',
              spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(`${trackInfo.title} ${trackInfo.artist}`)}`,
            });
          }
        } else {
          // Fallback if API call fails
          tracks.push({
            rank: i + 1,
            title: trackInfo.title,
            artist: trackInfo.artist,
            albumArt: '',
            spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(`${trackInfo.title} ${trackInfo.artist}`)}`,
          });
        }
      } catch (error) {
        // Fallback if search fails
        tracks.push({
          rank: i + 1,
          title: trackInfo.title,
          artist: trackInfo.artist,
          albumArt: '',
          spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(`${trackInfo.title} ${trackInfo.artist}`)}`,
        });
      }
    }

    return tracks;
  } catch (error) {
    console.error('Error fetching featured tracks:', error);
    // Return default list even if API fails
    return defaultTracks.slice(0, limit).map((track, index) => ({
      rank: index + 1,
      title: track.title,
      artist: track.artist,
      albumArt: '',
      spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(`${track.title} ${track.artist}`)}`,
    }));
  }
}

async function getFeaturedArtists(limit: number): Promise<Artist[]> {
  const defaultArtists = ['Drake', 'Gilbran Alcocer', 'Bad Bunny', 'Ruger', 'K suave', 'Playboi Carti'];
  
  try {
    const token = await getAccessToken();
    const artists: Artist[] = [];

    for (let i = 0; i < Math.min(defaultArtists.length, limit); i++) {
      const artistName = defaultArtists[i];
      try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const artist = data.artists?.items?.[0];
          if (artist) {
            artists.push({
              rank: i + 1,
              name: artist.name,
              image: artist.images?.[0]?.url || '',
              spotifyUrl: artist.external_urls?.spotify || `https://open.spotify.com/search/${encodeURIComponent(artistName)}`,
            });
          } else {
            // Fallback if artist not found
            artists.push({
              rank: i + 1,
              name: artistName,
              image: '',
              spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(artistName)}`,
            });
          }
        } else {
          // Fallback if API call fails
          artists.push({
            rank: i + 1,
            name: artistName,
            image: '',
            spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(artistName)}`,
          });
        }
      } catch (error) {
        // Fallback if search fails
        artists.push({
          rank: i + 1,
          name: artistName,
          image: '',
          spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(artistName)}`,
        });
      }
    }

    return artists;
  } catch (error) {
    console.error('Error fetching featured artists:', error);
    // Return default list even if API fails
    return defaultArtists.slice(0, limit).map((name, index) => ({
      rank: index + 1,
      name,
      image: '',
      spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(name)}`,
    }));
  }
}

