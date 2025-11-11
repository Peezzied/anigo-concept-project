<script setup lang="ts">
import Dialog from './ui/dialog/Dialog.vue';
import DialogContent from './ui/dialog/DialogContent.vue';
import DialogFooter from './ui/dialog/DialogFooter.vue';
import DialogHeader from './ui/dialog/DialogHeader.vue';

</script>

<template>
  <Dialog :open="true">
    <DialogContent class="max-w-xl">
      <DialogHeader></DialogHeader>
      <article>
        <h1 class="text-primary">Payment Successful</h1>
      </article>
      <DialogFooter></DialogFooter>
    </DialogContent>
  </Dialog>
</template>
