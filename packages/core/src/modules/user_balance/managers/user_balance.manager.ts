import { BaseManager } from "../../base.manager";
import { UserBalanceEvents } from "../events/user_balance";
import { userBalances } from "../models";
import { UserBalanceRepository } from "../repositories/user_balance.repository";
import { InferSelectModel, eq } from "drizzle-orm";

const userBalanceManagerConstructor = (
  repo: UserBalanceRepository<typeof userBalances>,
  events: any
) => {
  return new (class extends BaseManager<typeof userBalances, UserBalanceRepository<typeof userBalances>>(repo, events) {
  
    async getByUserId(userId: string) {
      return repo.getByUserId(userId)
    }
  
  })();  
};


export const UserBalanceManager = userBalanceManagerConstructor(new UserBalanceRepository(), UserBalanceEvents)