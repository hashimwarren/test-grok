# Employee Directory

A comprehensive HR employee management system built with Next.js, Tailwind CSS, shadcn/ui, and Neon database.

## Features

- **Employee Management**: Add, edit, and view employee profiles
- **Department Organization**: Filter employees by department
- **Search Functionality**: Search employees by name, email, or position
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean and professional interface using shadcn/ui components

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Neon (PostgreSQL)
- **ORM**: Drizzle ORM
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Neon database account and project

### Setup Instructions

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your Neon database:**
   - Go to [Neon Console](https://console.neon.tech/)
   - Create a new project or use an existing one
   - Copy your database connection string

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your Neon database URL:
   ```
   DATABASE_URL="your-neon-database-connection-string"
   ```

4. **Generate and run database migrations:**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The application includes a single `employees` table with the following fields:

- **Basic Information**: First name, last name, email, phone
- **Employment Details**: Position, department, hire date, salary
- **Contact Information**: Address, emergency contact details
- **Additional**: Notes field for extra information
- **Metadata**: Created and updated timestamps

### Supported Departments

- Engineering
- Marketing
- Sales
- HR
- Finance
- Operations
- Legal
- Design
- Product

## Usage

### Adding an Employee

1. Click the "Add Employee" button in the top-right corner
2. Fill in the required fields (marked with *)
3. Add optional information as needed
4. Click "Add Employee" to save

### Searching and Filtering

- Use the search bar to find employees by name, email, or position
- Use the department filter to view employees from specific departments
- Combine search and filter for more precise results

### Editing Employee Information

1. Click the "Edit" button on any employee card
2. Update the information in the form
3. Click "Update Employee" to save changes

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## Project Structure

```
src/
├── app/
│   ├── api/employees/          # Employee API routes
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── employee-card.tsx       # Employee card component
│   └── employee-form.tsx       # Employee form component
└── lib/
    ├── db.ts                   # Database connection
    ├── schema.ts               # Database schema
    └── utils.ts                # Utility functions
```

## API Endpoints

- `GET /api/employees` - Fetch all employees
- `POST /api/employees` - Create new employee
- `GET /api/employees/[id]` - Fetch specific employee
- `PUT /api/employees/[id]` - Update employee
- `DELETE /api/employees/[id]` - Delete employee

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
