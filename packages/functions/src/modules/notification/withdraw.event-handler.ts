import { WithdrawEvents } from "@coding-challenge-core-ledger/core/modules/withdraw";
import { EventHandler } from "sst/node/event-bus";

export const withdrawCreatedEventHandler = EventHandler(WithdrawEvents.Created, async (evt) => {
  console.log("Withdraw transaction created", evt);
});