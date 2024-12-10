<script setup lang="ts">
import type { ArtObject } from '@/api/types'

const props = withDefaults(
  defineProps<ArtObject & { tag?: string }>(),
  { tag: 'div' }
)
</script>
<template>
  <component :is="props.tag" class="grid-item">
    <img :src="props.webImage.url" class="grid-item__image" />
    <p class="grid-item__title">{{ props.title }}</p>
  </component>
</template>

<style lang="scss">
$root: ".grid-item";

#{$root} {
  &:hover {
    #{$root}__title {
      display: unset;
    }
  }

  position: relative;
  display: block;

  &__image {
    max-width: 100%;
  }

  &__title {
    display: none;
    color: white;
    position: absolute;
    width: 100%;
    left: 50%;
    transform: translate(-50%, 0%);
    bottom: 0;
    text-align: center;
    line-clamp: 3;
    -webkit-line-clamp: 3;
  }
}
</style>
