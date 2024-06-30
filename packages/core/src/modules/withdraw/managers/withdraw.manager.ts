import { baseManager } from "../../base.manager";
import { WithdrawEvents } from "../events/withdraw";
import { withdraws } from "../models";
import { WithdrawRepository } from "../repositories/withdraw.repository";

export const WithdrawManager = baseManager<typeof withdraws, WithdrawRepository>(
  new WithdrawRepository(),
  WithdrawEvents
);
