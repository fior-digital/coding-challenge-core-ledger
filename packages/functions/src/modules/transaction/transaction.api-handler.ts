import { WithdrawManager } from "@coding-challenge-core-ledger/core/modules/withdraw";
import { DepositManager } from "@coding-challenge-core-ledger/core/modules/deposit";
import { UserBalanceManager } from "@coding-challenge-core-ledger/core/modules/user_balance";
import { ApiHandler, usePathParams } from "sst/node/api";

export const getUserTransactions = ApiHandler(async (_evt) => {
  const params = usePathParams();
  if (!params.userId) return { statusCode: 400 };
  const userWitdraws = await WithdrawManager.getAllByUserId(params.userId);
  const userDeposits = await DepositManager.getAllByUserId(params.userId);
  const userBalances = await UserBalanceManager.get(params.userId);
  const response = {
    userWitdraws: userWitdraws,
    userDeposits: userDeposits,
    userBalances: userBalances
  }
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
});

export const withdrawBalance = ApiHandler(async (_evt) => {
  if (!_evt.body) return { statusCode: 400 };
  // validation
  const withdrawRecord = await WithdrawManager.create(JSON.parse(_evt.body));

  const internalServerError = { statusCode: 500, body:"internal server error"}

  //when there is error we can put log
  if (!withdrawRecord) return internalServerError

  const userBalanceRecord = await UserBalanceManager.getByUserId(withdrawRecord.userId)

  if (!userBalanceRecord) return internalServerError

  userBalanceRecord.inEur -= withdrawRecord.totalAmount

  const balanceRecord = await UserBalanceManager.update(userBalanceRecord.id, userBalanceRecord)

  if (!balanceRecord) return internalServerError
  
  return {
    statusCode: 200,
  };
});
