import { baseManager } from "../../base.manager";
import { DepositEvents } from "../events/deposit";
import { deposits } from "../models";
import { DepositRepository } from "../repositories/deposit.repository";

export const DepositManager = baseManager<typeof deposits, DepositRepository>(
  new DepositRepository(),
  DepositEvents
);
