import { ProductSchema } from "@/schemas/product";
import { z } from "zod";
import baseProducts from "@/assets/data/base_products.json";
import type { PalengkeRaw } from "@/schemas/palengke";

export function palengkeMap(palengke: PalengkeRaw) {
  const baseProductsParsed = z.array(ProductSchema).parse(baseProducts);
  const baseProductsMap = Object.fromEntries(baseProductsParsed.map((p) => [p.id, p]));
  const palengkeMapped = {
    ...palengke,
    products: palengke.products.map((p) => ({
      ...baseProductsMap[p.base_id]!!!!!!!,
      ...(p.price.length > 0 && { price: p.price }),
    })),
  };

  return { palengkeMapped, baseProductsParsed }
}
