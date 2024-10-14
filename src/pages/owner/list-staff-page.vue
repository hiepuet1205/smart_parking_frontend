<template>
  <q-page>
    <VBreadCrumbsField :lists="breadCrumbs" />
    <div class="bg-white rounded-borders">
      <div class="row">
        <div class="col-8">
          <div class="row p-16px">
            <div class="col-6">
              <VInputField
                v-model="keyword"
                label="Keyword"
                id="input-keyword"
                placeholder="keyword"
              />
            </div>
            <div class="col-6">
              <VSelectField
                v-model="status"
                :options="statusOptions"
                label="Status"
                id="status"
              />
            </div>
          </div>
        </div>
        <div class="col-1 relative-position">
          <q-btn no-caps class="search btn1" @click="handleSearch">
            Search
          </q-btn>
        </div>
      </div>
    
      <VTableField
        :rows="staffStore.getStaffs"
        :columns="columns"
        :pagination="pagination"
        :pageCreate="'CreateStaffPage'"
        :meta="staffStore.getMeta"
        :handle-edit="handleEdit"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VSelectField from 'components/common/v-select-field.vue';
import VInputField from 'components/common/v-input-field.vue';
import VTableField from 'components/common/v-table-field.vue';
import VBreadCrumbsField from 'components/common/v-breadcrumbs.vue';
import { Column, User } from 'components/models';
import { useStaffStore } from 'src/store/staff.store';
import { changeStatusStaff, getAllStaff } from 'src/api/staff.api';
import Swal from 'sweetalert2';

defineOptions({
  name: 'ListStaffPage',
});

const breadCrumbs = ref(['Home', 'List Staff']);

const staffStore = useStaffStore();

onMounted(async () => {
  await getAllStaff();
})

const keyword = ref<string | null>(null);
const status = ref<string | null>(null);
  const statusOptions = ref([
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]);

const handleSearch = async () => {
  await getAllStaff(keyword.value, status.value);
};

const columns: Column[] = [
  {
    name: 'Id',
    required: true,
    label: 'Id',
    align: 'left',
    field: 'id',
  },
  { name: 'name', align: 'center', label: 'Name', field: 'name' },
  { name: 'email', align: 'center', label: 'Email', field: 'email' },
  { name: 'status', align: 'center', label: 'Status', field: 'status' },
  { name: 'actions', align: 'center', field: 'actions', label: 'Action' }
]

const handleEdit = (staff: User) => {
  Swal.fire({
    title: `Do you want to ${staff.status === 'active' ? 'deactivate' : 'activate'} staff with id: ${staff.id}?`,
    showDenyButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: 'No'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await changeStatusStaff(staff.id, staff.status === 'active' ? 'inactive' : 'active');
      Swal.fire('Saved!', '', 'success').then(() => {
        window.location.reload();
      })
    }
  });
};

const pagination = {
  rowsPerPage: 10
};

</script>
