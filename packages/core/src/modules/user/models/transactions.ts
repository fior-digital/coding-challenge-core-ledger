import { serial, varchar, bigint, timestamp } from "drizzle-orm/pg-core";
import { userSchema } from "./schema";
import { accounts } from "./accounts"; // Ensure to import accounts

export const transactions = userSchema.table("transactions", {
  transactionId: serial("transactionId").primaryKey(),
  accountId: varchar("accountId")
    .notNull()
    .references(() => accounts.accountId),
  type: varchar("type").notNull(),
  currencyCode: varchar("currencyCode").notNull(),
  amount: bigint("amount", { mode: "number" }).notNull(),
  fee: bigint("fee", { mode: "number" }).default(0),
  description: varchar("description"),
  transactionDate: timestamp("transactionDate").notNull(),
});
