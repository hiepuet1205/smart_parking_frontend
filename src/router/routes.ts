const routes = [
  {
    path: '/admin',
    component: () => import('layouts/v-main-layout.vue'),
    children: [
      { path: 'list-user', name: 'AdminListUserPage', component: () => import('pages/admin/list-user-page.vue') },
      { path: 'create-user', name: 'AdminCreateUserPage', component: () => import('pages/admin/create-user-page.vue') },
      { path: 'reset-password-user/:userId', name: 'AdminResetPasswordUser', component: () => import('pages/admin/reset-password-user-page.vue') },
      { path: 'location', name: 'AdminListLocationPage', component: () => import('pages/admin/list-location-page.vue') },
      { path: 'location/:id/slot', name: 'AdminListSlotPage', component: () => import('pages/admin/list-slot-page.vue') },
      { path: 'list-request', name: 'AdminListRequestPage', component: () => import('pages/admin/list-request-page.vue') },
    ]
  },
  {
    path: '/owner_parking_lot',
    component: () => import('layouts/v-main-layout.vue'),
    children: [
      { path: 'location', name: 'ListLocationPage', component: () => import('pages/owner/list-location-page.vue') },
      { path: 'location/create', name: 'CreateLocationPage', component: () => import('src/pages/owner/create-location-page.vue') },
      { path: 'location/:id/slot', name: 'ListSlotPage', component: () => import('src/pages/owner/list-slot-page.vue') },
      { path: 'location/:id/slot/create', name: 'CreateSlotPage', component: () => import('src/pages/owner/create-slot-page.vue') },
      { path: 'location/:id/slot/:slotId', name: 'UpdateSlotPage', component: () => import('src/pages/owner/update-slot-page.vue') },
    ]
  },
  {
    path: '/owner_parking_slot',
    component: () => import('layouts/v-main-layout.vue'),
    children: [
      { path: 'slot', name: 'ListSlotCoUserPage', component: () => import('src/pages/couser/list-slot-page.vue') },
      { path: 'slot/:slotId', name: 'UpdateCoUserSlotPage', component: () => import('src/pages/couser/update-slot-page.vue') },
    ]
  },
  {
    path: '/app',
    component: () => import('layouts/v-main-layout.vue'),
    children: [
      { path: 'list-request', name: 'ListRequestPage', component: () => import('src/pages/list-request-page.vue') },
    ]
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('pages/register-page.vue'),
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('pages/login-page.vue'),
  },
  {
    path: '/payment-status',
    name: 'PaymentStatusPage',
    component: () => import('pages/payment/payment-status-page.vue'),
  },
  {
    path: '/',
    name: 'HomePage',
    component: () => import('layouts/v-main-layout.vue'),
    children: [
      { path: 'profile', name: 'ProfilePage', component: () => import('src/pages/profile-page.vue') },
      { path: 'change-password', name: 'ChangePasswordPage', component: () => import('src/pages/change-password-page.vue') },
      { path: 'withdraw', name: 'WithdrawPage', component: () => import('src/pages/balance-fluctuation-page.vue') },
      { path: 'create-withdraw', name: 'CreateWithdrawRequestPage', component: () => import('src/pages/create-withdraw-page.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
