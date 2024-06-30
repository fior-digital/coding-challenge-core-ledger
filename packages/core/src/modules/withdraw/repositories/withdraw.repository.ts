import { db } from "../../../drizzle";
import { eq } from "drizzle-orm";
import { BaseRepository, doTransaction } from "../../base.repository";
import { withdraws } from "../models";

export class WithdrawRepository extends BaseRepository(db, withdraws) {

    async getAllByUserId(userId: string) {
        return doTransaction(
            db,
            async (connection) =>
                (
                  await connection
                    .select()
                    .from(withdraws)
                    .where(eq(withdraws.userId, userId))
                    .execute()
                )
        );
    }
 }
