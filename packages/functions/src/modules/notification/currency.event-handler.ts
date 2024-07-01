import { CurrencyEvents } from "@coding-challenge-core-ledger/core/modules/currency";
import { EventHandler } from "sst/node/event-bus";

export const currencyCreatedEventHandler = EventHandler(CurrencyEvents.Created, async (evt) => {
  console.log("Currency created", evt);
});