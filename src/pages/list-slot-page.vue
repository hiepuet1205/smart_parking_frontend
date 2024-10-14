<template>
  <q-page>
    <VBreadCrumbsField :lists="breadCrumbs" />
    <div class="bg-white rounded-borders">
      <div class="row">
        <div class="col-8">
          <div class="row p-16px">
            <div class="col-6">
              <VInputField
                v-model="keyword"
                label="Keyword"
                id="input-keyword"
                placeholder="keyword"
              />
            </div>

            <div class="col-6">
              <VSelectField
                v-model="status"
                :options="statusOptions"
                label="Slot"
                id="slot"
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
    
      <div class="row q-col-gutter-lg px-32px py-16px">
        <div class="col-3" v-for="slot in slotStore.getSlots" :key="slot.id" @mouseenter="hoverSlot(slot.id, true)" @mouseleave="hoverSlot(slot.id, false)">
          <q-card v-ripple class="my-box cursor-pointer q-hoverable">
            <span class="q-focus-helper"></span>

            <div class="card-image">
              <q-btn v-if="hoveredSlotId === slot.id" no-caps @click="handleViewActualSlot(slot.id)">
                 <q-icon name="search" size="60px" class="font-bold text-white"></q-icon> 
              </q-btn>
              <img v-else :src="slot.image">
            </div>

            <q-card-section>
              <div class="text-h6">{{ slot.extractLocation }}</div>
              <div class="text-subtitle2">{{ slot.status }}</div>
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
import VSelectField from 'components/common/v-select-field.vue';
import VBreadCrumbsField from 'components/common/v-breadcrumbs.vue';
import { useSlotStore } from 'src/store/slot.store';
import { getAllSlot, viewActualSlot } from 'src/api/slot.api';
import VInputField from 'components/common/v-input-field.vue';

defineOptions({
  name: 'ListSlotPage',
});

const breadCrumbs = ref(['Home', 'List Slot']);

const slotStore = useSlotStore();

onMounted(async () => {
  await getAllSlot();
})

const keyword = ref<string | null>(null);
const status = ref<string | null>(null);

const statusOptions = ref([
  { label: 'Available', value: 'AVAILABLE' },
  { label: 'Booked', value: 'BOOKED' },
  { label: 'Unavailable', value: 'UNAVAILABLE' },
]);

const handleSearch = async () => {
  await getAllSlot(keyword.value, status.value);
};

const handleViewActualSlot = async (id: number) => {
  const image = await viewActualSlot(id);
  slotStore.setImageSlot(id, image);
}

const page = ref(1);
const totalPages = ref(1);
const hoveredSlotId = ref<number | null>(null);

const hoverSlot = (id: number, isHovering: boolean) => {
  hoveredSlotId.value = isHovering ? id : null;
}
</script>
