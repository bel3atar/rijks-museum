<script setup lang="ts">
import { ref } from 'vue'
const inputValue = ref('')
const props = defineProps<{ disabled: boolean }>()
const emit = defineEmits<{
  search: [searchQuery: string]
}>()

const search = () => {
  if (!props.isLoading) emit('search', inputValue.value)
}
</script>

<template>
  <form class="search">
    <input class="search__input" v-model="inputValue" @keydown.enter.prevent="search" />
    <button class="search__button" @click.prevent="search">Search</button>
  </form>
</template>

<style lang="scss">
@use '@/styles/globals';

.search {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;

  &__input {
    height: 100%;
    border: 1px solid black;
    flex-grow: 1;
    border-radius: 5px;
  }

  &__button {
    border-radius: 5px;
    border: 1px solid black;
    background-color: #dbe7fc;
  }
}

/* phone */
@include globals.respond-to('phone') {
  .search {
    display: unset;
    position: relative;

    &__input {
      width: 80%;
      padding-right: 20%;
    }

    &__button {
      position: absolute;
      border: 0;
      top: 50%;
      right: 0;
      transform: translateY(calc(-50% + 2px));
    }
  }
}
</style>
