import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  const where = q
    ? {
        OR: [
          { firstName: { contains: q, mode: "insensitive" as const } },
          { lastName: { contains: q, mode: "insensitive" as const } },
          { email: { contains: q, mode: "insensitive" as const } },
          { title: { contains: q, mode: "insensitive" as const } },
          { department: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : undefined;
  const employees = await prisma.employee.findMany({
    where,
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
  });
  return NextResponse.json(employees);
}

export async function POST(req: NextRequest) {
  // Require a signed-in user via Stack Auth
  const user = await stackServerApp.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const {
    firstName,
    lastName,
    email,
    title,
    department,
    phone,
    location,
    imageUrl,
  } = body ?? {};

  if (!firstName || !lastName || !email || !title || !department) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const employee = await prisma.employee.create({
      data: { firstName, lastName, email, title, department, phone, location, imageUrl },
    });
    return NextResponse.json(employee, { status: 201 });
  } catch (e: unknown) {
    const err = e as { code?: string } | null;
    if (err?.code === "P2002") {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 });
  }
}
