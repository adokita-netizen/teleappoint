// Minimal placeholder schema for builds/running when generated schema is not present.
// This file should be replaced by the real generated drizzle schema.ts in CI/deploy.

import { pgTable, serial, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("open_id", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).default(""),
  email: varchar("email", { length: 255 }).nullable(),
  loginMethod: varchar("login_method", { length: 50 }).nullable(),
  role: varchar("role", { length: 50 }).notNull().default("agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastSignedIn: timestamp("last_signed_in").default(null),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).nullable(),
  company: varchar("company", { length: 255 }).nullable(),
  phone: varchar("phone", { length: 64 }).nullable(),
  email: varchar("email", { length: 255 }).nullable(),
  prefecture: varchar("prefecture", { length: 64 }).nullable(),
  industry: varchar("industry", { length: 255 }).nullable(),
  memo: text("memo").nullable(),
  status: varchar("status", { length: 50 }).notNull().default("unreached"),
  ownerId: integer("owner_id").nullable(),
  nextActionAt: timestamp("next_action_at").nullable(),
  listId: integer("list_id").nullable(),
  campaignId: integer("campaign_id").nullable(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const callLogs = pgTable("call_logs", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").notNull(),
  agentId: integer("agent_id").notNull(),
  result: varchar("result", { length: 50 }).notNull(),
  memo: text("memo").nullable(),
  nextActionAt: timestamp("next_action_at").nullable(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").notNull(),
  ownerUserId: integer("owner_user_id").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("scheduled"),
  startAt: timestamp("start_at").nullable(),
  endAt: timestamp("end_at").nullable(),
  title: varchar("title", { length: 255 }).nullable(),
  description: text("description").nullable(),
  googleCalendarId: varchar("google_calendar_id", { length: 255 }).nullable(),
  googleEventId: varchar("google_event_id", { length: 255 }).nullable(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const lists = pgTable("lists", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").default(null),
  totalCount: integer("total_count").default(0),
  createdBy: integer("created_by").default(null),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").nullable(),
  createdBy: integer("created_by").nullable(),
  description: text("description").nullable(),
  createdBy: integer("created_by").nullable(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const assignments = pgTable("assignments", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").notNull(),
  agentId: integer("agent_id").notNull(),
  assignedBy: integer("assigned_by").nullable(),
  assignedAt: timestamp("assigned_at").defaultNow().notNull(),
});

export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  action: varchar("action", { length: 255 }).notNull(),
  leadId: integer("lead_id").nullable(),
  details: text("details").nullable(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const operatorMetrics = pgTable("operator_metrics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  date: varchar("date", { length: 20 }).notNull(),
  totalCalls: integer("total_calls").default(0),
  connectedCalls: integer("connected_calls").default(0),
  appointmentsMade: integer("appointments_made").default(0),
  averageCallDuration: integer("average_call_duration").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = InferModel<typeof users>;
export type InsertUser = InferModel<typeof users, "insert">;
export type InsertLead = InferModel<typeof leads, "insert">;
export type InsertList = InferModel<typeof lists, "insert">;
export type InsertAppointment = InferModel<typeof appointments, "insert">;
export type InsertAssignment = InferModel<typeof assignments, "insert">;
export type InsertCallLog = InferModel<typeof callLogs, "insert">;
export type InsertCampaign = InferModel<typeof campaigns, "insert">;

export default {} as const;


