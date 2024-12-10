<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { fetchCollection } from '@/api'

const collection = ref([])

onBeforeMount(() => {
  fetchCollection().then((data) => (collection.value = data))
})
</script>

<template>
  <header>Hello there</header>
  <main>
    {{ collection }}
  </main>
</template>

<style lang="scss">
header {
  font-size: 80px;
  color: red;
}
</style>
