import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RequestBody {
  filter: 'all' | 'author' | 'title' | 'genre' | 'stock';
  value?: string | number;
  operator?: 'less' | 'greater' | 'equal';
}

export async function POST(req: Request) {
  try {
    const { filter, value, operator }: RequestBody = await req.json();

    // Validate input
    if (!filter) {
      return NextResponse.json(
        { message: "Filter is required.", books: [] },
        { status: 400 }
      );
    }

    let whereClause = {};

    if (filter !== 'all') {
      if (filter === 'stock') {
        // Handle stock filtering
        const numericValue = parseInt(value as string, 10);
        if (isNaN(numericValue)) {
          return NextResponse.json(
            { message: "Invalid stock value.", books: [] },
            { status: 400 }
          );
        }

        whereClause =
          operator === 'less'
            ? { stock: { lt: numericValue } }
            : operator === 'greater'
            ? { stock: { gt: numericValue } }
            : operator === 'equal'
            ? { stock: { equals: numericValue } }
            : {};
      } else {
        // Handle other filters (author, title, genre)
        whereClause = { [filter]: value };
      }
    }

    // Fetch books from database
    const books = await prisma.book.findMany({
      where: filter === 'all' ? undefined : whereClause,
    });

    // Handle no books found
    if (books.length === 0) {
      return NextResponse.json(
        { message: "No books found for the given query.", books: [] },
        { status: 404 }
      );
    }

    return NextResponse.json({ books });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { message: "Failed to fetch books. Please try again later.", books: [] },
      { status: 500 }
    );
  }
}





