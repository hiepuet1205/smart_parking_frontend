import { defineStore } from 'pinia'
import { } from 'pinia-plugin-persistedstate';
import { Cookies } from 'quasar'
import { InfoResponseData } from 'src/components/models';
import { menuList } from 'src/constants/menu-list.constant';

export const useAuthStore = defineStore({
  id: 'auth-store',
  state: () => {
    return {
      isAuthenticated: false,
      info: {} as InfoResponseData,
    }
  },
  actions: {
    setIsAuthenticated() {
      this.isAuthenticated = true;
    },
    setInfo(info: InfoResponseData) {
      this.info = info;
    },
    logout() {
      Cookies.remove('accessToken', { path: '/' });
      Cookies.remove('refreshToken', { path: '/' });

      this.isAuthenticated = false;
      this.info = {} as InfoResponseData;
    }
  },
  getters: {
    getIsAuthenticated: state => state.isAuthenticated,
    getInfo: state => state.info,
    getRole: state => state.info.role,
    getMenuList: state => state.info.role ? menuList[state.info.role.toLowerCase() as keyof typeof menuList] : [],
  },
  persist: true
})
