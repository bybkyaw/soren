import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  try {
    // Extract the book_id from query parameters
    const { searchParams } = new URL(req.url);
    const book_id = searchParams.get("book_id");

    // Validate book_id
    if (!book_id || isNaN(parseInt(book_id))) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing book_id." },
        { status: 400 }
      );
    }

    // Attempt to delete the book
    const deletedBook = await prisma.book.delete({
      where: { book_id: parseInt(book_id, 10) },
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Book deleted successfully.",
      book: deletedBook,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Record to delete does not exist")) {
      return NextResponse.json(
        { success: false, message: "Book not found." },
        { status: 404 }
      );
    }

    console.error("Error deleting book:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

