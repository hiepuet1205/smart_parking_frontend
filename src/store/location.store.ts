import { defineStore } from 'pinia'
import { } from 'pinia-plugin-persistedstate';
import { Meta, Location, PredictLocation } from 'src/components/models';

export const useLocationStore = defineStore({
  id: 'location-store',
  state: () => {
    return {
      locations: [] as Location[],
      predictLocations: [] as PredictLocation[],
      meta: {} as Meta
    }
  },
  actions: {
    setLocations(locations: Location[]) {
      this.locations = locations;
    },
    setPredictLocations(predictLocations: PredictLocation[]) {
      this.predictLocations = predictLocations;
    },
    setMeta(meta: Meta) {
      this.meta = meta
    },
  },
  getters: {
    getLocations: state => state.locations,
    getPredictLocations: state => state.predictLocations,
    getMeta: state => state.meta
  },
  persist: true
})
