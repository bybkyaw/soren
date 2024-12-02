import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { criteria, value, multiple } = await req.json();

    if (!criteria) {
      return NextResponse.json(
        { success: false, message: "Criteria is required." },
        { status: 400 }
      );
    }

    // Handle "all" to fetch all books
    if (criteria === "all") {
      const books = await prisma.book.findMany();
      return NextResponse.json({ success: true, books });
    }

    // Ensure value is provided for other criteria
    if (!value) {
      return NextResponse.json(
        { success: false, message: "Value is required for this search." },
        { status: 400 }
      );
    }

    let whereClause = {};
    switch (criteria) {
      case "title":
        whereClause = { title: { contains: value, mode: "insensitive" } };
        break;
      case "author":
        whereClause = { author: { contains: value, mode: "insensitive" } };
        break;
      case "isbn":
        whereClause = { isbn: value };
        break;
      case "genre":
        whereClause = { genre: { contains: value, mode: "insensitive" } };
        break;
      case "book_id":
        whereClause = { book_id: parseInt(value, 10) };
        break;
      default:
        return NextResponse.json(
          { success: false, message: "Invalid criteria." },
          { status: 400 }
        );
    }

    if (multiple) {
      // Fetch multiple books
      const books = await prisma.book.findMany({ where: whereClause });
      if (books.length === 0) {
        return NextResponse.json(
          { success: false, message: "No books found." },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, books });
    } else {
      // Fetch a single book
      const book = await prisma.book.findFirst({ where: whereClause });
      if (!book) {
        return NextResponse.json(
          { success: false, message: "Book not found." },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, book });
    }
  } catch (error) {
    console.error("Error finding book:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}



// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   try {
//     const { criteria, value } = await req.json();

//     if (!criteria || !value) {
//       return NextResponse.json(
//         { success: false, message: "Criteria and value are required." },
//         { status: 400 }
//       );
//     }

//     let whereClause = {};
//     switch (criteria) {
//       case "title":
//         whereClause = { title: value };
//         break;
//       case "author":
//         whereClause = { author: value };
//         break;
//       case "isbn":
//         whereClause = { isbn: value };
//         break;
//       case "book_id":
//         whereClause = { book_id: parseInt(value, 10) };
//         break;
//       default:
//         return NextResponse.json(
//           { success: false, message: "Invalid criteria." },
//           { status: 400 }
//         );
//     }

//     const book = await prisma.book.findFirst({ where: whereClause });

//     if (!book) {
//       return NextResponse.json(
//         { success: false, message: "Book not found." },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, book });
//   } catch (error) {
//     console.error("Error finding book:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error." },
//       { status: 500 }
//     );
//   }
// }



// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   try {
//     const { criteria, value } = await req.json();

//     // Validate input
//     if (!criteria || !value) {
//       console.log('Invalid input: Missing criteria or value');
//       return NextResponse.json(
//         { success: false, message: "Criteria and value are required." },
//         { status: 400 }
//       );
//     }

//     // Determine the where clause based on the criteria
//     let whereClause = {};
//     switch (criteria) {
//       case "title":
//         whereClause = { title: value };
//         break;
//       case "author":
//         whereClause = { author: value };
//         break;
//       case "isbn":
//         whereClause = { isbn: value };
//         break;
//       case "book_id":
//         whereClause = { book_id: parseInt(value, 10) }; // Ensure book_id is an integer
//         break;
//       default:
//         console.log('Invalid criteria provided');
//         return NextResponse.json(
//           { success: false, message: "Invalid criteria." },
//           { status: 400 }
//         );
//     }

//     // Find the book
//     const book = await prisma.book.findFirst({ where: whereClause });

//     // Handle book not found
//     if (!book) {
//       console.log('Book not found for criteria:', criteria, 'with value:', value);
//       return NextResponse.json(
//         { success: false, message: "Book not found." },
//         { status: 404 }
//       );
//     }

//     // Return success response with book details
//     console.log('Book found:', book);
//     return NextResponse.json({ success: true, book });
//   } catch (error) {
//     console.error("Error finding book:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error." },
//       { status: 500 }
//     );
//   }
// }




// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   try {
//     console.log('API /api/findBook called');
//     const { criteria, value } = await req.json();

//     if (!criteria || !value) {
//       console.log('Invalid input: Missing criteria or value');
//       return NextResponse.json(
//         { success: false, message: "Criteria and value are required." },
//         { status: 400 }
//       );
//     }

//     let whereClause = {};
//     if (criteria === "title") {
//       whereClause = { title: value };
//     } else if (criteria === "author") {
//       whereClause = { author: value };
//     } else if (criteria === "isbn") {
//       whereClause = { isbn: value };
//     } else if (criteria === "id") {
//       whereClause = { id: parseInt(value, 10) };
//     } else {
//       console.log('Invalid criteria provided');
//       return NextResponse.json(
//         { success: false, message: "Invalid criteria." },
//         { status: 400 }
//       );
//     }

//     const book = await prisma.book.findFirst({ where: whereClause });

//     if (book) {
//       console.log('Book found:', book);
//       return NextResponse.json({ success: true, book });
//     } else {
//       console.log('Book not found');
//       return NextResponse.json(
//         { success: false, message: "Book not found." },
//         { status: 404 }
//       );
//     }
//   } catch (error) {
//     console.error("Error finding book:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error." },
//       { status: 500 }
//     );
//   }
// }
