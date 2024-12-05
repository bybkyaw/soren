import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  console.log('Checkout API route hit'); // Debug log
  try {
    const { address, phone_number, total, orderItems } = await req.json();

    const user_id = 1; // Replace with authenticated user ID

    const order = await prisma.order.create({
      data: {
        user_id,
        address,
        phone_number,
        total: parseFloat(total),
        status: 'PENDING',
        orderItems: {
          create: orderItems.map((item: { book_id: string; quantity: number }) => ({
            book_id: parseInt(item.book_id, 10),
            quantity: item.quantity,
          })),
        },
      },
    });

    console.log('Order created:', order); // Debug log

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error in checkout route:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process the checkout.' },
      { status: 500 }
    );
  }
}
