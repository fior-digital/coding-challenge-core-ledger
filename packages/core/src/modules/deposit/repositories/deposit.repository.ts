import { db } from "../../../drizzle";
import { BaseRepository } from "../../base.repository";
import { deposits } from "../models";

export class DepositRepository extends BaseRepository(db, deposits) { }
