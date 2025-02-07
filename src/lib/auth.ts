// src/lib/auth.ts
import { NextRequest } from "next/server";

export interface AuthUser {
  id: string;
  // Add other fields as needed
}

export async function getUserFromRequest(req: NextRequest): Promise<AuthUser | null> {
  const userId = req.headers.get("x-user-id");
  if (userId) {
    return { id: userId };
  }
  return null;
}
