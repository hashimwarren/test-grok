require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

// Sample data to populate the employee directory for demo purposes
const sampleEmployees = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Software Engineer',
    department: 'engineering',
    hire_date: '2022-03-15',
    salary: '$95,000',
    address: '123 Main St, San Francisco, CA 94105',
    emergency_contact: 'Jane Doe',
    emergency_phone: '+1 (555) 987-6543',
    notes: 'Specializes in React and Node.js development'
  },
  {
    first_name: 'Sarah',
    last_name: 'Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 234-5678',
    position: 'Marketing Manager',
    department: 'marketing',
    hire_date: '2021-08-20',
    salary: '$75,000',
    address: '456 Oak Ave, San Francisco, CA 94102',
    emergency_contact: 'Mike Johnson',
    emergency_phone: '+1 (555) 876-5432',
    notes: 'Leads digital marketing campaigns and brand strategy'
  },
  {
    first_name: 'Michael',
    last_name: 'Chen',
    email: 'michael.chen@company.com',
    phone: '+1 (555) 345-6789',
    position: 'UX Designer',
    department: 'design',
    hire_date: '2023-01-10',
    salary: '$80,000',
    address: '789 Pine St, San Francisco, CA 94103',
    emergency_contact: 'Lisa Chen',
    emergency_phone: '+1 (555) 765-4321',
    notes: 'Expert in user research and interface design'
  },
  {
    first_name: 'Emily',
    last_name: 'Rodriguez',
    email: 'emily.rodriguez@company.com',
    phone: '+1 (555) 456-7890',
    position: 'HR Specialist',
    department: 'hr',
    hire_date: '2022-11-05',
    salary: '$65,000',
    address: '321 Cedar Ln, San Francisco, CA 94104',
    emergency_contact: 'Carlos Rodriguez',
    emergency_phone: '+1 (555) 654-3210',
    notes: 'Handles recruitment and employee relations'
  },
  {
    first_name: 'David',
    last_name: 'Wilson',
    email: 'david.wilson@company.com',
    phone: '+1 (555) 567-8901',
    position: 'Sales Director',
    department: 'sales',
    hire_date: '2020-06-12',
    salary: '$110,000',
    address: '654 Elm St, San Francisco, CA 94106',
    emergency_contact: 'Jennifer Wilson',
    emergency_phone: '+1 (555) 543-2109',
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

    console.log('Seeding database with sample employees...');

    // Insert sample employees using raw SQL
    for (const employee of sampleEmployees) {
      const result = await sql`
        INSERT INTO employees (
          first_name, last_name, email, phone, position, department,
          hire_date, salary, address, emergency_contact, emergency_phone, notes
        ) VALUES (
          ${employee.first_name}, ${employee.last_name}, ${employee.email},
          ${employee.phone}, ${employee.position}, ${employee.department},
          ${employee.hire_date}, ${employee.salary}, ${employee.address},
          ${employee.emergency_contact}, ${employee.emergency_phone}, ${employee.notes}
        )
      `;
      console.log(`Added employee: ${employee.first_name} ${employee.last_name}`);
    }

    console.log('Database seeding complete!');
    console.log(`Added ${sampleEmployees.length} sample employees.`);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
