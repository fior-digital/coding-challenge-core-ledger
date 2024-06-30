import { serial, varchar, bigint, timestamp } from "drizzle-orm/pg-core";
import { userSchema } from "./schema";

export const companyAccounts = userSchema.table("companyaccount", {
  companyAccountId: serial("companyAccountId").primaryKey(),
  currencyCode: varchar("currencyCode").notNull(),
  fiatBalance: bigint("fiatBalance", { mode: "number" }).notNull().default(0),
  bitcoinBalance: bigint("bitcoinBalance", { mode: "number" })
    .notNull()
    .default(0),
  lastUpdated: timestamp("lastUpdated").notNull(),
});

export type CompanyAccount = typeof companyAccounts.$inferSelect;
