import { baseManager } from "../../base.manager";
import { UserBalanceEvents } from "../events/user_balance";
import { userBalances } from "../models";
import { UserBalanceRepository } from "../repositories/user_balance.repository";

export const UserBalanceManager = baseManager<typeof userBalances, UserBalanceRepository>(
  new UserBalanceRepository(),
  UserBalanceEvents
);
