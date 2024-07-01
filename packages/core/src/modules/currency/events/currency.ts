import { z } from "zod";
import { event } from "../../event";

export const CurrencyEvents = {
  Created: event(
    "currency.created",
    z.object({
      id: z.string(),
      totalAmount: z.number()
    })
  ),
};
