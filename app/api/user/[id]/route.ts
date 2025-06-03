import { prisma } from '@/lib/prisma';
import { User } from '@/lib/types/exports';
import UserRepository from '@/repositories/prisma/user/UserRepository';
import { NextResponse } from 'next/server';

interface Params {
  params: { id: string };
}

const userRepository = new UserRepository();  

// GET single user
export async function GET(_: Request, { params }: Params) {
  try {
    const user = userRepository.getById(params.id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch user', details: err }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const data = await request.json();

  try {
    const updated = await userRepository.updateUser(params.id, data as Partial<User>);
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: 'Update failed', details: err }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(_: Request, { params }: Params) {
  try {
    const deletedUser = await userRepository.deleteUser(params.id);
    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Delete failed', details: err }, { status: 500 });
  }
}
