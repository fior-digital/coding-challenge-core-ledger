import { z } from "zod";
import { event } from "../../event";

export const UserBalanceEvents = {
  Created: event(
    "userBalance.created",
    z.object({
      id: z.string(),
      balance: z.number()
    })
  ),
  Updated: event(
    "userBalance.updated",
    z.object({
      id: z.string(),
      balance: z.number()
    })
  )
};
