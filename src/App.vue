<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { fetchCollection } from '@/api'
import Grid from './components/Grid.vue'

const collection = ref([])
const count = ref(0)

onBeforeMount(() => {
  fetchCollection().then(({ count:c, artObjects:as}) => {collection.value =as; count.value = c})
})
</script>

<template>
  <header>Hello there</header>
  <main>
    <Grid :items="collection" />
  </main>
</template>

<style lang="scss">
header {
  font-size: 80px;
  color: red;
}
</style>
