<script setup lang="ts">
import type { ArtObject } from '@api/types'
import GridItem from '@/components/GridItem.vue'

const props = defineProps<{ items: ArtObject[] }>()
</script>
<template>
  <ul class="grid">
    <GridItem v-for="item in props.items" v-bind="item" :key="item.id" tag="li" />
  </ul>
</template>
<style lang="scss">
@use 'sass:map';
@use '@/styles/globals';

$root: '.grid';

#{$root} {
  display: grid;
  max-width: 100%;
  list-style: none;
  grid-gap: 8px;
  align-items: center;
  justify-items: center;
}

@each $deviceType, $config in globals.$breakpoints {
  @include globals.respond-to($deviceType) {
    #{$root} {
      grid-template-columns: repeat(map.get($config, 'numberOfColumns'), 1fr);
    }
  }
}
</style>
