CREATE SCHEMA "userBalance";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userBalance"."userBalances" (
	"id" varchar PRIMARY KEY NOT NULL,
	"inEur" real NOT NULL,
	"inUSD" real NOT NULL,
	"userId" varchar NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userBalance"."userBalances" ADD CONSTRAINT "userBalances_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "user"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
