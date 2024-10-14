<template>
  <q-page>
    <VBreadCrumbsField :lists="breadCrumbs" />
    <div class="bg-white rounded-borders">
      <VTableField
        :rows="withdrawRequest"
        :columns="columns"
        :pagination="pagination"
        :handle-edit="() => {}"
        :show-create="true"
        :pageCreate="'CreateWithdrawRequestPage'"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VTableField from 'components/common/v-table-field.vue';
import VBreadCrumbsField from 'components/common/v-breadcrumbs.vue';
import { Column } from 'components/models';
import { getWithdrawRequest } from 'src/api/user.api';

defineOptions({
  name: 'ListWithdrawRequestPage',
});

const breadCrumbs = ref(['Home', 'List Rent Request']);

const withdrawRequest = ref([]);

onMounted(async () => {
  withdrawRequest.value = await getWithdrawRequest();
})

const columns: Column[] = [
  {
    name: 'Id',
    required: true,
    label: 'Id',
    align: 'left',
    field: 'id',
  },
  { name: 'amount', align: 'center', label: 'Amount', field: 'amount' },
  { name: 'Created At', align: 'center', label: 'Created At', field: 'createdAt' },
  { name: 'status', align: 'center', label: 'Status', field: 'status' },
]

const pagination = {
  rowsPerPage: 10
};

</script>
