<template>
  <q-page>
    <VBreadCrumbsField :lists="breadCrumbs" />
    <div class="bg-white rounded-borders">
      <div class="form clearfix">
        <VInputSingleImageCir
          v-model="image"
          label="Image"
          id="input-image"
          :required="true"
        />
        <VInputField
          v-model="extractLocation"
          label="Extract Location"
          id="input-extractLocation"
          placeholder="Extract Location"
          :required="true"
        />
        <VInputField
          v-model="priceHour"
          label="Hourly Rate"
          id="input-priceHour"
          placeholder="Hourly Rate"
          :required="true"
        />
        <q-btn no-caps class="btn1 float-right my-10px" @click="handleSubmit">
          Submit
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VInputField from 'components/common/v-input-field.vue';
import VBreadCrumbsField from 'components/common/v-breadcrumbs.vue';
import { useRouter } from 'vue-router';
import { createSlot } from 'src/api/slot.api';
import { useRoute } from 'vue-router';
import VInputSingleImageCir from 'src/components/common/v-input-single-image-cir.vue';

const priceHour = ref<string>('');

const breadCrumbs = ref(['Home', 'List Location', 'List Slot', 'Create New Slot']);

const extractLocation = ref<string | null>(null);
const image = ref<File | null>(null);
const router = useRouter();
const route = useRoute();

const handleSubmit = async () => {
  if (!extractLocation.value || !image.value || !priceHour.value) {
    return;
  }

  await createSlot(extractLocation.value, Number(priceHour.value), image.value, Number(route.params.id));
  router.push({ name: 'ListSlotPage' });
};
</script>
