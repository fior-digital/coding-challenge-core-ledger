import { WithdrawManager, Withdraw } from "@coding-challenge-core-ledger/core/modules/withdraw";
import { DepositManager, Deposit } from "@coding-challenge-core-ledger/core/modules/deposit";
import { UserBalanceManager } from "@coding-challenge-core-ledger/core/modules/user_balance";
import { ApiHandler, usePathParams } from "sst/node/api";

export const getUserTransactions = ApiHandler(async (_evt) => {
  const params = usePathParams();
  if (!params.userId) return { statusCode: 400 };
  const userWitdraws = await WithdrawManager.getAllByUserId(params.userId);
  const userDeposits = await DepositManager.getAllByUserId(params.userId);
  const userBalances = await UserBalanceManager.getByUserId(params.userId);
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

type transactionInputModel = { userId: string, currencyId: string, amount: number; };

export const withdrawBalance = ApiHandler(async (_evt) => {
  if (!_evt.body) return { statusCode: 400 };
 
  let input: transactionInputModel = JSON.parse(_evt.body)

  // validation
  if(!input || input.userId.length == 0 || input.currencyId.length == 0 || input.amount <= 0) return { statusCode:400, body:"payload model is not correct."}

  const createWithdrawModel: Withdraw = {
    id: "",
    userId: input.userId,
    currencyId: input.currencyId,
    originalAmount: input.amount,
    flatFee: 1.00,
    totalAmount: input.amount + 1.00,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const internalServerError = { statusCode: 500, body:"internal server error"};

  const userBalanceRecord = await UserBalanceManager.getByUserIdAndCurrencyId(input.userId, input.currencyId);

  if (!userBalanceRecord) return internalServerError;

  if(userBalanceRecord.balance < createWithdrawModel.totalAmount) return { statusCode: 400, body:"user balance is not enough"};

  const withdrawRecord = await WithdrawManager.create(createWithdrawModel);

  if (!withdrawRecord) return internalServerError;
 
  userBalanceRecord.balance -= withdrawRecord.totalAmount;

  const balanceRecord = await UserBalanceManager.update(userBalanceRecord.id, userBalanceRecord);

  if (!balanceRecord) return internalServerError;
  
  return {
    statusCode: 200,
    body: JSON.stringify(balanceRecord)
  };
});

export const depositBalance = ApiHandler(async (_evt) => {
  if (!_evt.body) return { statusCode: 400 };

  const internalServerError = { statusCode: 500, body:"internal server error"};

  let input: transactionInputModel = JSON.parse(_evt.body)

  // validation
  if(!input || input.userId.length == 0 || input.currencyId.length == 0 || input.amount <= 0) return { statusCode:400, body:"payload model is not correct."}

  const createDepositModel: Deposit = {
    id: "",
    userId: input.userId,
    currencyId: input.currencyId,
    originalAmount: input.amount,
    flatFee: 1.00,
    totalAmount: input.amount - 1.00,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const depositRecord = await DepositManager.create(createDepositModel);

  if (!depositRecord) return internalServerError;

  const userBalanceRecord = await UserBalanceManager.getByUserIdAndCurrencyId(input.userId, input.currencyId);

  if (!userBalanceRecord) return internalServerError;

  userBalanceRecord.balance += depositRecord.totalAmount;

  if (userBalanceRecord.userId.length == 0) {
    userBalanceRecord.userId = input.userId
  }

  if(userBalanceRecord.currencyId.length == 0) {
    userBalanceRecord.currencyId = input.currencyId
  }

  const balanceRecord = await UserBalanceManager.upsert(userBalanceRecord);

  if (!balanceRecord) return internalServerError;
  
  return {
    statusCode: 200,
    body: JSON.stringify(balanceRecord)
  };
});
