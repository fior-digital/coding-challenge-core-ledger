import { DepositEvents } from "@coding-challenge-core-ledger/core/modules/deposit";
import { EventHandler } from "sst/node/event-bus";

export const depositCreatedEventHandler = EventHandler(DepositEvents.Created, async (evt) => {
  console.log("Deposit transaction created", evt);
});