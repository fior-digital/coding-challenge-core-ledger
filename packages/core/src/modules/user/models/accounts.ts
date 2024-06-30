import { serial, varchar, bigint, timestamp } from "drizzle-orm/pg-core";
import { userSchema } from "./schema";
import { users } from "./user"; // Ensure correct import

export const accounts = userSchema.table("accounts", {
  accountId: serial("accountId").primaryKey(),
  userId: varchar("userId")
    .notNull()
    .references(() => users.id),
  currencyCode: varchar("currencyCode").notNull(),
  fiatBalance: bigint("fiatBalance", { mode: "number" }).notNull().default(0),
  bitcoinBalance: bigint("bitcoinBalance", { mode: "number" })
    .notNull()
    .default(0),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});
