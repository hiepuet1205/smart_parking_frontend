import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { useAuthStore } from 'src/store/auth.store';
import { PageRoles, UserRole } from 'src/components/models';

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const publicPages = ['LoginPage', 'HomePage', 'RegisterPage', 'PaymentStatusPage'];

    const pages: PageRoles = {
      ListSlotPage: [UserRole.OWNER_PARKING_LOT, UserRole.ADMIN],
    }

    if (to.name && !publicPages.includes(to.name as string) && !authStore.getIsAuthenticated) {
      next({ name: 'LoginPage' });
    } else if (pages[to.name as string] && !pages[to.name as string].includes(authStore.getRole as UserRole)) {
      next({ name: 'HomePage' });
    } else {
      next();
    }
  })

  return Router;
});
