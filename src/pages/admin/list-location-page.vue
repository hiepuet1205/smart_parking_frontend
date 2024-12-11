<template>
  <q-page>
    <VBreadCrumbsField :lists="breadCrumbs" />
    <div class="bg-white rounded-borders">
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
    
      <div class="row q-col-gutter-lg px-32px py-16px">
        <div class="col-3" v-for="location in locationStore.getLocations" :key="location.id" >
          <q-card v-ripple class="my-box cursor-pointer q-hoverable">
            <span class="q-focus-helper"></span>

            <router-link :to="{ name: 'AdminListSlotPage', params: { id: location.id } }">
              <div class="card-image">
                <img :src="location.image" />
              </div>
            </router-link>

            <q-card-section class="flex justify-between">
              <div class="">
                <div class="text-h6">{{ location.name }}</div>
                <div class="text-subtitle2">{{ location.location }}</div>
              </div>
              <!-- <q-btn no-caps class="btn1" @click="handleDelete(location.id)">
                <q-icon name="fa-solid fa-trash" class="q-pr-sm"/>
              </q-btn> -->
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
import { getAllLocation } from 'src/api/location.api';
import { useLocationStore } from 'src/store/location.store';

defineOptions({
  name: 'ListLocationPage',
});

const breadCrumbs = ref(['Home', 'List Location']);

const locationStore = useLocationStore();

onMounted(async () => {
  const data = await getAllLocation();

  locationStore.setLocations(data);
})

const keyword = ref<string | null>(null);

const handleSearch = async () => {
  if (keyword.value) {
    const data = await getAllLocation();
  
    locationStore.setLocations(data);
  }
};

const page = ref(1);
const totalPages = ref(1);
</script>
