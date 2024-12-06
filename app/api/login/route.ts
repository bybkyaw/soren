import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        user_id: true,
        username: true,
        email: true,
        user_type: true,
        password: true,
      },
    });

    console.log("User found: ", user);

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials: User not found' }, { status: 401 });
    }

    // Check if the user is an admin and hard-code admin password check
    if (user.user_type === 'ADMIN') {
      const hardCodedAdminPassword = '123456789';  // Replace this with your actual hard-coded admin password

      // Hash the admin password and log it to the console
      const hashedAdminPassword = await bcrypt.hash(hardCodedAdminPassword, 10);
      console.log("Hashed Admin Password: ", hashedAdminPassword);

      // Compare the provided password to the hardcoded admin password
      if (password !== hardCodedAdminPassword) {
        return NextResponse.json({ message: 'Invalid credentials: Incorrect password' }, { status: 401 });
      }
    } else {
      // For non-admin users, compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({ message: 'Invalid credentials: Incorrect password' }, { status: 401 });
      }
    }

    const userWithoutPassword = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      user_type: user.user_type,
    };

    const response = NextResponse.json({ message: 'Login successful', user: userWithoutPassword });
    response.cookies.set('user_info', JSON.stringify(userWithoutPassword), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    console.log('User logged in successfully, cookie set:', response.cookies.get('user_info')?.value);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'An error occurred while logging in', details: errorMessage }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}



