<script setup lang="ts">
import { parsePrice } from '@/lib/utils';
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
import { computed, ref, watch } from 'vue';
import type { Category } from '@/assets/data/categories';
import { Icon } from '@iconify/vue';

const isChecked = defineModel<boolean>('checked')
const quantity = defineModel<number>('quantity')
const factor = defineModel<number>('factor')

export interface Product {
  category: Category
  name: string
  price: number[]
  unit: "kg" | "pc",
  subtotal: number[]
}

const emit = defineEmits<{
  (e: 'remove'): void
}>()

const kgFactors = [
  {
    label: 'whole',
    factor: 1,
    symbol: '1',
  },
  {
    label: 'three-fourth',
    factor: 0.75,
    symbol: '¾',
  },
  {
    label: 'half',
    factor: 0.5,
    symbol: '½',
  },
  {
    label: 'quarter',
    factor: 0.25,
    symbol: '¼',
  },
];


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
          <span class="px-2 text-background rounded-md text-sm font-medium" :style="{backgroundColor: category.color}">{{ category.title }}</span>
          <h2 class="mt-1">{{ name }}</h2>
          <h2 class="text-[18px]">₱{{ parsePrice(price) }}/<span class="text-sm">{{unit === 'kg' ? kgFactors.find((x) => x.factor === factor)?.label + ' ' : ''}}{{ unit }}</span></h2>
        </div>
        <div class="flex justify-between items-center gap-8">
          <span class="font-semibold text-xl">Subtotal</span>
          <span class="font-semibold text-primary w-fit">₱{{ parsePrice(subtotal) }}</span>
        </div>
      </div>
    </div>
    <div class="flex justify-between flex-col gap-6">
      <div class="flex gap-2 flex-wrap max-w-50 justify-end" v-if="unit === 'kg'">
        <button type="button" class="text-sm bg-[#e9e4cf] text-center rounded-full px-3  cursor-pointer w-fit" :style="{
          opacity: factor === i.factor ? '1' : factor === 0 ? '1' : '0.6', fontWeight: factor === i.factor ? 500 : 400
        }" @click="factor = i.factor" v-for="i in kgFactors" :key="i.label">{{ i.label }}</button>
      </div>
      <div class="flex flex-col gap-3 items-end">
        <FormControl>
          <NumberField class="max-w-26 shadow-sm rounded-md overflow-hidden" id="age" :default-value="18" :min="1" v-model="quantity">
            <NumberFieldContent>
              <NumberFieldDecrement class="bg-secondary *:size-7" />
              <NumberFieldInput class="text-base! "/>
              <NumberFieldIncrement class="bg-secondary *:size-7" />
            </NumberFieldContent>
          </NumberField>
        </FormControl>
        <a class="text-[13px] font-medium text-clickable flex items-center gap-1" @click="emit('remove')"><Icon icon="ic:twotone-close" class="leading-none p-0 m-0"/><span>Remove</span></a>
      </div>
    </div>
  </FormItem>
</template>
