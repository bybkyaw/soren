import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { book_id: string } }
) {
  try {
    const bookId = parseInt(params.book_id, 10);

    if (isNaN(bookId)) {
      console.error('Invalid book ID:', params.book_id);
      return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 });
    }

    const data = await request.json();
    console.log('Received data:', data);

    const { title, author, genre, price, stock, image } = data;

    if (!title || !author || price === undefined || stock === undefined) {
      console.error('Missing required fields:', { title, author, price, stock });
      return NextResponse.json(
        { error: 'Missing required fields: title, author, price, or stock' },
        { status: 400 }
      );
    }

    if (typeof price !== 'number' || typeof stock !== 'number') {
      console.error('Invalid data types for price or stock:', { price, stock });
      return NextResponse.json(
        { error: 'Invalid data types for price or stock' },
        { status: 400 }
      );
    }

    let imageBuffer: Buffer | null = null;

    if (image) {
      // Convert Base64 to Buffer
      const base64Regex = /^data:image\/\w+;base64,/;
      if (base64Regex.test(image)) {
        imageBuffer = Buffer.from(image.replace(base64Regex, ''), 'base64');
      } else {
        console.error('Invalid image format');
        return NextResponse.json(
          { error: 'Invalid image format' },
          { status: 400 }
        );
      }
    }

    const updatedBook = await prisma.book.update({
      where: { book_id: bookId },
      data: {
        title,
        author,
        genre: genre || null,
        price: parseFloat(price.toString()),
        stock: parseInt(stock.toString(), 10),
        image: imageBuffer, // Save as BLOB
      },
    });

    console.log('Updated book:', updatedBook);

    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json(
      { error: 'Failed to update book. Please try again later.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


