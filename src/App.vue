<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { fetchCollection } from '@/api'
import Grid from './components/Grid.vue'

const RESULTS_PER_PAGE = 20

const collection = ref([])
const count = ref(0)
const page = ref(1)
const state = ref<'loading' | 'loaded' | 'error'>('loading')

onBeforeMount(() => {
  fetchCollection({ resultsPerPage: RESULTS_PER_PAGE, page: page.value }).then(
    ({ count: c, artObjects: as }) => {
      collection.value = as
      count.value = c
      state.value = 'loaded'
    },
  )
})
const loadMore = () => {
  state.value = 'loading'
  fetchCollection({ resultsPerPage: RESULTS_PER_PAGE, page: ++page.value }).then(
    ({ artObjects: as }) => {
      collection.value.push(...as)
      state.value = 'loaded'
    },
  )
}
</script>

<template>
  <header>Hello there</header>
  <main>
    <Grid :items="collection" />
    <button class="load-more" :disabled="state === 'loading'" @click="loadMore">Load more</button>
  </main>
</template>

<style lang="scss">
@use '@/styles/globals';
@use 'sass:map';

main {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
}
header {
  font-size: 80px;
  color: red;
}

.load-more {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

$desktopConfig: map.get(globals.$breakpoints, 'desktop');

@media (min-width: map.get($desktopConfig, 'minWidth')) {
  .load-more {
    width: 240px;
  }
}
</style>
