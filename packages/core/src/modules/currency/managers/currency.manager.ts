import { BaseManager } from "../../base.manager";
import { WithdrawEvents } from "../events/currency";
import { currencies } from "../models";
import { CurrencyRepository } from "../repositories/currency.repository";

const currencyManagerConstructor = (
  repo: CurrencyRepository,
  events: any
) => {
  return new (class extends BaseManager<typeof currencies, CurrencyRepository>(repo, events) {
  
    async getByCode(code: string) {
      return repo.getByCode(code)
    }

    async getAll(){
      return repo.list()
    }
  })();  
};


export const CurrencyManager = currencyManagerConstructor(new CurrencyRepository(), WithdrawEvents)



