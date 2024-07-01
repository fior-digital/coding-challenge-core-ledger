CREATE SCHEMA "currency";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "currency"."currencies" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar,
	"code" varchar NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "userBalance"."userBalances" ADD COLUMN "balance" real NOT NULL;--> statement-breakpoint
ALTER TABLE "userBalance"."userBalances" ADD COLUMN "currencyId" varchar NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "currency"."currencies" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "code_idx" ON "currency"."currencies" ("code");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userBalance"."userBalances" ADD CONSTRAINT "userBalances_currencyId_currencies_id_fk" FOREIGN KEY ("currencyId") REFERENCES "currency"."currencies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "userBalance"."userBalances" DROP COLUMN IF EXISTS "inEur";--> statement-breakpoint
ALTER TABLE "userBalance"."userBalances" DROP COLUMN IF EXISTS "inUSD";