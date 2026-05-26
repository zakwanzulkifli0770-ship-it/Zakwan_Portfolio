import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const experiencesTable = pgTable("experiences", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  organization: text("organization").notNull(),
  type: text("type").notNull(), // 'work' | 'education'
  description: text("description"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  current: boolean("current").notNull().default(false),
  location: text("location"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertExperienceSchema = createInsertSchema(experiencesTable).omit({ id: true, createdAt: true });
export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Experience = typeof experiencesTable.$inferSelect;
