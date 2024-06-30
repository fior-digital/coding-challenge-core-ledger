import { z } from "zod";
import { event } from "../../event";

export const DepositEvents = {
  Created: event(
    "deposit.created",
    z.object({
      id: z.string(),
      totalAmount: z.number()
    })
  ),
};
