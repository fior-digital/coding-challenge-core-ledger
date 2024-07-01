import { varchar, timestamp, real } from "drizzle-orm/pg-core";
import { users } from "../../user/models/user"
import { withdrawSchema } from "./schema";
import { currencies } from "../../currency/models";

export const withdraws = withdrawSchema.table("withdraws", {
  id: varchar("id").primaryKey(),
  originalAmount: real("originalAmount").notNull(),
  flatFee: real("flatFee").default(1.00).notNull(),
  totalAmount: real("totalAmount").notNull(),
  userId: varchar("userId").references(() => users.id).notNull(),
  currencyId: varchar("currencyId").references(() => currencies.id).notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});

export type Withdraw = typeof withdraws.$inferSelect;
