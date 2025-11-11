<script setup lang="ts">
import { parsePrice } from '@/lib/utils';
import type { Item } from '@/schemas/product';
import { computed } from 'vue';
import InfoHover from '../InfoHover.vue';
import { useCartStore } from '@/stores/useCartStore';
import type { OrderForm } from '@/schemas/forms';

const cart = useCartStore()
const props=defineProps<{
  items: Item[];
  mode?: OrderForm['mode']
}>()


const serviceFee = 2
const reservationFee = 20
const total = computed(() => {
  const selectedIds = new Set(cart.selection.map(v => v.product.id))

  const subtotal = props.items.reduce<number[]>((acc, item) => {
    if (selectedIds.has(item.product.id)) {
      const { subtotal } = item

      if (acc.length === 0)
        subtotal.forEach((x) => acc.push(x))
      else {
        for (let index = 0; index < acc.length; index++) {
          if (!(subtotal.length == 1 && index == 0))
            acc[index]! += subtotal[index-1] ?? 0
          else
            acc[index]! += (subtotal[index] ?? 0)
        }
      }
    }
    return acc
  }, []);

  for (let index = 0; index < subtotal.length; index++) {
    subtotal[index]! += serviceFee
    if (props.mode == 'reserve')
      subtotal[index]! += reservationFee
  }

  return subtotal

})
defineExpose({
  total
})
</script>

<template>
  <table class="w-full font-medium border-separate border-spacing-y-1">
    <tbody>
      <tr class="text-sm">
        <td>Items</td>
        <td class="text-right">{{ cart.selection.length }}</td>
      </tr>
      <tr class="text-sm" v-if="total.length > 0">
        <td class="flex gap-2"><span>Service Fee</span>
          <InfoHover class="opacity-60" width="14px">
            asd
          </InfoHover>
        </td>
        <td class="text-right">₱2</td>
      </tr>
      <tr class="text-sm" v-if="props.mode == 'reserve'">
        <td class="flex gap-2"><span>Reservation Fee</span>
          <InfoHover class="opacity-60" width="14px">
            asd
          </InfoHover>
        </td>
        <td class="text-right">₱20</td>
      </tr>
      <tr>
        <td>
          <div>Total</div>
        </td>
        <td class="text-right">₱{{ total.length > 0 ? parsePrice(total) : 'N/A' }}</td>
      </tr>
    </tbody>
  </table>
</template>
