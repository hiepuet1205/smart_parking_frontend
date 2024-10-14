import { defineStore } from 'pinia'
import { } from 'pinia-plugin-persistedstate';
import { Meta, User } from 'src/components/models';

export const useStaffStore = defineStore({
  id: 'staff-store',
  state: () => {
    return {
      staffs: [] as User[],
      meta: {} as Meta
    }
  },
  actions: {
    setStaffs(staffs: User[]) {
      this.staffs = staffs;
    },
    setMeta(meta: Meta) {
      this.meta = meta
    }
  },
  getters: {
    getStaffs: state => state.staffs,
    getMeta: state => state.meta
  },
  persist: true
})
