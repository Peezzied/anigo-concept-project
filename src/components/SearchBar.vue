<script setup lang="ts">
import products from '@/assets/data/base_products.json';
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxList } from "@/components/ui/combobox";
import { Check } from 'lucide-vue-next';
import {
  InputGroup,
  InputGroupAddon,
} from '@/components/ui/input-group'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import InputGroupInputWrapper from '@/components/ui/input-group/InputGroupInputWrapper.vue';
import { Icon } from '@iconify/vue';
import { categories, Category } from "@/assets/data/categories"
import MapSelectDialog from '@/components/Market/MapSelectDialog.vue';
import { useRoute, useRouter } from 'vue-router';
import { computed, h, ref } from 'vue';
import { useMarketSelectionStore } from '@/stores/useMarketSelectionStore';
import { useToast } from './ui/toast';
import ToastAction from './ui/toast/ToastAction.vue';

const router = useRouter()
const route = useRoute()
const { toast } = useToast()
const value = ref()
const category = ref<Category | undefined>()

const isDialogOpen = ref()
const marketSelection = useMarketSelectionStore()
marketSelection.$subscribe(() => {
  isDialogOpen.value = false;
  toast({
    title: 'Palengke Selected',
    description: `You have selected ${marketSelection.palengke?.name}`
  })
})
const search = () => {
  if (!marketSelection.palengke) {
    isDialogOpen.value = true;
    toast({
      title: 'No palengke detected',
      description: `Select a palengke first before searching.`,
    })
    return
  }
  router.push({ name: 'Market', query: { search: value.value, category: category.value?.id } })
}

const filteredProducts = computed(() =>
  products.filter(p => {
    const matchesCategory = category.value?.id
      ? p.category === category.value.id
      : true // no category selected → include all
    const matchesSearch = value.value
      ? p.name.toLowerCase().includes(String(value.value).toLowerCase())
      : true // no search term → include all
    return matchesCategory && matchesSearch
  })
)

</script>
<template>
  <InputGroup class="bg-linear-to-b from-[#F2FDF6] to-[#909793] to-[300%] rounded-full h-fit border-0 shadow-sm">
    <InputGroupInputWrapper>
      <Combobox :reset-model-value-on-clear="true" :reset-search-term-on-blur="false" :ignore-filter="true">
        <ComboboxAnchor as-child>
          <div class="relative w-full items-center">
            <ComboboxInput v-model="value" class="placeholder:text-[#A1A6AD] text-neutral"
              :display-value="(val) => val ?? ''" placeholder="e.g. pork"></ComboboxInput>
          </div>
        </ComboboxAnchor>

        <ComboboxList align="start">
          <ComboboxEmpty class="px-5">
            No framework found.
          </ComboboxEmpty>

          <ComboboxGroup>
            <ComboboxItem v-for="product in filteredProducts" :key="product.name" :value="product.name">
              {{ product.name }}

              <ComboboxItemIndicator>
                <Check class="ml-auto h-4 w-4" />
              </ComboboxItemIndicator>
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </Combobox>
    </InputGroupInputWrapper>
    <InputGroupAddon>
      <img src="@/assets/icons/basket.svg" class="size-6 mx-3" alt="">
    </InputGroupAddon>
    <InputGroupAddon class=" m-0! p-0! h-full flex" align="inline-end">
      <Select v-model:model-value="category">
        <SelectTrigger size="sm" class="bg-linear-to-b from-[#E4E7E5] to-[#9D9D9D] to-[300%]">
          <SelectValue class="text-neutral" placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent class="bg-primary-50 border-black/20">
          <SelectItem v-for="cat in categories" :key="cat.id" :value="cat" class="text-neutral">{{ cat.title }}
          </SelectItem>
        </SelectContent>
      </Select>
      <button>
        <MapSelectDialog v-model:open="isDialogOpen">
          <Icon icon="material-symbols:location-chip" class="text-accent size-12 fill-accent" />
        </MapSelectDialog>
      </button>
      <button class="rounded-r-full px-3! bg-secondary h-full font-semibold text-base" @click="search">Search</button>
    </InputGroupAddon>
  </InputGroup>
</template>
