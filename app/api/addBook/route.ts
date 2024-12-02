import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Check for all required fields
    if (!data.title || !data.author || !data.isbn || !data.price || !data.stock) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let imageBuffer: Buffer | null = null;

    // Validate and process the image if provided
    if (data.coverImage) {
      const imageParts = data.coverImage.split(',');

      if (imageParts.length !== 2) {
        return NextResponse.json(
          { success: false, error: 'Invalid image format' },
          { status: 400 }
        );
      }

      const mimeType = imageParts[0].match(/data:image\/(png|jpeg);base64/);
      if (!mimeType) {
        return NextResponse.json(
          { success: false, error: 'Only PNG and JPEG images are allowed' },
          { status: 400 }
        );
      }

      imageBuffer = Buffer.from(imageParts[1], 'base64');
    }

    // Insert the new book into the database
    const newBook = await prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        genre: data.genre || null,
        isbn: data.isbn,
        price: parseFloat(data.price),
        stock: parseInt(data.stock, 10),
        image: imageBuffer,
      },
    });

    return NextResponse.json({ success: true, book: newBook });
  } catch (error) {
    console.error('Error adding book:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add book' },
      { status: 500 }
    );
  }
}



