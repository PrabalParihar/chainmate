// src/app/api/createUser/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { did, email } = body;

    if (!did) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Use upsert instead of create
    const user = await prisma.user.upsert({
      where: { 
        id: did 
      },
      update: { 
        email: email || null
      },
      create: {
        id: did,
        email: email || null
      }
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create user';
    console.error('Failed to create user:', { error: errorMessage });
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}