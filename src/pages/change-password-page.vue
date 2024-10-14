<template>
  <q-page>
    <VBreadCrumbsField :lists="breadCrumbs" />
    <div class="bg-white rounded-borders">
      <div class="form clearfix">
        <VInputField
          v-model="oldPassword"
          label="Old Password"
          id="input-oldPassword"
          placeholder="Old Password"
          :required="true"
        />
        <VInputField
          v-model="newPassword"
          label="New Password"
          id="input-newPassword"
          placeholder="New Password"
          :required="true"
        />
        <VInputField
          v-model="newPasswordConfirm"
          label="New Password Confirm"
          id="input-newPasswordConfirm"
          placeholder="New Password Confirm"
          :required="true"
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
import VInputField from 'components/common/v-input-field.vue';
import VBreadCrumbsField from 'components/common/v-breadcrumbs.vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { changePassword } from 'src/api/user.api';
import { useAuthStore } from 'src/store/auth.store';

const breadCrumbs = ref(['Home', 'Change Password']);

const oldPassword = ref<string>('');
const newPassword = ref<string>('');
const newPasswordConfirm = ref<string>('');
const router = useRouter();
const useAuth = useAuthStore();

const handleSubmit = async () => {
  if (!oldPassword.value || !newPassword.value || !newPasswordConfirm.value) {
    return;
  }

  if (newPassword.value !== newPasswordConfirm.value) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Password not match',
    })
    return;
  }

  try {
    await changePassword({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    });

    await useAuth.logout();
    router.push({ name: 'LoginPage' });
  } catch (error) {
    console.log(error);
  }
};
</script>
