<template>
  <q-page>
    <VBreadCrumbsField :lists="breadCrumbs" />
    <div class="bg-white rounded-borders q-pt-lg">
      
    
      <VTableField
        :rows="requestStore.getRequests"
        :columns="columns"
        :pagination="pagination"
        :handle-edit="() => {}"
        :meta="requestStore.getMeta"
        :show-create="false"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VTableField from 'components/common/v-table-field.vue';
import VBreadCrumbsField from 'components/common/v-breadcrumbs.vue';
import { Column } from 'components/models';
import { useRequestStore } from 'src/store/request.store';
import { getAllRequest } from 'src/api/request.api';

defineOptions({
  name: 'ListRequestPage',
});

const breadCrumbs = ref(['Home', 'List Rent Request']);

const requestStore = useRequestStore();

onMounted(async () => {
  await getAllRequest(['PAID', 'REFUNDED', 'CANCELLED', 'COMPLETED']);
})

const columns: Column[] = [
  {
    name: 'Id',
    required: true,
    label: 'Id',
    align: 'left',
    field: 'id',
  },
  { name: 'slot', align: 'center', label: 'Slot', field: 'slotId' },
  { name: 'start', align: 'center', label: 'Start', field: 'startTime' },
  { name: 'end', align: 'center', label: 'End', field: 'endTime' },
  { name: 'status', align: 'center', label: 'Status', field: 'status' },
]

const pagination = {
  rowsPerPage: 10
};

</script>
