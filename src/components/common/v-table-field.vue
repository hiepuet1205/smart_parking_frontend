<template>
  <div class="row px-32px">
    <p class="text-main2 font-bold font-size-16px">
      Show {{ recordStart }}-{{ recordEnd }} / {{ totalRows }}
    </p>
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
        :rows="paginatedRows"
        :columns="columns"
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
          v-model="currentPage"
          :max="totalPages"
          input
          color="main"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Column } from 'components/models';
import { computed, ref } from 'vue';

defineOptions({
  name: 'VTableField'
});

const props = withDefaults(defineProps<{
  rows: object[];
  columns: Column[];
  pageCreate?: string; 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleEdit: (row: any) => void;
  showCreate?: boolean;
}>(), {
  showCreate: true
});

const currentPage = ref(1);
const rowsPerPage = 10; // Số dòng trên mỗi trang, có thể thay đổi nếu cần

const totalRows = computed(() => props.rows.length);
const totalPages = computed(() => Math.ceil(totalRows.value / rowsPerPage));

const recordStart = computed(() => (currentPage.value - 1) * rowsPerPage + 1);
const recordEnd = computed(() => Math.min(currentPage.value * rowsPerPage, totalRows.value));

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  return props.rows.slice(start, start + rowsPerPage);
});

const getStatusClass = (status: string) => {
  return status.toLocaleLowerCase() === 'active' ? 'status-active' : 'status-inactive';
};
</script>
