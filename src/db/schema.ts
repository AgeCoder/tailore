import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, varchar, date, jsonb } from "drizzle-orm/pg-core";

export const User = pgTable("User", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email").notNull().unique(),
  password: varchar("password"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const Client = pgTable("Client", {
  id: serial("id"),
  name: text("name").notNull(),
  phone: varchar("phone", { length: 15 }).notNull().primaryKey(),
  address: text("address").notNull(),
  dateOfBirth: text("dateOfBirth"),
  top: varchar("top", { length: 50 }),
  length: varchar("length", { length: 50 }),
  chest: varchar("chest", { length: 50 }),
  waist: varchar("waist", { length: 50 }),
  seat: varchar("seat", { length: 50 }),
  shoulder: varchar("shoulder", { length: 50 }),
  sleeve: varchar("sleeve", { length: 50 }),
  churidar: varchar("churidar", { length: 50 }),
  patiala: varchar("patiala", { length: 50 }),
  stand: varchar("stand", { length: 50 }),
  back: varchar("back", { length: 50 }),
  front: varchar("front", { length: 50 }),
  flare: varchar("flare", { length: 50 }),
  vCut: varchar("vCut", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const clientsRelations = relations(Client, ({ many }) => ({
  orders: many(orders),
}));

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  totalAmount: varchar('total_amount'),
  advanceAmount: varchar('advance_amount'),
  status: varchar('status'),
  bill: jsonb('bill'),
  paymentMethod: varchar('payment_method'),
  paymentStatus: varchar('payment_status').default('Unpaid'),
  orderDate: date('order_date').defaultNow(),
  deliveryDate: date('delivery_date'),
  clientName: varchar('client_name').notNull().references(() => Client.name),
  clientPhone: varchar('client_phone', { length: 15 }).notNull().references(() => Client.phone),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const ordersRelations = relations(orders, ({ one }) => ({
  client: one(Client, {
    fields: [orders.clientPhone],
    references: [Client.phone],
  }),
}));

