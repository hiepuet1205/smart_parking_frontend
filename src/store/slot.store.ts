import { defineStore } from 'pinia'
import { } from 'pinia-plugin-persistedstate';
import { Meta, Slot } from 'src/components/models';

export const useSlotStore = defineStore({
  id: 'slot-store',
  state: () => {
    return {
      slots: [] as Slot[],
      meta: {} as Meta
    }
  },
  actions: {
    setSlots(slots: Slot[]) {
      this.slots = slots;
    },
    setMeta(meta: Meta) {
      this.meta = meta
    },
    setImageSlot(id: number, image: string) {
      this.slots = this.slots.map(slot => {
        if (slot.id === id) {
          slot.image = image
        }
        return slot
      })
    }
  },
  getters: {
    getSlots: state => state.slots,
    getMeta: state => state.meta
  },
  persist: true
})
