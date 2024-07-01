import { StackContext, EventBus, use } from "sst/constructs";
import { Database } from "./Database";

export function Bus({ stack }: StackContext) {
  const db = use(Database);

  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 3,
    },
  });

  bus.subscribe("user.created", {
    bind: [db],
    handler:
      "packages/functions/src/modules/notification/user-created.event-handler.userCreatedEventHandler",
      "packages/functions/src/modules/notification/user.event-handler.userCreatedEventHandler",
  });

  bus.subscribe("userBalance.created", {
    bind: [db],
    handler:
      "packages/functions/src/modules/notification/user_balance.event-handler.userBalanceCreatedEventHandler",
  });

  bus.subscribe("userBalance.updated", {
    bind: [db],
    handler:
      "packages/functions/src/modules/notification/user_balance.event-handler.userBalanceUpdatedEventHandler",
  });

  bus.subscribe("deposit.created", {
    bind: [db],
    handler:
      "packages/functions/src/modules/notification/deposit.event-handler.depositCreatedEventHandler",
  });

  bus.subscribe("withdraw.created", {
    bind: [db],
    handler:
      "packages/functions/src/modules/notification/withdraw.event-handler.withdrawCreatedEventHandler",
  });

  stack.addOutputs({
    busName: bus.eventBusName,
  });

  return bus;
}
