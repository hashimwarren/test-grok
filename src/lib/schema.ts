import { pgTable, serial, varchar, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const departmentEnum = pgEnum('department', [
  'engineering',
  'marketing',
  'sales',
  'hr',
  'finance',
  'operations',
  'legal',
  'design',
  'product'
]);

export const employees = pgTable('employees', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  position: varchar('position', { length: 150 }).notNull(),
  department: departmentEnum('department').notNull(),
  hireDate: timestamp('hire_date').notNull(),
  salary: varchar('salary', { length: 20 }),
  address: text('address'),
  emergencyContact: varchar('emergency_contact', { length: 255 }),
  emergencyPhone: varchar('emergency_phone', { length: 20 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Employee = typeof employees.$inferSelect;
export type NewEmployee = typeof employees.$inferInsert;
