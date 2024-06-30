import { varchar, timestamp, real } from "drizzle-orm/pg-core";
import { users } from "../../user/models/user"
import { userBalanceSchema } from "./schema";

export const userBalances = userBalanceSchema.table("userBalances", {
  id: varchar("id").primaryKey(),
  inEur: real("inEur").notNull(),
  inUSD: real("inUSD").notNull(),
  userId: varchar("userId").references(() => users.id).notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});

export type UserBalance = typeof userBalances.$inferSelect;
