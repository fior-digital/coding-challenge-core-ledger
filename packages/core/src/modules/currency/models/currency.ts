import { varchar, timestamp,index, uniqueIndex } from "drizzle-orm/pg-core";
import { currencySchema } from "./schema";

export const currencies = currencySchema.table("currencies", {
  id: varchar("id").primaryKey(),
  name: varchar("name").notNull(),
  description: varchar("name"),
  code: varchar("code").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  createdAt: timestamp("createdAt").notNull(),
}, (table) => {
  return {
    nameIdx: index("name_idx").on(table.name),
    emailIdx: uniqueIndex("code_idx").on(table.code),
  };
});

export type Currency = typeof currencies.$inferSelect;
