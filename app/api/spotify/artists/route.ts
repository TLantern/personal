import { NextResponse } from 'next/server';
import { getTopArtists } from '@/lib/spotify';

export async function GET() {
  try {
    // For now, using a placeholder userId
    // In production, you'd get this from the authenticated user session
    const artists = await getTopArtists('user', 5);
    return NextResponse.json(artists);
  } catch (error) {
    console.error('Error in artists API:', error);
    return NextResponse.json({ error: 'Failed to fetch artists' }, { status: 500 });
  }
}

