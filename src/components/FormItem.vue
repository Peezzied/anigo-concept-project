<template>
  <FormItem class="col-span-full relative">
    <FormLabel>First Name</FormLabel>
    <FormControl>
      <Input placeholder="First Name" v-bind="firstNameField" />
    </FormControl>
    <FormMessage class="absolute -bottom-5 text-xs right-0" />
  </FormItem>
</template>
