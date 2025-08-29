'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EmployeeForm } from '@/components/employee-form'
import { EmployeeCard } from '@/components/employee-card'
import { Employee, NewEmployee } from '@/lib/schema'
import { Plus, Search, Users, Filter } from 'lucide-react'

export default function HomePage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  const departments = [
    'engineering',
    'marketing',
    'sales',
    'hr',
    'finance',
    'operations',
    'legal',
    'design',
    'product'
  ]

  // Fetch employees
  useEffect(() => {
    fetchEmployees()
  }, [])

  // Filter employees based on search and department
  useEffect(() => {
    let filtered = employees

    if (searchTerm) {
      filtered = filtered.filter(
        (emp) =>
          emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.position.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (departmentFilter && departmentFilter !== 'all') {
      filtered = filtered.filter((emp) => emp.department === departmentFilter)
    }

    setFilteredEmployees(filtered)
  }, [employees, searchTerm, departmentFilter])

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employees')
      if (response.ok) {
        const data = await response.json()
        setEmployees(data)
      }
    } catch (error) {
      console.error('Error fetching employees:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddEmployee = async (employeeData: Omit<NewEmployee, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      })

      if (response.ok) {
        await fetchEmployees() // Refresh the list
      } else {
        alert('Failed to add employee')
      }
    } catch (error) {
      console.error('Error adding employee:', error)
      alert('Error adding employee')
    }
  }

  const handleEditEmployee = async (employeeData: Omit<NewEmployee, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingEmployee) return

    try {
      const response = await fetch(`/api/employees/${editingEmployee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      })

      if (response.ok) {
        await fetchEmployees() // Refresh the list
        setEditingEmployee(null)
      } else {
        alert('Failed to update employee')
      }
    } catch (error) {
      console.error('Error updating employee:', error)
      alert('Error updating employee')
    }
  }

  const openEditForm = (employee: Employee) => {
    setEditingEmployee(employee)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingEmployee(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employees...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Users className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employee Directory</h1>
            <p className="text-gray-600">Manage your team members</p>
          </div>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Employee
        </Button>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search employees by name, email, or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="sm:w-48">
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="All Departments" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept.charAt(0).toUpperCase() + dept.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Employee Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredEmployees.length} of {employees.length} employees
      </div>

      {/* Employee Grid */}
      {filteredEmployees.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            {employees.length === 0 ? 'No employees found' : 'No matching employees'}
          </h3>
          <p className="text-gray-500 mb-4">
            {employees.length === 0
              ? 'Get started by adding your first employee.'
              : 'Try adjusting your search criteria.'}
          </p>
          {employees.length === 0 && (
            <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add First Employee
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onEdit={openEditForm}
            />
          ))}
        </div>
      )}

      {/* Employee Form Modal */}
      <EmployeeForm
        isOpen={isFormOpen}
        onOpenChange={handleFormClose}
        onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee}
        initialData={editingEmployee || undefined}
      />
    </div>
  )
}
