import { prisma } from '@/lib/prisma';
import { User } from '@/lib/types/exports';
import UserRepository from '@/repositories/prisma/user/UserRepository';
import { NextResponse } from 'next/server';

const userRepository =  new UserRepository();

export async function GET() {
  try {
    const users = await userRepository.getAll();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users', details: error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  const userData: User = {...body} as User;
  userData.avatar_url = body.picture || body.avatar_url || `https://www.gravatar.com/avatar${userData.name.split(' ')[0]}.png`; // Default avatar URL if not provided
  try {
    const newUser = await userRepository.createUser(userData);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user', details: error }, { status: 500 });
  }
}
