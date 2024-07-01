import { db } from "../../../drizzle";
import { eq, and, InferSelectModel } from "drizzle-orm";
import { PgColumn, PgTable } from "drizzle-orm/pg-core";
import { BaseRepository, doTransaction } from "../../base.repository";
import { userBalances } from "../models";

export class UserBalanceRepository<T extends PgTable & { id: PgColumn }> extends BaseRepository(db, userBalances) {
    async getByUserId(userId: string){
        return doTransaction(
            db,
            async (connection) => (
                  await connection
                    .select()
                    .from(userBalances)
                    .where(eq(userBalances.userId, userId))
                    .execute()
                )[0]
        ) as InferSelectModel<T>;
    }
    async getByUserIdAndCurrency(userId: string, currencyId: string){
        return doTransaction(
            db,
            async (connection) => (
                await connection
                    .select()
                    .from(userBalances)
                    .where(and(eq(userBalances.userId, userId),eq(userBalances.currencyId, currencyId)))
                    .execute()
            )[0]
        ) as InferSelectModel<T>;
    }
}
