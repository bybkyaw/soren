import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RequestBody {
  filter: 'all' | 'author' | 'title' | 'genre' | 'price' | 'stock';
  value?: string | number;
  operator?: 'less' | 'greater' | 'equal'; // Added 'equal' operator
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
        whereClause =
          operator === 'less'
            ? { stock: { lt: value as number } }
            : operator === 'greater'
            ? { stock: { gt: value as number } }
            : operator === 'equal'
            ? { stock: { equals: value as number } }
            : {};
      } else if (filter === 'price') {
        // Handle price filtering
        whereClause = { price: parseFloat(value as string) };
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



// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// interface RequestBody {
//   filter: 'all' | 'author' | 'title' | 'genre' | 'price' | 'stock';
//   value?: string | number;
//   operator?: 'less' | 'greater';
// }

// export async function POST(req: Request) {
//   try {
//     const { filter, value, operator }: RequestBody = await req.json();

//     let whereClause = {};
//     if (filter !== 'all') {
//       if (filter === 'stock') {
//         whereClause = operator === 'less'
//           ? { stock: { lt: value as number } }
//           : { stock: { gt: value as number } };
//       } else if (filter === 'price') {
//         whereClause = { price: parseFloat(value as string) };
//       } else {
//         whereClause = { [filter]: value };
//       }
//     }

//     const books = await prisma.book.findMany({
//       where: filter === 'all' ? undefined : whereClause,
//     });

//     return NextResponse.json({ books });
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch books.", books: [] },
//       { status: 500 }
//     );
//   }
// }



// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   try {
//     const { filter, value } = await req.json();

//     let whereClause = {};
//     if (filter !== 'all') {
//       whereClause = { [filter]: filter === 'price' || filter === 'stock' ? parseFloat(value) : value };
//     }

//     const books = await prisma.book.findMany({ where: filter === 'all' ? undefined : whereClause });

//     return NextResponse.json({ books });
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch books.", books: [] },
//       { status: 500 }
//     );
//   }
// }

