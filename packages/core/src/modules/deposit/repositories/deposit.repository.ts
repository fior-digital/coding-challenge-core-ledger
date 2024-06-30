import { db } from "../../../drizzle";
import { eq } from "drizzle-orm";
import { BaseRepository, doTransaction } from "../../base.repository";
import { deposits } from "../models";

export class DepositRepository extends BaseRepository(db, deposits) {
    async getAllByUserId(userId: string) {
        return doTransaction(
            db,
            async (connection) =>
                (
                  await connection
                    .select()
                    .from(deposits)
                    .where(eq(deposits.userId, userId))
                    .execute()
                )
        );
    }
}
