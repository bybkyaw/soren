import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch unique genres from the Book table
    const genres = await prisma.book.findMany({
      where: {
        genre: { not: null },
      },
      distinct: ['genre'],
      select: { genre: true },
    });

    // Map to extract genre strings
    const uniqueGenres = genres.map((book) => book.genre);

    return NextResponse.json({ success: true, genres: uniqueGenres });
  } catch (error) {
    console.error('Error fetching genres:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch genres.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


