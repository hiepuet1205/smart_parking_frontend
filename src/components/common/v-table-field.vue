<template>
  <div class="row px-32px">
    <p class="text-main2 font-bold font-size-16px">Show {{ recordStart }}-{{ recordEnd }} / {{ total }}</p>
    <q-space />
    <q-btn v-if="showCreate" no-caps class="btn2" :to="{ name: props?.pageCreate }" tag="router-link">
      <q-icon name="fa-solid fa-circle-plus" class="q-pr-sm"/>
      Create
    </q-btn>
  </div>

  <div class="row px-32px py-16px">
    <div class="col-12">
      <q-table
        flat bordered
        :rows="rows"
        :columns="columns"
        :pagination="pagination"
        hide-bottom
        color="primary"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <span :class="getStatusClass(props.row.status)">
              {{ props.row.status }}
            </span>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense round flat color="grey" icon="edit" @click="handleEdit(props.row)"></q-btn>
          </q-td>          
        </template>
      </q-table>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="page"
          :max="totalPages"
          input
          color="main"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Column, Meta, Pagination } from 'components/models';

defineOptions({
  name: 'VTableField'
});

const props = withDefaults(defineProps<{
  rows: object[];
  columns: Column[];
  pagination?: Pagination;
  pageCreate?: string; 
  meta?: Meta;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleEdit: (row: any) => void;
  showCreate?: boolean
}>(), {
  showCreate: true
});

const total = props.meta ? props.meta.total : 0;
const totalPages = props.meta ? Math.ceil(props.meta.total / props.meta.perPage) : 1;
const page = props.meta ? props.meta.page : 1;
const recordStart = props.meta ? (page - 1) * props.meta.perPage + 1 : 1;
const recordEnd = props.meta ? page * props.meta.perPage : 1;

const getStatusClass = (status: string) => {
  return status.toLocaleLowerCase() === 'active' ? 'status-active' : 'status-inactive';
};

</script>
