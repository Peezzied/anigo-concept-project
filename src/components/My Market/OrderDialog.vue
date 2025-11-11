<script setup lang="ts">
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import DialogClose from '../ui/dialog/DialogClose.vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { FormField } from '../ui/form';
import FormItem from '../ui/form/FormItem.vue';
import FormControl from '../ui/form/FormControl.vue';
import FormLabel from '../ui/form/FormLabel.vue';
import Input from '../ui/input/Input.vue';
import RadioGroup from '../ui/radio-group/RadioGroup.vue';
import Label from '../ui/label/Label.vue';
import RadioGroupItem from '../ui/radio-group/RadioGroupItem.vue';
import Textarea from '../ui/textarea/Textarea.vue';
import FormMessage from '../ui/form/FormMessage.vue';
import FormDescription from '../ui/form/FormDescription.vue';
import Separator from '../ui/separator/Separator.vue';
import DialogScrollContent from '../ui/dialog/DialogScrollContent.vue';
import * as z from "zod"
import type { OrderForm } from '@/schemas/forms';
import { parsePrice } from '@/lib/utils';
import palengke from "@/assets/data/palengke.json"
import { Icon } from '@iconify/vue';
import Checkbox from '../ui/checkbox/Checkbox.vue';
import Button from '../ui/button/Button.vue';
import { computed, ref, type Ref } from 'vue';
import AgreementTicker from '../AgreementTicker.vue';
import OrderSuccess from '../OrderSuccess.vue';
import OrderSummary from './OrderSummary.vue';
import type { Item } from '@/schemas/product';
import { toDate } from 'reka-ui/date';

const isOpen = defineModel<boolean>('open')
const items = defineModel<OrderForm>('items')

const formSchema = toTypedSchema(
  z.object({
    name: z.string(),
    email: z.string().email("Must be a valid email"),
    address: z.string(),
    phone: z.string().length(11, "Must be a valid phone number"),
    payment: z.enum(["cash", "e-wallet", "card"]).optional(),
    instruction: z.string().optional(),
    terms: z.boolean().refine(val => val === true)
  }).superRefine((data, ctx) => {
    // If mode is pickup, payment is required
    if (items.value?.mode === "pickup" && !data.payment) {
      ctx.addIssue({
        path: ["payment"],
        code: z.ZodIssueCode.custom,
        message: "Payment method is required for pickup orders",
      });
    }
  })
)
const { handleSubmit, meta } = useForm({
  validationSchema: formSchema, initialValues: { payment: 'cash' }
})
const loading = ref(false);

const orderSummary: Ref<InstanceType<typeof OrderSummary> | null> = ref(null)

const onSubmit = handleSubmit((values) => {
  console.log("gogogooo")
  console.log('transaction', values)

  const id = crypto.randomUUID()

  loading.value = true
  const transactionPromise = fetch("https://sheetdb.io/api/v1/5xi14820e22dn?sheet=transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          mode: items.value?.mode,
          method: items.value?.date ? `RSV ${items.value.date}` : values.payment,
          instruction: values.instruction,
          total: parsePrice(orderSummary.value!.total),
          order_id: id
        }
      ]
    })
  })
    .then(res => res.json())
    .then(console.log)
    .catch(console.error);


  const ordersData = items.value?.products.map(product => ({
    id: id,
    palengke: palengke.find(p => p.id === product.palengke_id)?.name || "Unknown",
    product: product.product.name,
    qty: product.qty,
    price: parsePrice(product.product.price),
    subtotal: parsePrice(product.subtotal)
  }))

  console.log("items", items.value)
  console.log("ordersData", ordersData);

  const orderPromise = fetch("https://sheetdb.io/api/v1/5xi14820e22dn?sheet=orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: ordersData
    })
  })
    .then(res => res.json())
    .then(console.log)
    .catch(console.error);

  Promise.all([transactionPromise, orderPromise])
    .then(() => {
      isOpen.value = false;
      loading.value = true;
    })

})

interface InformationField {
  name: string,
  label: string,
  placeholder: string,
  description?: string,
  type?: HTMLInputElement["type"],
}

const yourInformationField: InformationField[] = [
  {
    name: "name",
    label: "Name",
    placeholder: 'Enter your name'
  },
  {
    name: "email",
    label: "Email",
    placeholder: 'Enter your email',
    type: 'email'
  },
  {
    name: "address",
    label: "Address",
    placeholder: 'Enter your address'
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "Enter your phone number"
  },
]

const methods = [
  {
    value: "cash",
    name: "Cash on Pickup",
    description: "Pay in cash when collecting your order, simple, safe, and convenient!"
  },
  {
    value: "e-wallet",
    name: "E-wallet payment",
    description: "Fast, secure, and effortless cashless payment for a smooth checkout experience."
  },
  {
    value: "card",
    name: "Credit/Debit card",
    unavailable: true
  }
]

const date = computed(() => {
  const dateTime = items.value?.date;

  if (!dateTime) return ''; // Handle undefined/null

  const jsDate = toDate(dateTime);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(jsDate);
});

</script>
<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogScrollContent class="max-w-xl">
      <form @submit.prevent="onSubmit">
        <DialogHeader class="mt-3 mb-15">
          <DialogTitle as-child>
            <Icon width="34" icon="icon-park-outline:transaction-order" />
            <h1 class="text-xl! leading-6 mt-3">Trannsaction Form</h1>
            <p>Fill out the form below to complete the transaction.</p>
          </DialogTitle>
        </DialogHeader>
        <article class="space-y-7 ">
          <section class="space-y-5 mb-12">
            <h2 class="font-semibold">Your Information</h2>
            <div class="space-y-4">
              <FormField :name="field.name" v-slot="{ componentField }" v-for="field in yourInformationField"
                :key="field.name">
                <FormItem>
                  <FormLabel>{{ field.label }}</FormLabel>
                  <FormControl>
                    <Input v-bind="componentField" :type="field.type" :placeholder="field.placeholder" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </section>
          <Separator />
          <section class="space-y-5" v-if="items?.mode === 'pickup'">
            <h2 class="font-semibold">Payment Method</h2>
            <FormField name="payment" v-slot="{ componentField }">
              <FormItem>
                <FormControl>
                  <RadioGroup v-bind="componentField" class="flex flex-col gap-0! divide-y-1  divide-black/7">
                    <div v-for="method in methods" :key="method.value"
                      :class="`flex gap-2 justify-between py-5 m-0 [&:first-child]:pt-0! [&:last-of-type]:border-b-0 cursor-pointer ${method.unavailable ? 'opacity-50 cursor-not-allowed' : ''}`">
                      <Icon icon="mdi:cash" width="25" class="fill-secondary text-secondary" />
                      <div class="flex justify-between flex-1">
                        <div>
                          <Label for="cash" class="leading-6 ">{{ method.name }}</Label>
                          <img src="../../assets/img/ewallet array.png" class="w-24 mb-3 opacity-90"
                            v-if="method.value === 'e-wallet'" alt="">
                          <p class="text-sm mt-1 opacity-85 max-w-md">{{ method.description }}</p>
                        </div>
                        <RadioGroupItem :disabled="method.unavailable" :id="method.value" :value="method.value"
                          class="mt-1" />
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </section>
          <section v-else>
            <h2 class="font-semibold mb-2">Reservation</h2>
            <p>You are expected to secure the product in <span class="font-medium">{{ date }}</span>. </p>
            <p class="text-sm mt-2 opacity-80">Please note that if the reservation is not completed by this date, the reservation fee will be non-refundable.</p>
          </section>
          <Separator />
          <section>
            <h2 class="font-semibold mb-2">Order Summary</h2>
            <OrderSummary ref="orderSummary" :mode="items?.mode" :items="items?.products as Item[]" />
          </section>
          <Separator />
          <section class="space-y-7">
            <FormField name="instruction" v-slot="{ componentField }">
              <FormItem>
                <FormLabel>Special Instructions (optional)</FormLabel>
                <FormControl>
                  <Textarea v-bind="componentField" placeholder="Write your instruction" />
                </FormControl>
              </FormItem>
            </FormField>
            <AgreementTicker name="terms">
              I agree to the<a href="" class="text-clickable underline">Terms and Conditions</a>
            </AgreementTicker>
          </section>
        </article>
        <DialogFooter class="flex! justify-between! mt-12">
          <div>
            <Button type="submit" class="bg-primary text-primary-50 font-semibold rounded-lg p-2 px-3"
              :disabled="!meta.valid"><span>Submit</span></Button>
            <Spinner v-if="loading" class="inline size-5 ml-2" />
          </div>
          <DialogClose as-child>
            <button class="font-medium opacity-85">Close</button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogScrollContent>
  </Dialog>
</template>
