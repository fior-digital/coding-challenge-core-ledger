CREATE TABLE IF NOT EXISTS "user"."accounts" (
	"accountId" serial PRIMARY KEY NOT NULL,
	"userId" varchar NOT NULL,
	"currencyCode" varchar NOT NULL,
	"fiatBalance" bigint DEFAULT 0 NOT NULL,
	"bitcoinBalance" bigint DEFAULT 0 NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user"."transactions" (
	"transactionId" serial PRIMARY KEY NOT NULL,
	"accountId" varchar NOT NULL,
	"type" varchar NOT NULL,
	"currencyCode" varchar NOT NULL,
	"amount" bigint NOT NULL,
	"fee" bigint DEFAULT 0,
	"description" varchar,
	"transactionDate" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user"."ledgerentries" (
	"entryId" serial PRIMARY KEY NOT NULL,
	"transactionId" bigint NOT NULL,
	"accountId" bigint NOT NULL,
	"debit" bigint DEFAULT 0,
	"credit" bigint DEFAULT 0,
	"balance" bigint NOT NULL,
	"entryDate" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user"."companyaccount" (
	"companyAccountId" serial PRIMARY KEY NOT NULL,
	"currencyCode" varchar NOT NULL,
	"fiatBalance" bigint DEFAULT 0 NOT NULL,
	"bitcoinBalance" bigint DEFAULT 0 NOT NULL,
	"lastUpdated" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user"."accounts" ADD CONSTRAINT "accounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "user"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user"."transactions" ADD CONSTRAINT "transactions_accountId_accounts_accountId_fk" FOREIGN KEY ("accountId") REFERENCES "user"."accounts"("accountId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user"."ledgerentries" ADD CONSTRAINT "ledgerentries_transactionId_transactions_transactionId_fk" FOREIGN KEY ("transactionId") REFERENCES "user"."transactions"("transactionId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user"."ledgerentries" ADD CONSTRAINT "ledgerentries_accountId_accounts_accountId_fk" FOREIGN KEY ("accountId") REFERENCES "user"."accounts"("accountId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
