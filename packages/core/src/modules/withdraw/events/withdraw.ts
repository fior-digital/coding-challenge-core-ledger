import { z } from "zod";
import { event } from "../../event";

export const WithdrawEvents = {
  Created: event(
    "withdraw.created",
    z.object({
      id: z.string(),
      totalAmount: z.number()
    })
  ),
};
