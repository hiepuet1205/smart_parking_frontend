<template>
  <q-page>
    <VBreadCrumbsField :lists="breadCrumbs" />
    <div class="bg-white rounded-borders">
      <div class="form clearfix">
        <VInputField
          v-model="bankCode"
          label="Bank"
          id="input-Bank"
          :required="true"
          :disabled="true"
        />
        <VInputField
          v-model="accountName"
          label="Account Name"
          id="input-Account-Name"
          :required="true"
          :disabled="true"
        />
        <VInputField
          v-model="accountNo"
          label="Account Number"
          id="input-Account-Number"
          :required="true"
          :disabled="true"
        />
        <VInputField
          v-model="type"
          label="Type"
          id="Type"
          :required="true"
          :disabled="true"
        />
        <VInputField
          v-model="amount"
          label="Amount"
          id="input-amount"
          placeholder="Amount"
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
import { useAuthStore } from 'src/store/auth.store';
import { makeWithdrawRequest } from 'src/api/user.api';

const breadCrumbs = ref(['Home', 'Make Request Withdrawal']);

const amount = ref<string>('');

const authStore = useAuthStore();

const bankCode = ref(authStore.getInfo.payment?.bankCode || 'VCB')
const type = ref(authStore.getInfo.payment?.accountType || 'CARD')
const accountName = ref(authStore.getInfo.payment?.accountName || '')
const accountNo = ref(authStore.getInfo.payment?.accountNo || '')
const router = useRouter();

const handleSubmit = async () => {
  if (!amount.value) {
    return;
  }

  await makeWithdrawRequest({
    amount: Number(amount.value)
  });

  router.push({ name: 'WithdrawPage' });
};
</script>
