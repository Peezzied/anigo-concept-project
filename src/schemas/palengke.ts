import { z } from "zod";
import { ProductRefSchema, ProductSchema } from "./product";


export const PalengkeRawSchema = z.object({
  id: z.number(),
  name: z.string(),
  location: z.string(),
  lat: z.number(),
  lng: z.number(),
  products: z.array(ProductRefSchema)
})

export const PalengkeSchema = PalengkeRawSchema.extend({
  products: z.array(ProductSchema),
});

export type Palengke = z.infer<typeof PalengkeSchema>
export type PalengkeRaw = z.infer<typeof PalengkeRawSchema>
