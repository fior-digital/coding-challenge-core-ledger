import { UserBalanceEvents } from "@coding-challenge-core-ledger/core/modules/user_balance";
import { EventHandler } from "sst/node/event-bus";

export const userBalanceCreatedEventHandler = EventHandler(UserBalanceEvents.Created, async (evt) => {
  console.log("user_balance created", evt);
});

export const userBalanceUpdatedEventHandler = EventHandler(UserBalanceEvents.Updated, async (evt) => {
  console.log("user_balance updated", evt);
});