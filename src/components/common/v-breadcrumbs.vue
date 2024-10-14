<template>
  <q-breadcrumbs class="text-main2" active-color="main py-10px">
    <q-breadcrumbs-el v-for="list in props.lists" :key="list" :label="list" />
  </q-breadcrumbs>
</template>

<script setup lang="ts">
defineOptions({
  name: 'VBreadCrumbsField'
});

const props = defineProps<{
  lists: string[];
}>();
</script>
