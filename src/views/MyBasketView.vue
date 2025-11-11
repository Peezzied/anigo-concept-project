<script lang="ts" setup>
import GenericHeader from '@/components/GenericHeader.vue';
import { Label } from '@/components/ui/label'
import { Icon } from "@iconify/vue";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import ProductCardOption from '@/components/My Market/ProductCardOption.vue';
import DatePicker from '@/components/DatePicker.vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { FormField } from '@/components/ui/form';
import OrderDialog from '@/components/My Market/OrderDialog.vue';
import { computed, onMounted, ref, watch } from 'vue';
import NavigationBar from '@/components/NavigationBar.vue';
import { type Item } from '@/schemas/product';
import { useCartStore } from '@/stores/useCartStore';
import { OrderFormSchema, type OrderForm } from '@/schemas/forms';
import { parseCategory, parsePrice } from '@/lib/utils';
import InfoHover from '@/components/InfoHover.vue';
import OrderSuccess from '@/components/OrderSuccess.vue';
import OrderSummary from '@/components/My Market/OrderSummary.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';

const cart = useCartStore()

const formSchema = toTypedSchema(OrderFormSchema)
const isOrderOpen = ref();

const { handleSubmit, errors, values, setFieldValue } = useForm({
  validationSchema: formSchema, initialValues: {
    products: cart.selection ?? [],
    mode: 'pickup'
  },
})

const items = ref<OrderForm>()
const onSubmit = handleSubmit((values) => {
  isOrderOpen.value = true
  items.value = values

  console.log('onSubmit value form', values)
  console.log('onSubmit value facts.', cart.items)
})

const onRemove = (item: Item) => {
  cart.removeFromCart(item.product.id);
  setFieldValue('products', values.products?.filter((x) => x.product.id !== item.product.id))
}

const displayItems = computed(() => {
  console.log('displayitems run')
  return cart.items.map(p => {
    const price = p.product.price.map(x => Math.round(x * p.factor))
    const subtotal = price.map(x => x * p.qty)
    return {
      ...p,
      price,
      subtotal,
    }
  }) as Item[]
}
)

watch(values, (x) => {
  cart.updateSelection(x.products ?? [])
})


// const total = computed(() => {
//   const selectedIds = new Set(values?.products?.map(v => v.product.id))

//   const subtotal = displayItems.value.reduce<number[]>((acc, item) => {
//     if (selectedIds.has(item.product.id)) {
//       const { subtotal } = item

//       if (acc.length === 0)
//         subtotal.forEach((x) => acc.push(x))
//       else {
//         for (let index = 0; index < acc.length; index++) {
//           acc[index]! += (subtotal[index] ?? 0)
//         }
//       }
//     }
//     return acc
//   }, []);

//   for (let index = 0; index < subtotal.length; index++) {
//     subtotal[index]! += serviceFee
//   }

//   return subtotal

// })




</script>
<template>
  <NavigationBar colored />
  <GenericHeader>
    <h1 class="text-5xl text-primary-50">My Basket</h1>
  </GenericHeader>
  <main>
    <form class="grid grid-cols-[1fr_340px] gap-20 mx-auto max-w-7xl mb-50" @submit="onSubmit">
      <FormField name="products" v-slot="{ value, handleChange }: { value: Item[]; handleChange: (v: Item[]) => void }">
        <section class="space-y-8">
          <h1 class="text-3xl!">My Cart ({{ cart.items.length }})</h1>
          <section class="cards">
            <ProductCardOption :category="parseCategory(p.product.category)!" @remove="onRemove(p)"
              v-for="p in displayItems" :factor="p.factor" :key="p.product.id" :unit="p.product.unit"
              :name="p.product.name" :price="p.price" :subtotal="p.subtotal"
              :checked="value.some(v => v.product.id === p.product.id)" :quantity="p.qty" @update:checked="(checked) => {
                const updated = checked
                  ? [...value, { product: p.product, qty: p.qty, factor: p.factor, price: p.price, subtotal: p.subtotal, palengke_id: p.palengke_id }]
                  : value.filter(v => v.product.id !== p.product.id)
                handleChange(updated)
              }" @update:quantity="(qty) => {
                cart.updateQuantity(p.product.id, qty!)

                // find the updated item from displayItems (which is reactive)
                const updatedDisplay = displayItems.find(d => d.product.id === p.product.id)
                if (!updatedDisplay) return

                const updated = value.map(v =>
                  v.product.id === p.product.id
                    ? { ...v, qty: qty!, subtotal: updatedDisplay.subtotal }
                    : v
                )

                handleChange(updated)
              }" @update:factor="(factor) => {
                cart.updateFactor(p.product.id, factor!)

                // same idea: get fresh subtotal from displayItems
                const updatedDisplay = displayItems.find(d => d.product.id === p.product.id)
                if (!updatedDisplay) return

                const updated = value.map(v =>
                  v.product.id === p.product.id
                    ? { ...v, factor: factor!, subtotal: updatedDisplay.subtotal }
                    : v
                )

                handleChange(updated)
              }" class=" border-t border-black/20" />
          </section>
        </section>
      </FormField>
      <article class="relative">
        <div class="space-y-3 p-6 rounded-[10px] bg-[#f7f3e0] border border-black/34 sticky top-25">
          <h2 class="text-xl font-semibold">My Order</h2>
          <hr class="opacity-17">
          <section class="space-y-6">
            <OrderSummary :items="displayItems" />
            <FormField name="mode" v-slot="{ componentField }">
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
            <FormField name="date" v-slot="{ componentField }">
              <FormItem>
                <FormLabel as-child>
                  <h3 class="font-semibold mb-1">Reservation</h3>
                </FormLabel>
                <FormControl>
                  <DatePicker v-bind="componentField" />
                </FormControl>
              </FormItem>
            </FormField>
          </section>
          <button class="text-primary-50 bg-primary font-medium w-full p-2 rounded-[7px] mt-7" type="submit">Proceed
            to Order</button>
          <OrderDialog v-model:items="items" v-model:open="isOrderOpen" />
          <ul class="text-red-500 mt-3 text-sm">
            <li v-for="(msg, key) in errors" :key="key">{{ msg }}</li>
          </ul>
        </div>
      </article>
    </form>
    <!-- <OrderSuccess/> -->
  </main>
</template>

<style scoped>
.cards>*:last-of-type {
  @apply border-b
}
</style>
