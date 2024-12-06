import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { bookId } = await request.json();

    // Ensure the book ID is valid
    if (!bookId) {
      return NextResponse.json({ success: false, message: "Book ID is required." }, { status: 400 });
    }

    // Update the book's `isBestSelling` flag to true
    const updatedBook = await prisma.book.update({
      where: { book_id: bookId },
      data: { isBestSelling: true },
    });

    return NextResponse.json({ success: true, book: updatedBook });
  } catch (error) {
    console.error("Error adding book to best-selling:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add book to best-selling." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


