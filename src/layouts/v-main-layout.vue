<template>
  <div class="row">
    <div class="col-2 bg-white">
      <q-toolbar class="h-56px">
        <q-btn flat style="color: #F38744;" class="font-size-20px font-bold">Smart Parking</q-btn>
      </q-toolbar>

      <q-list>
        <template v-for="(menuItem, index) in authStore.getMenuList" :key="index">
          <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple :to="{ name: menuItem.name }" tag="router-link">
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" class="text-main2 font-size-14px font-weight-600" />
            </q-item-section>
            <q-item-section class="text-main2 font-size-14px font-weight-600">
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
          <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
        </template>
      </q-list>
    </div>
    <div class="col-10">
      <q-toolbar class="bg-white text-main2 h-80px px-30px py-10px pl-0">
        <q-icon name="menu" size="24px"></q-icon>
        <p class="font-size-20px line-height-20px mb-0 ml-10px font-bold ">{{ commonStore.getTitle }}</p>
        <q-btn v-if="authStore.getInfo?.role !== 'ADMIN'" no-caps class="btn2">
          <q-icon name="fa-solid fa-wallet" class="q-pr-sm"/>
          Amount: {{ Intl.NumberFormat('vi-VN').format(authStore.getInfo?.total || 0) }} VNĐ
        </q-btn>
        <q-space />

        <q-btn-dropdown flat no-caps class="ml-10px relative-position">
          <template v-slot:label>
            <q-avatar>
              <img :src="authStore.getInfo?.avatar" />
            </q-avatar>
          </template>

          <q-list separator v-if="authStore.getInfo?.role !== 'ADMIN'">
            <q-item v-for="(item, index) in listItems" :key="index" clickable @click="item.click">
              <q-item-section>{{ item.text }}</q-item-section>
            </q-item>
          </q-list>
          <q-list separator v-else>
            <q-item v-for="(item, index) in listItemAdmin" :key="index" clickable @click="item.click">
              <q-item-section>{{ item.text }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>

      <q-layout class="px-30px py-10px">
        <q-page-container>
          <router-view/>
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addDeviceToken, getInfo } from 'src/api/user.api';
import { useAuthStore } from 'src/store/auth.store';
import { useCommonStore } from 'src/store/common.store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const authStore = useAuthStore();
const commonStore = useCommonStore();

const handleLogout = () => {
  authStore.logout();
  router.push({ name: 'LoginPage' });
}

const redirectTo = (name: string) => {
  router.push({ name });
};

const listItems = [
  {
    text: 'Profile',
    click: redirectTo.bind(null, 'ProfilePage')
  },
  {
    text: 'Change Password',
    click: redirectTo.bind(null, 'ChangePasswordPage')
  },
  {
    text: 'Balance Fluctuation',
    click: redirectTo.bind(null, 'WithdrawPage')
  },
  {
    text: 'Logout',
    click: handleLogout
  }
]

const listItemAdmin = [
  {
    text: 'Logout',
    click: handleLogout
  }
]

defineOptions({
  name: 'VMainLayout'
});

import { useFCM } from 'src/composables/useFCM'

const { requestPermission, onMessageListener } = useFCM()

const enableNotifications = async () => {
  const token = await requestPermission()
  if (token) {
    // Gửi token lên server của bạn
    console.log('FCM Token:', token)

    await addDeviceToken(token)
  }
}


onMounted(async () => {
  onMessageListener();
  enableNotifications();
  await getInfo();
})

</script>
