<template>
  <q-page>
    <VBreadCrumbsField :lists="breadCrumbs" />
    <div class="bg-white rounded-borders">
      <div class="form clearfix">
        <VInputField
          v-model="newPassword"
          label="New Password"
          id="input-newPassword"
          placeholder="New Password"
          :required="true"
          type="password"
        />
        <VInputField
          v-model="newPasswordConfirm"
          label="New Password Confirm"
          id="input-newPasswordConfirm"
          placeholder="New Password Confirm"
          :required="true"
          type="password"
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
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { resetPasswordUser } from 'src/api/user.api';

const breadCrumbs = ref(['Home', 'Reset Password User']);

const newPassword = ref<string>('');
const newPasswordConfirm = ref<string>('');
const router = useRouter();
const route = useRoute();

const handleSubmit = async () => {
  if (!newPassword.value || !newPasswordConfirm.value) {
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
    await resetPasswordUser(
      newPassword.value, Number(route.params.userId));

    router.push({ name: 'ListUserPage' });
  } catch (error) {
    console.log(error);
  }
};
</script>
