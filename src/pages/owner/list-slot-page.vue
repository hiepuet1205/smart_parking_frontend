<template>
  <q-page>
    <VBreadCrumbsField :lists="breadCrumbs" />
    <div class="bg-white rounded-borders">
      <div class="row">
        <div class="text-h6">{{ location }}</div>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="row p-16px">
            <div class="col-12">
              <VInputField
                v-model="keyword"
                label="Keyword"
                id="input-keyword"
                placeholder="keyword"
              />
            </div>
          </div>
        </div>
        <div class="col-1 relative-position">
          <q-btn no-caps class="search btn1" @click="handleSearch">
            Search
          </q-btn>
        </div>
      </div>

      <div class="row flex justify-end q-mr-lg">
        <q-btn no-caps class="btn2" :to="{ name: 'CreateSlotPage' }" tag="router-link">
          <q-icon name="fa-solid fa-circle-plus" class="q-pr-sm"/>
          Create
        </q-btn>
      </div>
    
      <div class="row q-col-gutter-lg px-32px py-16px">
        <div class="col-3" v-for="slot in slotStore.getSlots" :key="slot.id">
          <q-card v-ripple class="my-box cursor-pointer q-hoverable">
            <span class="q-focus-helper"></span>

            <div class="card-image">
              <img :src="slot.image">
            </div>

            <q-card-section class="flex justify-between">
              <div class="">
                <div class="text-h6">{{ slot.extractLocation }}</div>
                <div class="text-subtitle2">{{ slot.status }}</div>
                <div class="text-subtitle2">{{ slot.priceHour }}</div>
              </div>
              <q-btn no-caps class="btn1" tag="router-link" :to="{ name: 'UpdateSlotPage', params: { id: route.params.id, slotId: slot.id } }">
                <q-icon name="fa-solid fa-pen-to-square" class="q-pr-sm"/>
              </q-btn>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="page"
          :max="totalPages"
          input
          color="main"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VBreadCrumbsField from 'components/common/v-breadcrumbs.vue';
import VInputField from 'components/common/v-input-field.vue';
import { useSlotStore } from 'src/store/slot.store';
import { getSlotsByLocationId } from 'src/api/slot.api';
import { useRoute } from 'vue-router';
import { useLocationStore } from 'src/store/location.store';

const route = useRoute();

defineOptions({
  name: 'ListSlotPage',
});

const breadCrumbs = ref(['Home', 'List Location', 'List Slot']);

const locationStore = useLocationStore();
const slotStore = useSlotStore();

const location = ref<string>('');

onMounted(async () => {
  const data = await getSlotsByLocationId(Number(route.params.id));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slotStore.setSlots(data.map((slot: any) => {
    return {
      ...slot,
      status: slot.status === 'AVAILABLE' ? 'AVAILABLE' : 'UNAVAILABLE'
    }
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location.value = locationStore.getLocations.find((location: any) => location.id === Number(route.params.id))?.location || '';
})

const keyword = ref<string | null>(null);

const handleSearch = async () => {
  const data = await getSlotsByLocationId(Number(route.params.id), keyword.value);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slotStore.setSlots(data.map((slot: any) => {
    return {
      ...slot,
      status: slot.status === 'AVAILABLE' ? 'AVAILABLE' : 'UNAVAILABLE'
    }
  }));
};

const page = ref(1);
const totalPages = ref(1);
</script>
