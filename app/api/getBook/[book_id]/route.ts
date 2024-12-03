import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Instantiate PrismaClient
const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { book_id: string } }) {
  try {
    const bookId = parseInt(params.book_id, 10);

    if (isNaN(bookId)) {
      console.error('Invalid book ID:', params.book_id);
      return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 });
    }

    console.log('Fetching book with ID:', bookId);

    const book = await prisma.book.findUnique({
      where: { book_id: bookId },
    });

    console.log('Fetched book:', book);

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    const bookWithImage = {
      ...book,
      image: book.image ? `data:image/jpeg;base64,${Buffer.from(book.image).toString('base64')}` : null,
    };

    return NextResponse.json(bookWithImage);
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json({ error: 'An error occurred while fetching the book.' }, { status: 500 });
  } finally {
    // Disconnect PrismaClient to avoid memory leaks
    await prisma.$disconnect();
  }
}

