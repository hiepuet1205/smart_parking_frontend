<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
            <div class="text-grey-8">Sign in below to access your account</div>
          </q-card-section>
          <q-card-section>
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
              Sign in
            </q-btn>
          </q-card-section>
          <q-card-section>
            <p>Don't have an account? <router-link :to="{ name: 'RegisterPage' }">Sign up here</router-link></p>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VInputField from 'src/components/common/v-input-field.vue';
import { login } from 'src/api/auth.api';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');

const handleClick = async () => {
  if (email.value && password.value) {
    await login(email.value, password.value)
    router.push({ name: 'HomePage' });
  }
}

</script>
