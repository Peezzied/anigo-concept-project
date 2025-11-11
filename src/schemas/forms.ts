import { z } from "zod";
import type { DateValue } from 'reka-ui';
import { ItemSchema } from "./product";

export const OrderFormSchema = z.object({
  products: z.array(ItemSchema)
    .refine(value => value.length > 0, {
      message: "You have to select at least one product.",
    }),
  mode: z.enum(["reserve", "pickup"], {
    required_error: "Please select a mode.",
  }),
  date: z.custom<DateValue>().optional(),
}).refine(
  (data) => data.mode !== "reserve" || data.date !== undefined,
  {
    message: "Date is required.",
    path: ["date"],
  }
)

export type OrderForm = z.infer<typeof OrderFormSchema>;
