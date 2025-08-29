import { db } from "@/db";
import { employees } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const allEmployees = await db.query.employees.findMany();
  return NextResponse.json(allEmployees);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newEmployee = await db.insert(employees).values(body).returning();
  return NextResponse.json(newEmployee[0]);
}