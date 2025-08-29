import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { employees } from '../src/lib/schema.js';

// Sample data to populate the employee directory for demo purposes
const sampleEmployees = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Software Engineer',
    department: 'engineering',
    hireDate: new Date('2022-03-15'),
    salary: '$95,000',
    address: '123 Main St, San Francisco, CA 94105',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+1 (555) 987-6543',
    notes: 'Specializes in React and Node.js development'
  },
  {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 234-5678',
    position: 'Marketing Manager',
    department: 'marketing',
    hireDate: new Date('2021-08-20'),
    salary: '$75,000',
    address: '456 Oak Ave, San Francisco, CA 94102',
    emergencyContact: 'Mike Johnson',
    emergencyPhone: '+1 (555) 876-5432',
    notes: 'Leads digital marketing campaigns and brand strategy'
  },
  {
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@company.com',
    phone: '+1 (555) 345-6789',
    position: 'UX Designer',
    department: 'design',
    hireDate: new Date('2023-01-10'),
    salary: '$80,000',
    address: '789 Pine St, San Francisco, CA 94103',
    emergencyContact: 'Lisa Chen',
    emergencyPhone: '+1 (555) 765-4321',
    notes: 'Expert in user research and interface design'
  },
  {
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@company.com',
    phone: '+1 (555) 456-7890',
    position: 'HR Specialist',
    department: 'hr',
    hireDate: new Date('2022-11-05'),
    salary: '$65,000',
    address: '321 Cedar Ln, San Francisco, CA 94104',
    emergencyContact: 'Carlos Rodriguez',
    emergencyPhone: '+1 (555) 654-3210',
    notes: 'Handles recruitment and employee relations'
  },
  {
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@company.com',
    phone: '+1 (555) 567-8901',
    position: 'Sales Director',
    department: 'sales',
    hireDate: new Date('2020-06-12'),
    salary: '$110,000',
    address: '654 Elm St, San Francisco, CA 94106',
    emergencyContact: 'Jennifer Wilson',
    emergencyPhone: '+1 (555) 543-2109',
    notes: 'Manages enterprise sales and client relationships'
  }
];

async function seedDatabase() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  try {
    const sql = neon(databaseUrl);
    const db = drizzle(sql);

    console.log('Seeding database with sample employees...');

    // Insert sample employees
    for (const employee of sampleEmployees) {
      await db.insert(employees).values(employee);
      console.log(`Added employee: ${employee.firstName} ${employee.lastName}`);
    }

    console.log('Database seeding complete!');
    console.log(`Added ${sampleEmployees.length} sample employees.`);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
