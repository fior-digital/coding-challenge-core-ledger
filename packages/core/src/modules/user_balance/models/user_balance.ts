import { varchar, timestamp, real } from "drizzle-orm/pg-core";
import { users } from "../../user/models/user"
import { userBalanceSchema } from "./schema";
import { currencies } from "../../currency/models/currency";

export const userBalances = userBalanceSchema.table("userBalances", {
  id: varchar("id").primaryKey(),
  balance: real("balance").notNull(),
  currencyId: varchar("currencyId").references(() => currencies.id).notNull(),
  userId: varchar("userId").references(() => users.id).notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});

export type UserBalance = typeof userBalances.$inferSelect;
