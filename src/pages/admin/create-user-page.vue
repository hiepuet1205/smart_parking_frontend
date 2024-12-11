<template>
  <q-page>
    <VBreadCrumbsField :lists="breadCrumbs" />
    <div class="bg-white rounded-borders">
      <div class="form clearfix">
        <VInputSingleImage 
          v-model="image"
          label="Avatar"
          id="input-image"
          :required="true"
        />
        <VInputField
          v-model="name"
          label="Name"
          id="input-name"
          placeholder="name"
          :required="true"
        />
        <VInputField
          v-model="email"
          label="Email"
          id="input-email"
          placeholder="email"
          :required="true"
        />
        <VInputField
          v-model="password"
          label="Password"
          id="input-password"
          placeholder="password"
          :type="'password'"
          :required="true"
        />
        <VSelectField
          v-model="role"
          :options="roleOptions"
          label="Role"
          id="Role"
        />
        <q-btn no-caps class="btn1 float-right my-10px" @click="handleSubmit">
          Submit
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VInputSingleImage from 'components/common/v-input-single-image.vue';
import VInputField from 'components/common/v-input-field.vue';
import VBreadCrumbsField from 'components/common/v-breadcrumbs.vue';
import { useRouter } from 'vue-router';
import { register } from 'src/api/auth.api';
import VSelectField from 'components/common/v-select-field.vue';

const router = useRouter();

const breadCrumbs = ref(['Home', 'List User', 'Create New User']);

const name = ref<string | null>(null);
const email = ref<string | null>(null);
const password = ref<string | null>(null);
const image = ref<File | null>(null);
const role = ref<string | null>(null);

const roleOptions = ref([
  { label: 'Owner parking lot', value: 'OWNER_PARKING_LOT' },
  { label: 'Owner parking slot', value: 'OWNER_PARKING_SLOT' },
  { label: 'User', value: 'USER' },
]);

const handleSubmit = async () => {
  if (!name.value || !email.value || !password.value || !image.value) {
    return;
  }

  const data = await register(name.value, email.value, password.value, image.value);

  console.log(data);

  router.push({ name: 'AdminListUserPage' });
};
</script>
