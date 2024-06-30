import { BaseManager } from "../../base.manager";
import { DepositEvents } from "../events/deposit";
import { deposits } from "../models";
import { DepositRepository } from "../repositories/deposit.repository";

const depositManagerConstructor = (
  repo: DepositRepository,
  events: any
) => {
  return new (class extends BaseManager<typeof deposits, DepositRepository>(repo, events) {
  
    async getAllByUserId(userId: string) {
      return repo.getAllByUserId(userId)
    }
  
  })();  
};


export const DepositManager = depositManagerConstructor(new DepositRepository(), DepositEvents)