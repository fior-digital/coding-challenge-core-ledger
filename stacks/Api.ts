import { StackContext, Api as SSTApi, use } from "sst/constructs";
import { Database } from "./Database";
import { Bus } from "./Bus";

export function Api({ stack }: StackContext) {
  const db = use(Database);
  const bus = use(Bus);

  const api = new SSTApi(stack, "api", {
    defaults: {
      function: {
        timeout: "900 seconds",
        bind: [db, bus],
      },
    },
    routes: {
      "GET /user/{id}":
        "packages/functions/src/modules/user/user.api-handler.get",
      "POST /user":
        "packages/functions/src/modules/user/user.api-handler.create",
      "GET /user/balance/{id}":
        "packages/functions/src/modules/user/user.api-handler.getUserBalance",
      "GET /transactions/{userId}":
        "packages/functions/src/modules/transaction/transaction.api-handler.getUserTransactions",
      "POST /transaction/withdrawal":
        "packages/functions/src/modules/transaction/transaction.api-handler.withdrawBalance",
      "POST /transaction/deposit":
        "packages/functions/src/modules/transaction/transaction.api-handler.depositBalance",


      "GET /currency/{id}":
        "packages/functions/src/modules/user/currency.api-handler.get",
      "GET /currency/{code}":
        "packages/functions/src/modules/user/currency.api-handler.getByCode",
      "GET /currencies}":
        "packages/functions/src/modules/user/currency.api-handler.getAll",
      "POST /currency":
        "packages/functions/src/modules/user/currency.api-handler.create",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return Api;
}
