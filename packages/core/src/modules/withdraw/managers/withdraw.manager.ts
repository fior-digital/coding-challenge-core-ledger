import { BaseManager } from "../../base.manager";
import { WithdrawEvents } from "../events/withdraw";
import { withdraws } from "../models";
import { WithdrawRepository } from "../repositories/withdraw.repository";

const withdrawManagerConstructor = (
  repo: WithdrawRepository,
  events: any
) => {
  return new (class extends BaseManager<typeof withdraws, WithdrawRepository>(repo, events) {
  
    async getAllByUserId(userId: string) {
      return repo.getAllByUserId(userId)
    }
  
  })();  
};


export const WithdrawManager = withdrawManagerConstructor(new WithdrawRepository(), WithdrawEvents)



