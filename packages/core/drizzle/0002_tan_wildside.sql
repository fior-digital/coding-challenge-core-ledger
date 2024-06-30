CREATE SCHEMA "withdraw";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "withdraw"."withdraws" (
	"id" varchar PRIMARY KEY NOT NULL,
	"originalAmount" real NOT NULL,
	"flatFee" real DEFAULT 1 NOT NULL,
	"totalAmount" real NOT NULL,
	"userId" varchar NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "withdraw"."withdraws" ADD CONSTRAINT "withdraws_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "user"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
