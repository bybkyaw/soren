import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all books from the database
    const books = await prisma.book.findMany();

    // Convert binary images to Base64 for rendering
    const booksWithImages = books.map((book) => ({
      ...book,
      image: book.image ? Buffer.from(book.image).toString("base64") : null,
    }));

    return NextResponse.json({ success: true, books: booksWithImages });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch books." },
      { status: 500 }
    );
  }
}
