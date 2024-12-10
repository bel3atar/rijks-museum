<script setup lang="ts">
import { onBeforeMount, ref, computed, watch } from 'vue'
import { fetchCollection } from '@/api'
import Grid from './components/Grid.vue'
import Search from './components/Search.vue'

const RESULTS_PER_PAGE = 20

const collection = ref([])
const count = ref(0)
const page = ref(1)
const state = ref<'loading' | 'loaded' | 'error'>('loading')
const searchQuery = ref<string | undefined>(undefined)

const isLoading = computed(() => state.value === 'loading')
const isError = computed(() => state.value === 'error')

onBeforeMount(() => {
  fetchCollection({ resultsPerPage: RESULTS_PER_PAGE, page: page.value })
    .then(({ count: c, artObjects: as }) => {
      collection.value = as
      count.value = c
      state.value = 'loaded'
    })
    .catch(handleError)
})
const loadMore = () => {
  state.value = 'loading'
  fetchCollection({
    resultsPerPage: RESULTS_PER_PAGE,
    page: ++page.value,
    searchQuery: searchQuery.value,
  })
    .then(({ artObjects: as }) => {
      collection.value.push(...as)
      state.value = 'loaded'
    })
    .catch(handleError)
}

const performSearch = (query) => (searchQuery.value = query)

watch(searchQuery, (newSearch) => {
  state.value = 'loading'
  fetchCollection({ resultsPerPage: RESULTS_PER_PAGE, page: 1, searchQuery: newSearch })
    .then(({ count: c, artObjects: as }) => {
      collection.value = as
      count.value = c
      state.value = 'loaded'
    })
    .catch(handleError)
})

const handleError = () => {
  state.value = 'error'
}
</script>

<template>
  <header>Rijks Museum</header>
  <div v-if="isError">An error has occured, please refresh</div>
  <main v-else>
    <Search class="search" @search="performSearch" :disabled="isLoading" />
    <Grid :items="collection" />
    <button
      class="load-more"
      v-if="collection.length < count"
      :disabled="isLoading"
      @click="loadMore"
    >
      {{ isLoading ? 'Loading...' : 'Load more' }}
    </button>
  </main>
</template>

<style lang="scss">
@use '@/styles/globals';

main {
  padding: 10px;
  display: grid;
  gap: 5px;
  grid-template-columns: 1fr;
  justify-items: center;
  background-color: grey;
}

header {
  font-size: 24px;
  color: red;
  border: 1px solid black;
  padding: 10px;
}

.load-more {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

.search {
  width: 100%;
}

@include globals.respond-to('desktop') {
  .load-more {
    width: 240px;
  }
}
</style>
