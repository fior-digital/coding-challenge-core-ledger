import { serial, bigint, timestamp } from "drizzle-orm/pg-core";
import { userSchema } from "./schema";
import { transactions } from "./transactions"; // Import necessary models
import { accounts } from "./accounts";

export const ledgerEntries = userSchema.table("ledgerentries", {
  entryId: serial("entryId").primaryKey(),
  transactionId: bigint("transactionId", { mode: "number" })
    .notNull()
    .references(() => transactions.transactionId),
  accountId: bigint("accountId", { mode: "number" })
    .notNull()
    .references(() => accounts.accountId),
  debit: bigint("debit", { mode: "number" }).default(0),
  credit: bigint("credit", { mode: "number" }).default(0),
  balance: bigint("balance", { mode: "number" }).notNull(),
  entryDate: timestamp("entryDate").notNull(),
});
