import { defineStore } from 'pinia'
import { } from 'pinia-plugin-persistedstate';

export const useCommonStore = defineStore({
  id: 'common-store',
  state: () => {
    return {
      title: ''
    }
  },
  actions: {
    setTitle(title: string) {
      this.title = title;
    }
  },
  getters: {
    getTitle: state => state.title,
  },
  persist: true
})
