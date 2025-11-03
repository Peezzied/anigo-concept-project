<script lang="ts" setup>
import GenericHeader from '@/components/GenericHeader.vue';
import { Label } from '@/components/ui/label'
import { Icon } from "@iconify/vue";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import ProductCardOption, { type Product } from '@/components/My Market/ProductCardOption.vue';
import DatePicker from '@/components/DatePicker.vue';
import { useForm, useFormErrors } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from "zod"
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import Button from '@/components/ui/button/Button.vue';
import type { DateValue } from 'reka-ui';

type ProductFormItem = {
  id: number
  qty: number
}

const products: Product[] = [
  { id: 1, name: "Whole Chicken", price: 200 },
  { id: 2, name: "Pork Belly", price: 350 },
  { id: 3, name: "Tilapia", price: 180 },
]

const formSchema = toTypedSchema(
  z.object({
    products: z.array(
      z.object({
        id: z.number(),
        qty: z.number().min(1, "Quantity must be at least 1"),
      })
    ).refine(value => value.length > 0, {
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
)

const { handleSubmit, errors } = useForm({ validationSchema: formSchema, initialValues: {
    products: [] as ProductFormItem[],
  },})

const onSubmit = handleSubmit((values) => {
  console.log('forms', values)
})

</script>
<template>
  <GenericHeader>
    <h1 class="text-5xl text-primary-50">My Basket</h1>
  </GenericHeader>
  <main>
    <form class="grid grid-cols-[1fr_340px] gap-20 mx-auto max-w-7xl" @submit="onSubmit">
      <FormField name="products" v-slot="{ value, handleChange }: { value: ProductFormItem[]; handleChange: (v: ProductFormItem[]) => void }">
        <FormItem class="space-y-8">
          <h1 class="text-3xl!">My Cart (4)</h1>
          <section class="cards">
              <ProductCardOption
                v-for="p in products"
                :key="p.id"
                :id="p.id"
                :name="p.name"
                :price="p.price"
                :checked="value.some(v => v.id === p.id)"
                :quantity="value.find(v => v.id === p.id)?.qty ?? 1"
                @update:checked="(checked) => {
                  const updated = checked
                    ? [...value, { id: p.id, qty: 1 }]
                    : value.filter(v => v.id !== p.id)
                  handleChange(updated)
                }"
                @update:quantity="(qty) => {
                  const updated = value.map(v =>
                    v.id === p.id ? { ...v, qty: qty ?? 0 } : v
                  )
                  handleChange(updated)
                }" class="border-t border-black/20" />
          </section>
        </FormItem>
      </FormField>
      <article>
        <div class="space-y-3 p-6 rounded-[10px] bg-[#f7f3e0] border border-black/34">
          <h2 class="text-xl font-semibold">My Order</h2>
          <hr class="opacity-17">
          <section class="space-y-6">
            <table class="w-full font-medium border-separate border-spacing-y-1">
              <tbody>
                <tr>
                  <td>Items</td>
                  <td class="text-right">2</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td class="text-right">₱200</td>
                </tr>
              </tbody>
            </table>
            <FormField name="mode" v-slot="{componentField}">
              <RadioGroup default-value="pickup" class="gap-2" v-bind="componentField"> 
                <h3 class="font-semibold mb-2">Order method</h3>
                <div class="flex items-center gap-2">
                  <Label for="pickup" class="flex-1 cursor-pointer">
                    <Icon class="size-5 text-secondary/60" icon="fluent:box-16-filled" />
                    <span class="text-base">Pickup</span>
                  </Label>
                  <RadioGroupItem id="pickup" value="pickup" />
                </div>
                <div class="flex items-center gap-2">
                  <Label for="reserve" class="flex-1 cursor-pointer">
                    <Icon class="size-5 text-secondary/60" icon="material-symbols:calendar-clock-rounded" />
                    <span class="text-base">Reservation</span>
                  </Label>
                  <RadioGroupItem id="reserve" value="reserve" />
                </div>
                <div class="flex items-center gap-2">
                  <Label for="deliver" class="cursor-not-allowed opacity-50 flex-1 flex gap-1 items-center">
                    <span class="text-xs bg-secondary/60 px-1 rounded-sm text-background">Soon</span>
                    <span class="text-base">Delivery</span>
                  </Label>
                  <RadioGroupItem id="deliver" value="deliver" disabled />
                </div>
              </RadioGroup>
            </FormField>
            <section>
              <h3 class="font-semibold mb-3">Reservation</h3>
              <DatePicker/>
            </section>
          </section>
          <button class="text-primary-50 bg-primary font-medium w-full p-2 rounded-[7px] mt-7" type="submit">Proceed to Order</button>
          <ul class="text-red-500 mt-3 text-sm">
            <li v-for="(msg, key) in errors" :key="key">{{ msg }}</li>
          </ul>
        </div>
      </article>
    </form>
  </main>
</template>

<style scoped>
.cards>*:last-of-type {
  @apply border-b
}
</style>
