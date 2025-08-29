import { Employee } from '@/lib/schema'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Calendar, DollarSign, User, Edit } from 'lucide-react'

interface EmployeeCardProps {
  employee: Employee
  onEdit: (employee: Employee) => void
}

export function EmployeeCard({ employee, onEdit }: EmployeeCardProps) {
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      engineering: 'bg-blue-100 text-blue-800',
      marketing: 'bg-green-100 text-green-800',
      sales: 'bg-yellow-100 text-yellow-800',
      hr: 'bg-purple-100 text-purple-800',
      finance: 'bg-red-100 text-red-800',
      operations: 'bg-orange-100 text-orange-800',
      legal: 'bg-gray-100 text-gray-800',
      design: 'bg-pink-100 text-pink-800',
      product: 'bg-indigo-100 text-indigo-800',
    }
    return colors[department] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {employee.firstName[0]}{employee.lastName[0]}
            </div>
            <div>
              <CardTitle className="text-xl">
                {employee.firstName} {employee.lastName}
              </CardTitle>
              <CardDescription className="text-sm font-medium text-gray-600">
                {employee.position}
              </CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(employee)}
            className="flex items-center gap-1"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>
        <Badge className={`w-fit mt-2 ${getDepartmentColor(employee.department)}`}>
          {employee.department.charAt(0).toUpperCase() + employee.department.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="h-4 w-4" />
            <span>{employee.email}</span>
          </div>

          {employee.phone && (
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="h-4 w-4" />
              <span>{employee.phone}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Hired {formatDate(employee.hireDate)}</span>
          </div>

          {employee.salary && (
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="h-4 w-4" />
              <span>{employee.salary}</span>
            </div>
          )}

          {employee.address && (
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{employee.address}</span>
            </div>
          )}

          {employee.emergencyContact && (
            <div className="flex items-center gap-2 text-gray-600">
              <User className="h-4 w-4" />
              <span>Emergency: {employee.emergencyContact}</span>
              {employee.emergencyPhone && (
                <span className="text-xs">({employee.emergencyPhone})</span>
              )}
            </div>
          )}
        </div>

        {employee.notes && (
          <div className="mt-3 p-2 bg-gray-50 rounded-md">
            <p className="text-xs text-gray-600 line-clamp-2">{employee.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
