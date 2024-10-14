<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script setup>
import { useCommonStore } from 'src/store/common.store';

const commonStore = useCommonStore();

commonStore.setTitle('Home');

defineOptions({
  name: 'IndexPage'
});
</script>
