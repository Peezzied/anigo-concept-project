import { z } from "zod";


export const ProductSchema = z.object({
  id: z.number(),
  category: z.number(),
  name: z.string(),
  price: z.array(z.number()).max(2),
  unit: z.enum(["kg", "pc"])
})

export const ProductRefSchema = z.object({
  id: z.number(),
  base_id: z.number(),
  price: z.array(z.number()).max(2),
})

export const ItemSchema = z.object({
  product: ProductSchema,
  palengke_id: z.number(),
  qty: z.number(),
  factor: z.number(),
  price: z.array(z.number()).max(2),
  subtotal: z.array(z.number()).max(2),
})

export type Product = z.infer<typeof ProductSchema>
export type Item = z.infer<typeof ItemSchema>
