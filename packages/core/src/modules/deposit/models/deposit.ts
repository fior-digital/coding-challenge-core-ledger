import { varchar, timestamp, real } from "drizzle-orm/pg-core";
import { users } from "../../user/models/user"
import { depositSchema } from "./schema";

export const deposits = depositSchema.table("deposits", {
  id: varchar("id").primaryKey(),
  originalAmount: real("originalAmount").notNull(),
  flatFee: real("flatFee").default(1.00).notNull(),
  totalAmount: real("totalAmount").notNull(),
  userId: varchar("userId").references(() => users.id).notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});

export type Deposit = typeof deposits.$inferSelect;
