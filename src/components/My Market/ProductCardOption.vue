<script setup lang="ts">
import Checkbox from '../ui/checkbox/Checkbox.vue';
import FormControl from '../ui/form/FormControl.vue';
import FormItem from '../ui/form/FormItem.vue';
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field"

const isChecked = defineModel<boolean>('checked')
const quantity = defineModel<number>('quantity')

export interface Product {
  id: number
  name: string
  price: number
}

defineProps<Product>()
</script>

<template>
  <FormItem class="flex justify-between py-6 items-center">
    <div class="flex flex-row max-w-fit gap-6">
      <FormControl>
        <Checkbox class="text-white border-neutral size-7 border self-center " v-model="isChecked" />
      </FormControl>
      <div class="bg-background-80 max-w-fit p-3 rounded-[17px] w-41">
        <img src="../../assets/img/chicken.png" class="aspect-square" alt="" />
      </div>
      <div class="font-medium flex justify-between flex-col py-2">
        <div>
          <h2>{{ name }}</h2>
          <h2 class="text-xl">{{ price }}/kilo</h2>
        </div>
        <div class="flex justify-between items-center w-45">
          <span class="font-semibold text-xl">Subtotal</span>
          <span class="font-semibold text-primary">₱200</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <FormControl>
        <NumberField id="age" :default-value="18" :min="0" v-model="quantity">
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
      </FormControl>
      <a class="text-[13px] font-medium text-clickable">Remove</a>
    </div>
  </FormItem>
</template>
