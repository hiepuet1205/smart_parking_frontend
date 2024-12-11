<template>
  <q-page>
    <VBreadCrumbsField :lists="breadCrumbs" />
    <div class="bg-white rounded-borders">
      <div class="row">
        <div class="col-4">
          <div class="row p-16px">
            <div class="col-12">
              <VInputField
                v-model="keyword"
                label="Keyword"
                id="input-keyword"
                placeholder="keyword"
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
        :pageCreate="'CreateUserPage'"
        :meta="staffStore.getMeta"
        :handle-edit="handleEdit"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VInputField from 'components/common/v-input-field.vue';
import VTableField from 'components/common/v-table-field.vue';
import VBreadCrumbsField from 'components/common/v-breadcrumbs.vue';
import { Column, User } from 'components/models';
import { useStaffStore } from 'src/store/staff.store';
import { getAllUsers } from 'src/api/user.api';
import { useRouter } from 'vue-router';

const router = useRouter();


defineOptions({
  name: 'ListStaffPage',
});

const breadCrumbs = ref(['Home', 'List User']);

const staffStore = useStaffStore();

onMounted(async () => {
  await getAllUsers();
})

const keyword = ref<string | null>(null);

const handleSearch = async () => {
  const users = await getAllUsers();
  console.log(users.filter((user: User) => user.name.toLowerCase().includes(keyword.value?.toLowerCase() || '')));
  staffStore.setStaffs(users.filter((user: User) => user.name.toLowerCase().includes(keyword.value?.toLowerCase() || '')));

  console.log(staffStore.getStaffs);
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
  { name: 'role', align: 'center', label: 'Role', field: 'role' },
  { name: 'actions', align: 'center', field: 'actions', label: 'Action' }
]

const handleEdit = (staff: User) => {
  router.push({ name: 'AdminResetPasswordUser', params: { userId: staff.id } });
};

const pagination = {
  rowsPerPage: 10
};

</script>
