import { CurrencyManager } from "@coding-challenge-core-ledger/core/modules/currency";
import { ApiHandler, usePathParams } from "sst/node/api";

export const getAll = ApiHandler(async (_evt) => {
  const currencies = await CurrencyManager.getAll();
  return {
    statusCode: 200,
    body: JSON.stringify(currencies),
  };
});

export const get = ApiHandler(async (_evt) => {
  const params = usePathParams();
  if (!params.id) return { statusCode: 400 };
  const currency = await CurrencyManager.get(params.id);
  return {
    statusCode: 200,
    body: JSON.stringify(currency),
  };
});

export const getByCode = ApiHandler(async (_evt) => {
  const params = usePathParams();
  if (!params.code) return { statusCode: 400 };
  const currency = await CurrencyManager.getByCode(params.code);
  return {
    statusCode: 200,
    body: JSON.stringify(currency),
  };
});


export const create = ApiHandler(async (_evt) => {
  if (!_evt.body) return { statusCode: 400 };
  // validation
  const item = await CurrencyManager.create(JSON.parse(_evt.body));
  return {
    statusCode: 200,
    body: JSON.stringify(item),
  };
});





