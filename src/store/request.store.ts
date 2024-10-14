import { defineStore } from 'pinia'
import { } from 'pinia-plugin-persistedstate';
import { Meta, RentRequest } from 'src/components/models';

export const useRequestStore = defineStore({
  id: 'request-store',
  state: () => {
    return {
      requests: [] as RentRequest[],
      meta: {} as Meta
    }
  },
  actions: {
    setRequests(requests: RentRequest[]) {
      this.requests = requests;
    },
    setMeta(meta: Meta) {
      this.meta = meta
    }
  },
  getters: {
    getRequests: state => state.requests,
    getMeta: state => state.meta
  },
  persist: true
})
