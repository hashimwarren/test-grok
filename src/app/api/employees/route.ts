import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { employees } from '@/lib/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const allEmployees = await db.select().from(employees).orderBy(desc(employees.createdAt))
    return NextResponse.json(allEmployees)
  } catch (error) {
    console.error('Error fetching employees:', error)
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received body:', body)

    // Ensure hireDate is properly formatted
    const employeeData = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone || null,
      position: body.position,
      department: body.department,
      hireDate: new Date(body.hireDate),
      salary: body.salary || null,
      address: body.address || null,
      emergencyContact: body.emergencyContact || null,
      emergencyPhone: body.emergencyPhone || null,
      notes: body.notes || null,
    }

    console.log('Processed employee data:', employeeData)

    const newEmployee = await db.insert(employees).values(employeeData).returning()
    return NextResponse.json(newEmployee[0], { status: 201 })
  } catch (error) {
    console.error('Error creating employee:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to create employee', details: errorMessage }, { status: 500 })
  }
}
