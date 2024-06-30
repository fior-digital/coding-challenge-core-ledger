import { db } from "../../../drizzle";
import { BaseRepository } from "../../base.repository";
import { userBalances } from "../models";

export class UserBalanceRepository extends BaseRepository(db, userBalances) { }
