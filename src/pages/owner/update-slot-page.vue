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
          :srcImg="slot?.image"
        />
        <VInputField
          v-model="extractLocation"
          label="extractLocation"
          id="input-extractLocation"
          placeholder="extractLocation"
          :required="true"
        />
        <VInputField
          v-model="priceHour"
          label="priceHour"
          id="input-priceHour"
          placeholder="priceHour"
          :required="true"
        />
        <VInputField
          v-model="emailCoUser"
          label="email Co-User"
          id="input-emailCoUser"
          placeholder="email co-user"
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
import { onMounted, ref, watch } from 'vue';
import VInputSingleImage from 'components/common/v-input-single-image.vue';
import VInputField from 'components/common/v-input-field.vue';
import VBreadCrumbsField from 'components/common/v-breadcrumbs.vue';
import { useRouter } from 'vue-router';
import { getDetailSlot, updateSlot } from 'src/api/slot.api';
import { useRoute } from 'vue-router';
import { Slot, User } from 'src/components/models';
import { getUser } from 'src/api/user.api';

const priceHour = ref<string>('');

const breadCrumbs = ref(['Home', 'List Location', 'List Slot', 'Update New Slot']);

const extractLocation = ref<string | null>(null);
const image = ref<File | null>(null);
const router = useRouter();
const route = useRoute();

const slot = ref<Slot | null>(null);
const emailCoUser = ref<string>('');
const coUser = ref<User>({} as User);

onMounted(async () => {
  slot.value = await getDetailSlot(Number(route.params.slotId));
  extractLocation.value = slot.value?.extractLocation || '';
  priceHour.value = (slot.value?.priceHour.toString()) || '';
})

const handleSubmit = async () => {
  if (!extractLocation.value || !priceHour.value || !coUser.value) {
    return;
  }

  await updateSlot(Number(route.params.slotId), extractLocation.value, Number(priceHour.value), image.value, coUser.value);
  router.push({ name: 'ListSlotPage' });
};

watch(emailCoUser, async (newValue) => {
  if (newValue) {
    coUser.value = await getUser(emailCoUser.value);
  }
})
</script>
