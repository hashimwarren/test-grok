import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  title: text("title"),
  department: text("department"),
  status: text("status"),
  role: text("role"),
  avatar_url: text("avatar_url"),
});
