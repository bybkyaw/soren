import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookId } = body;

    // Validate `bookId`
    if (!bookId || isNaN(Number(bookId))) {
      return NextResponse.json({ success: false, message: "Invalid book ID provided." }, { status: 400 });
    }

    const parsedBookId = parseInt(bookId, 10);

    // Update the book's `isBestSelling` flag to `false`
    const updatedBook = await prisma.book.update({
      where: { book_id: parsedBookId },
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


// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { bookId } = body;

//     // Validate the `bookId`
//     if (!bookId || isNaN(Number(bookId))) {
//       return NextResponse.json({ success: false, message: "Invalid book ID provided." }, { status: 400 });
//     }

//     const parsedBookId = parseInt(bookId, 10);

//     // Update the book's `isBestSelling` flag to `false`
//     const updatedBook = await prisma.book.update({
//       where: { book_id: parsedBookId }, // Match `book_id` in the schema
//       data: { isBestSelling: false },
//     });

//     return NextResponse.json({ success: true, book: updatedBook });
//   } catch (error) {
//     console.error("Error removing book from best-selling:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to remove book from best-selling." },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }
