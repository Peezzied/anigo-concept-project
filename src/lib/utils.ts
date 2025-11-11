import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { categories } from "@/assets/data/categories"

export type Predicate = () => boolean;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parsePrice(price: number[]): string  {
  if (price[1])
    return `${price[0]}—${price[1]}`;
  return `${price[0]}`;
}

export function parseCategory(cat: number) {
  return categories.find(item => item.id === cat)
}
