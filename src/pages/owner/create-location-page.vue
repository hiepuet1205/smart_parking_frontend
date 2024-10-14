<template>
  <q-page>
    <VBreadCrumbsField :lists="breadCrumbs" />
    <div class="bg-white rounded-borders">
      <div class="form clearfix">
        <VInputSingleImage 
          v-model="image"
          label="Image"
          id="input-image"
          :required="true"
        />
        <VInputField
          v-model="name"
          label="Name"
          id="input-name"
          placeholder="name"
          :required="true"
        />
        <div class="select-field">
          <label for="address">Address<span class="text-red">*</span></label>
          <input id="address" v-model.lazy="location" :placeholder="'address'" list="list-address"/>
          <datalist id="list-address">
            <option v-for="option in locationStore.getPredictLocations" :key="option.place_id" :value="option.description"></option>
          </datalist>
        </div>
        <q-btn no-caps class="btn1 float-right my-10px" @click="handleSubmit">
          Submit
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import VInputSingleImage from 'components/common/v-input-single-image.vue';
import VInputField from 'components/common/v-input-field.vue';
import VBreadCrumbsField from 'components/common/v-breadcrumbs.vue';
import { useLocationStore } from 'src/store/location.store';
import { createLocation, getListLocationByKeyword } from 'src/api/location.api';
import { useRouter } from 'vue-router';

const locationStore = useLocationStore();
const location = ref<string>('');

const breadCrumbs = ref(['Home', 'List Staff', 'Create New Staff']);

const name = ref<string | null>(null);
const image = ref<File | null>(null);
const router = useRouter();

const handleSubmit = async () => {
  if (!name.value || !image.value || !location.value) {
    return;
  }

  const placeId = locationStore.getPredictLocations.find((item) => item.description === location.value)?.place_id;

  if (!placeId) {
    return;
  }

  await createLocation(name.value, placeId, image.value);
  router.push({ name: 'ListLocationPage' });
};

watch(location, async (newValue) => {
  if (newValue) {
    const predictLocation = await getListLocationByKeyword(newValue);
    locationStore.setPredictLocations(predictLocation.predictions);
  }
})

onMounted(async () => {
  locationStore.setPredictLocations([]);
})
</script>
