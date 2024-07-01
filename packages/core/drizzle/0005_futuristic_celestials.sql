ALTER TABLE "withdraw"."withdraws" ADD COLUMN "currencyId" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "deposit"."deposits" ADD COLUMN "currencyId" varchar NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "withdraw"."withdraws" ADD CONSTRAINT "withdraws_currencyId_currencies_id_fk" FOREIGN KEY ("currencyId") REFERENCES "currency"."currencies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deposit"."deposits" ADD CONSTRAINT "deposits_currencyId_currencies_id_fk" FOREIGN KEY ("currencyId") REFERENCES "currency"."currencies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
