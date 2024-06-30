import { db } from "../../../drizzle";
import { BaseRepository } from "../../base.repository";
import { withdraws } from "../models";

export class WithdrawRepository extends BaseRepository(db, withdraws) { }
