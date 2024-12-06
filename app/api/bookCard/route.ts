import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'; // Adjust the import path if necessary

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      select: {
        book_id: true,
        title: true,
        author: true,
        genre: true,
        price: true,
        stock: true,
        image: true, // BLOB in MySQL
        isBestSelling: true, // Optional if you want to filter on the frontend
      },
    });

    // Convert image BLOB to Base64 for rendering
    const booksWithBase64Images = books.map((book) => ({
      ...book,
      image: book.image ? Buffer.from(book.image).toString('base64') : null,
    }));

    // Group books by genre
    const booksByGenre = booksWithBase64Images.reduce((acc, book) => {
      if (!acc[book.genre || 'Others']) acc[book.genre || 'Others'] = [];
      acc[book.genre || 'Others'].push(book);
      return acc;
    }, {} as Record<string, typeof booksWithBase64Images>);

    return NextResponse.json({ success: true, booksByGenre });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch books' });
  }
}
