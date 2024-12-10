<script setup lang="ts">
import { ref} from 'vue'
const inputValue = ref('')
const props = defineProps<{disabled: boolean}>()
const emit = defineEmits<{
  search: [searchQuery: string]
}>()

const search = () => {
  if (!props.isLoading) emit('search', inputValue.value)
}
</script>

<template>
  <form class="search">
    <input class="search__input" v-model="inputValue" @keydown.enter.prevent="search"/>
    <button class="search__button" @click.prevent="search">Search</button>
  </form>
</template>

<style lang="scss">
.search {
  display: flex;
  flex-direction: row;
  gap: 10px;
  &__input{
    flex-grow: 1;
  }
}
</style>
