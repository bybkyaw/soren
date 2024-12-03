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
      if (filter === 'stock' || filter === 'price') {
        // Ensure the value is parsed correctly for numeric fields
        const numericValue = parseFloat(value as string);
        if (isNaN(numericValue)) {
          return NextResponse.json(
            { message: "Invalid value for numeric field.", books: [] },
            { status: 400 }
          );
        }

        // Handle stock or price filtering with operators
        const field = filter; // Can be 'stock' or 'price'
        whereClause =
          operator === 'less'
            ? { [field]: { lt: numericValue } }
            : operator === 'greater'
            ? { [field]: { gt: numericValue } }
            : operator === 'equal'
            ? { [field]: { equals: numericValue } }
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




// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// interface RequestBody {
//   filter: 'all' | 'author' | 'title' | 'genre' | 'price' | 'stock';
//   value?: string | number;
//   operator?: 'less' | 'greater' | 'equal'; 
// }

// export async function POST(req: Request) {
//   try {
//     const { filter, value, operator }: RequestBody = await req.json();

// // Validate input
//     if (!filter) {
//       return NextResponse.json(
//         { message: "Filter is required.", books: [] },
//         { status: 400 }
//       );
//     }

//     let whereClause = {};

//     if (filter !== 'all') {
//       if (filter === 'stock' || filter  === 'price') {
        
//         const field = filter;
// // Handle stock filtering
//         whereClause =
//           operator === 'less'
//             ? { [field]: { lt: value as number } }: operator === 'greater'
//             ? { [field]: { gt: value as number } }: operator === 'equal'
//             ? { [field]: { equals: value as number } }: {};
//       } else {
//         // Handle other filters (author, title, genre)
//         whereClause = { [filter]: value };
//       }
//     }

//     // Fetch books from database
//     const books = await prisma.book.findMany({
//       where: filter === 'all' ? undefined : whereClause,
//     });

//     // Handle no books found
//     if (books.length === 0) {
//       return NextResponse.json(
//         { message: "No books found for the given query.", books: [] },
//         { status: 404 }
//       );
//     }


//     return NextResponse.json({ books });
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch books. Please try again later.", books: [] },
//       { status: 500 }
//     );
//   }
// }



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

