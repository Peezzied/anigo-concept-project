<template>
  <FormField :name="name" v-slot="{value, handleChange}">
    <FormItem class="flex items-center">
      <FormControl>
        <Checkbox id="terms" class="text-white border-black" :model-value="value" @update:model-value="val => handleChange(!!val)"/>
      </FormControl>
      <FormLabel for="terms"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        <slot/>
      </FormLabel>
    </FormItem>
  </FormField>
</template>
<script setup lang="ts">
import FormControl from './ui/form/FormControl.vue';
import FormItem from './ui/form/FormItem.vue';
import FormLabel from './ui/form/FormLabel.vue';
import Checkbox from './ui/checkbox/Checkbox.vue';
import { FormField } from './ui/form';

defineProps<{
  name: string
}>()
</script>
