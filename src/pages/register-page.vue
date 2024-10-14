<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Sign up</div>
            <div class="text-grey-8">Sign up below to access your account</div>
          </q-card-section>
          <q-card-section>
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
              placeholder="Name"
              :required="true"
            />
            <VInputField
              v-model="email"
              label="Email"
              id="input-email"
              placeholder="Email"
              :required="true"
            />
            <VInputField
              v-model="password"
              label="Password"
              id="input-password"
              placeholder="password"
              type="password"
              :required="true"
            />
          </q-card-section>
          <q-card-section>
            <q-btn no-caps class="w-100vh btn1" @click="handleClick">
              Sign up
            </q-btn>
          </q-card-section>
          <q-card-section>
            <p>Already have an account? <router-link :to="{ name: 'LoginPage' }">Login</router-link></p>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { register } from 'src/api/auth.api';
import VInputField from 'src/components/common/v-input-field.vue';
import VInputSingleImage from 'src/components/common/v-input-single-image.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const image = ref<File | null>(null);

const handleClick = async () => {
  if (email.value && password.value && name.value && image.value) {
    await register(name.value, email.value, password.value, image.value as File);
    router.push({ name: 'LoginPage' });
  }
}

</script>
