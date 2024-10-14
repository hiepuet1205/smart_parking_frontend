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

      <div class="row flex justify-end q-mr-lg">
        <q-btn no-caps class="btn2" :to="{ name: 'CreateLocationPage' }" tag="router-link">
          <q-icon name="fa-solid fa-circle-plus" class="q-pr-sm"/>
          Create
        </q-btn>
      </div>
    
      <div class="row q-col-gutter-lg px-32px py-16px">
        <div class="col-3" v-for="location in locationStore.getLocations" :key="location.id" >
          <q-card v-ripple class="my-box cursor-pointer q-hoverable">
            <span class="q-focus-helper"></span>

            <router-link :to="{ name: 'ListSlotPage', params: { id: location.id } }">
              <div class="card-image">
                <img :src="location.image" />
              </div>
            </router-link>

            <q-card-section class="flex justify-between">
              <div class="">
                <div class="text-h6">{{ location.name }}</div>
                <div class="text-subtitle2">{{ location.location }}</div>
              </div>
              <q-btn no-caps class="btn1" @click="handleDelete(location.id)">
                <q-icon name="fa-solid fa-trash" class="q-pr-sm"/>
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
import { deleteLocation, getAllLocationOfUser } from 'src/api/location.api';
import { useLocationStore } from 'src/store/location.store';

defineOptions({
  name: 'ListLocationPage',
});

const breadCrumbs = ref(['Home', 'List Location']);

const locationStore = useLocationStore();

onMounted(async () => {
  const data = await getAllLocationOfUser();

  locationStore.setLocations(data);
})

const keyword = ref<string | null>(null);

const handleSearch = async () => {
  if (keyword.value) {
    const data = await getAllLocationOfUser(keyword.value);
  
    locationStore.setLocations(data);
  }
};

const page = ref(1);
const totalPages = ref(1);

const handleDelete = async (id: number) => {
  await deleteLocation(id);

  const data = await getAllLocationOfUser();

  locationStore.setLocations(data);
}
</script>
