import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all books with `isBestSelling: true`
    const bestSellingBooks = await prisma.book.findMany({
      where: { isBestSelling: true },
    });

    // Convert BLOB image to Base64
    const booksWithImages = bestSellingBooks.map((book) => ({
      ...book,
      image: book.image ? Buffer.from(book.image).toString('base64') : null, // Convert BLOB to Base64
    }));

    return NextResponse.json({ success: true, books: booksWithImages });
  } catch (error) {
    console.error("Error fetching Best Selling Books:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch Best Selling Books." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the payload
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid payload provided." },
        { status: 400 }
      );
    }

    const { bookId, isBestSelling } = body;

    if (!bookId || isNaN(Number(bookId))) {
      return NextResponse.json(
        { success: false, message: "Invalid book ID provided." },
        { status: 400 }
      );
    }

    if (typeof isBestSelling !== "boolean") {
      return NextResponse.json(
        { success: false, message: "Invalid isBestSelling value provided." },
        { status: 400 }
      );
    }

    const parsedBookId = parseInt(bookId, 10);

    // Update the book's `isBestSelling` flag
    const updatedBook = await prisma.book.update({
      where: { book_id: parsedBookId },
      data: { isBestSelling },
    });

    return NextResponse.json({ success: true, book: updatedBook });
  } catch (error) {
    console.error("Error updating Best Selling Book status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update Best Selling Book status." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


