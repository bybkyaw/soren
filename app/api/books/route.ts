import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get('genre'); // Get the genre parameter

  if (!genre) {
    return NextResponse.json(
      { success: false, message: 'Genre parameter is required.' },
      { status: 400 }
    );
  }

  try {
    // Fetch books for the given genre
    const books = await prisma.book.findMany({
      where: { genre },
      select: {
        book_id: true,
        title: true,
        author: true,
        price: true, // Fetch price
        genre: true,
        stock: true,
        image: true, // Assuming image is stored as Bytes
      },
    });

    // Convert image from Bytes to Base64 (if applicable)
    const formattedBooks = books.map((book) => ({
      ...book,
      price: book.price ?? 0, // Ensure price is not null
      image: book.image ? Buffer.from(book.image).toString('base64') : null,
    }));

    return NextResponse.json({ success: true, books: formattedBooks });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch books.' },
      { status: 500 }
    );
  }
}


// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const genre = searchParams.get('genre'); // Get the genre parameter

//   if (!genre) {
//     return NextResponse.json(
//       { success: false, message: 'Genre parameter is required.' },
//       { status: 400 }
//     );
//   }

//   try {
//     // Fetch books for the given genre
//     const books = await prisma.book.findMany({
//       where: { genre },
//       select: {
//         book_id: true,
//         title: true,
//         author: true,
//         price: true,
//         image: true, // Assuming it's stored as Blob
//       },
//     });

//     // Format books data for the frontend
//     const formattedBooks = books.map((book) => ({
//       book_id: book.book_id,
//       title: book.title,
//       author: book.author,
//       price: book.price,
//       image: book.image ? Buffer.from(book.image).toString('base64') : null,
//     }));

//     return NextResponse.json({ success: true, books: formattedBooks });
//   } catch (error) {
//     console.error(`Error fetching books for genre "${genre}":`, error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to fetch books.' },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }


