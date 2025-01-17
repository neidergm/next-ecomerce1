import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'

export async function GET(request: Request) {

  await prisma.todo.deleteMany(); // delete * from todo
  await prisma.user.deleteMany(); // delete * from user


  await prisma.user.create({
    data: {
      email: 'test1@test.com',
      name: 'Test 1',
      password:  await bcrypt.hashSync('123456'),
      roles: ['ADMIN'],
      todos: {
        create: [
          { description: 'Piedra del alma', complete: true },
          { description: 'Piedra del poder' },
          { description: 'Piedra del tiempo' },
          { description: 'Piedra del espacio' },
          { description: 'Piedra del realidad' }
        ]
      }
    }
  });

  return NextResponse.json({ message: 'Seed Executed' });
}