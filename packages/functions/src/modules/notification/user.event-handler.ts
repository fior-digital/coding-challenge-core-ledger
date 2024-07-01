import { UserEvents } from "@coding-challenge-core-ledger/core/modules/user";
import { EventHandler } from "sst/node/event-bus";

export const userCreatedEventHandler = EventHandler(UserEvents.Created, async (evt) => {
  console.log("User created", evt);
});
