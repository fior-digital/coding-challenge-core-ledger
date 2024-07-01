import { BaseManager } from "../../base.manager";
import { UserBalanceEvents } from "../events/user_balance";
import { userBalances, UserBalance } from "../models";
import { UserBalanceRepository } from "../repositories/user_balance.repository";

const userBalanceManagerConstructor = (
  repo: UserBalanceRepository<typeof userBalances>,
  events: any
) => {
  return new (class extends BaseManager<typeof userBalances, UserBalanceRepository<typeof userBalances>>(repo, events) {
  
    async getByUserId(userId: string) {
      return repo.getByUserId(userId)
    }
    
    async getByUserIdAndCurrencyId(userId: string, currencyId: string){
      return repo.getByUserIdAndCurrency(userId, currencyId)
    }

    async upsert(item: UserBalance) {
      const updatedItem = await repo.upsert(item, (item as any).version);
      if (item.id.length > 0){
        await events.Updated.publish(updatedItem);
        return updatedItem;
      }

      await events.Created.publish(updatedItem);
      return updatedItem;
    }
  
  })();  
};


export const UserBalanceManager = userBalanceManagerConstructor(new UserBalanceRepository(), UserBalanceEvents)