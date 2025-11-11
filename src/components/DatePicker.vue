<script setup lang="ts">
import type { DateValue } from "@internationalized/date"
import {
  CalendarDate,
  DateFormatter,

  getLocalTimeZone,
} from "@internationalized/date"
import { Calendar as CalendarIcon } from "lucide-vue-next"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { computed } from "vue"

const df = new DateFormatter("en-US", {
  dateStyle: "long",
})
const props = defineProps<{ modelValue?: DateValue }>()
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})

// Today
const today = new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());

// Max date = today + 3 days
const maxDate = new CalendarDate(today.year, today.month, today.day + 3);
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-[280px] justify-start text-left font-normal hover:bg-stone-200/50 hover:opacity-70',
          !value && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0 bg-white border-black/45">
      <Calendar :min-value="today" :max-value="maxDate" v-model="value" class=" overflow-hidden "/>
    </PopoverContent>
  </Popover>
</template>
