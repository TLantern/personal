import { NextResponse } from 'next/server';
import { getTopTracks } from '@/lib/spotify';

export async function GET() {
  try {
    // For now, using a placeholder userId
    // In production, you'd get this from the authenticated user session
    const tracks = await getTopTracks('user', 5);
    return NextResponse.json(tracks);
  } catch (error) {
    console.error('Error in tracks API:', error);
    return NextResponse.json({ error: 'Failed to fetch tracks' }, { status: 500 });
  }
}

