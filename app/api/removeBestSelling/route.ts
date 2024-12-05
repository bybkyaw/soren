import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { bookId } = await request.json();

    const updatedBook = await prisma.book.update({
      where: { book_id: bookId },
      data: { isBestSelling: false },
    });

    return NextResponse.json({ success: true, book: updatedBook });
  } catch (error) {
    console.error("Error removing book from best-selling:", error);
    return NextResponse.json(
      { success: false, message: "Failed to remove book from best-selling." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
