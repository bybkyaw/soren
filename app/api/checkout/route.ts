import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received payload:', body); // Debug log

    const { address, phone_number, total, orderItems } = body;

    // Validate input
    if (!address || !phone_number || !total || !Array.isArray(orderItems)) {
      console.error('Validation failed: Missing or invalid input data.');
      return NextResponse.json(
        { success: false, error: 'Invalid input. Please check all fields.' },
        { status: 400 }
      );
    }

    // Validate each order item
    if (!orderItems.every(item => item.book_id && item.quantity)) {
      console.error('Invalid order items:', orderItems);
      return NextResponse.json(
        { success: false, error: 'Invalid order items.' },
        { status: 400 }
      );
    }

    // Replace with actual authenticated user ID from session/cookies
    const user_id = 1; // Placeholder for authenticated user

    // Enrich order items with price from the database
    const enrichedOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const book = await prisma.book.findUnique({
          where: { book_id: item.book_id },
          select: { price: true },
        });

        if (!book) {
          throw new Error(`Book with ID ${item.book_id} not found.`);
        }

        return {
          book_id: item.book_id,
          quantity: item.quantity,
          price: book.price,
        };
      })
    );

    // Create the order
    const order = await prisma.order.create({
      data: {
        user_id,
        address,
        phone_number,
        total: parseFloat(total),
        status: 'PENDING',
        orderItems: {
          create: enrichedOrderItems,
        },
      },
    });

    console.log('Order created successfully:', order); // Debug log
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error in checkout route:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process the checkout.' },
      { status: 500 }
    );
  }
}


