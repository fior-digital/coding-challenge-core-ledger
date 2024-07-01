import { db } from "../../../drizzle";
import { eq } from "drizzle-orm";
import { BaseRepository, doTransaction } from "../../base.repository";
import { currencies } from "../models";

export class CurrencyRepository extends BaseRepository(db, currencies) {

    async getByCode(code: string) {
        return doTransaction(
            db,
            async (connection) =>
                (
                  await connection
                    .select()
                    .from(currencies)
                    .where(eq(currencies.code, code))
                    .execute()
                )
        );
    }
 }
