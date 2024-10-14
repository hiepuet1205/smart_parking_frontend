<template>
  <q-page padding class="text-black">
    <div class="row q-col-gutter-lg">
      <div class="col-4">
        <q-card>
          <q-card-section class="flex flex-center column">
            <q-avatar class="h-100px w-100px">
              <img :src="userData.avatar" />
            </q-avatar>
            <div class="text-h6 text-center">{{ userData.name }}</div>
            <div class="text-subtitle2 text-center">{{ userData.email }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-8">
        <div class="row q-col-gutter-lg">
          <div class="col-4">
            <q-card>
              <q-card-section>
                <div class="text-h6 text-center">{{ Intl.NumberFormat('vi-VN').format(userData.totalEarning || 0) }} đ</div>
                <div class="text-subtitle2 text-center">Total Earning</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-4">
            <q-card>
              <q-card-section>
                <div class="text-h6 text-center">{{ Intl.NumberFormat('vi-VN').format(userData.totalAmountWithdraw || 0) }} đ</div>
                <div class="text-subtitle2 text-center">Total Withdraw</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-4">
            <q-card>
              <q-card-section>
                <div class="text-h6 text-center">{{ Intl.NumberFormat('vi-VN').format(userData.total || 0) }} đ</div>
                <div class="text-subtitle2 text-center">Total</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <q-card class="q-mt-lg">
          <q-card-section>
            <div class="card-header">
              <p>Profile</p>
            </div>
            <div class="card-body">
              <div class="form-group row">
                <VInputField
                  v-model="userData.name"
                  label="Name"
                  id="input-name"
                  :required="true"
                  :disabled="true"
                />
              </div>
              <div class="form-group row">
                <VInputField
                  v-model="userData.email"
                  label="Email"
                  id="input-email"
                  :required="true"
                  :disabled="true"
                />
              </div>
              <div class="form-group row">
                <VSelectField
                  v-model="bankCode"
                  :options="bankOptions"
                  label="Bank"
                  id="Bank"
                />
              </div>
              <div class="form-group row">
                <VInputField
                  v-model="accountName"
                  label="Account Name"
                  id="input-Account-Name"
                  :required="true"
                />
              </div>
              <div class="form-group row">
                <VInputField
                  v-model="accountNo"
                  label="Account Number"
                  id="input-Account-Number"
                  :required="true"
                />
              </div>
              <div class="form-group row">
                <VSelectField
                  v-model="type"
                  :options="typeOptions"
                  label="Type"
                  id="Type"
                />
              </div>
            </div>
            <div class="">
              <q-btn no-caps class="btn1" @click="handleSaveChange">
                Save changes
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { QPage } from 'quasar';
import { useAuthStore } from 'src/store/auth.store';
import { ref } from 'vue';
import VInputField from 'src/components/common/v-input-field.vue';
import VSelectField from 'src/components/common/v-select-field.vue';
import { addPayment } from 'src/api/user.api';

const bankOptions = ref([
    { label: 'Ngân hàng thương mại Cổ phần Ngoại thương Việt Nam', value: 'VCB' },
    { label: 'Ngân hàng thương mại Cổ phần kỹ thương Việt Nam', value: 'TECHCOMBANK' },
    { label: 'Ngân hàng thương mại Cổ phần Tiên Phong', value: 'TPBANK' },
    { label: 'Ngân hàng Thương mại cổ phần Công Thương Việt Nam', value: 'VIETINBANK' },
    { label: 'Ngân Hàng Quốc Tế VIB', value: 'VIB' },
    { label: 'Ngân hàng TMCP Đông Á', value: 'DAB' },
    { label: 'Ngân hàng thương mại cổ phần Phát triển Thành phố Hồ Chí Minh', value: 'HDBANK' },
    { label: 'Ngân hàng thương mại cổ phần Quân đội', value: 'MB' },
    { label: 'Ngân hàng thương mại CP Việt Á', value: 'VIETABANK' },
    { label: 'Ngân hàng thương mại cổ phần Hàng hải Việt Nam', value: 'MARITIMEBANK' },
    { label: 'Ngân hàng thương mại cổ phần Xuất Nhập Khẩu Việt Nam', value: 'EXIMBANK' },
    { label: 'Ngân hàng TMCP Sài Gòn - Hà Nội', value: 'SHB' },
    { label: 'Ngân hàng TMCP Việt Nam Thịnh Vượng', value: 'VPBANK' },
    { label: 'Ngân hàng Thương mại Cổ phần An Bình', value: 'ABBANK' },
    { label: 'Ngân hàng thương mại cổ phần Sài Gòn Thương Tín', value: 'SACOMBANK' },
    { label: 'Ngân hàng TMCP Nam Á', value: 'NAMABANK' },
    { label: 'Ngân hàng Đại Dương', value: 'OCEANBANK' },
    { label: 'Ngân hàng Đầu tư và Phát triển Việt Nam', value: 'BIDV' },
    { label: 'Ngân hàng TMCP Đông Nam Á', value: 'SEABANK' },
    { label: 'Ngân hàng Bắc A', value: 'BACA' },
    { label: 'Ngân hàng Quốc Dân', value: 'NCB' },
    { label: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam', value: 'AGRIBANK' },
    { label: 'Ngân hàng thương mại cổ phần Sài Gòn Công Thương', value: 'SAIGONBANK' },
    { label: 'Ngân hàng TMCP Đại Chúng Việt Nam', value: 'PVBANK' },
    { label: 'Ngân hàng thương mại cổ phần Á Châu', value: 'ACB' },
    { label: 'Ngân hàng thương mại cổ phần Bưu điện Liên Việt', value: 'LPB' },
    { label: 'Ngân hàng TMCP Bảo Việt', value: 'BVBANK' },
    { label: 'Ngân hàng TMCP Phương Đông', value: 'OCB' },
    { label: 'Ngân hàng TMCP Kiên Long', value: 'KIENLONGBANK' },
    { label: 'Ngân hàng Liên Doanh Việt Nga', value: 'VRB' },
    { label: 'Ngân hàng Public Bank', value: 'PBVN' },
    { label: 'Ngân hàng TMCP Xăng Dầu Petrolimex', value: 'PGBANK' },
    { label: 'Ngân hàng TMCP Dầu Khí Toàn Cầu', value: 'GPBANK' },
    { label: 'Ngân hàng TMCP Sài Gòn', value: 'SCB' },
    { label: 'Ngân hàng Wooribank', value: 'WOORIBANK' },
    { label: 'Ngân hàng TMCP Bản Việt', value: 'VIETCAPITALBANK' },
    { label: 'Ngân hàng TNHH MTV United Overseas Bank', value: 'UOB' },
    { label: 'Ngân hàng TNHH Indovina', value: 'IVB' },
    { label: 'Ngân hàng TNHH MTV Shinhan Việt Nam', value: 'SHINHAN' },
    { label: 'Ngân hàng hợp tác Co-opBank', value: 'COOPBANK' },
    { label: 'Ngân hàng TMCP Việt Nam Thương Tín', value: 'VIETBANK' },
    { label: 'Ngân hàng TNHH MTV Hongleong Việt Nam', value: 'HONGLEONG' },
    { label: 'Ngân hàng số LioBank', value: 'LIOBANK' },
    { label: 'Ngân hàng Xây dựng Việt Nam', value: 'CBBANK' },
    { label: 'Ngân hàng HSBC Việt Nam', value: 'HSBC' },
    { label: 'Ngân hàng CIMB Việt Nam', value: 'CIMB' },
    { label: 'Ngân hàng Kookmin - Chi nhánh Hà Nội', value: 'KBHN' },
    { label: 'Ngân hàng DBS - Chi nhánh TP. Hồ Chí Minh', value: 'DBS' },
    { label: 'Ngân hàng Kookmin - Chi nhánh TP. Hồ Chí Minh', value: 'KBHCM' },
    { label: 'Ngân hàng số Umee - Kiên Long Bank', value: 'UMEE' },
    { label: 'Ngân hàng Nonghyup - Chi nhánh Hà Nội', value: 'NHB' },
    { label: 'Ngân hàng Đại chúng Kasikornbank - Chi nhánh TP. Hồ Chí Minh', value: 'KBANK' },
    { label: 'Ngân hàng TNHH MTV Standard Chartered Việt Nam', value: 'SCVN' },
    { label: 'Ngân hàng số Timo - Bản Việt Bank', value: 'TIMO' },
    { label: 'Ngân hàng Keb Hana - Chi nhánh TP. Hồ Chí Minh', value: 'KEBHCM' },
    { label: 'Ngân hàng số Cake - VPBank', value: 'CAKE' },
    { label: 'Ngân hàng Citibank - Chi nhánh Hà Nội', value: 'CITIBANK' },
    { label: 'Ngân hàng số UBank - VPBank', value: 'UBANK' },
    { label: 'Ngân hàng BNP Paribas - Chi nhánh Hà Nội', value: 'BNPHN' },
    { label: 'Ngân hàng Keb Hana - Chi nhánh Hà Nội', value: 'KEBHN' },
    { label: 'Ngân hàng BNP Paribas - Chi nhánh TP. Hồ Chí Minh', value: 'BNPHCM' },
    { label: 'Ngân hàng Cathay United Bank - Chi nhánh TP. Hồ Chí Minh', value: 'CUBHCM' },
    { label: 'Ngân hàng Đầu tư và Phát triển Campuchia - Chi nhánh Hà Nội', value: 'BIDC' }
]);

const typeOptions = ref([
  { label: 'CARD', value: 'card' },
  { label: 'ACCOUNT', value: 'account' },
]);

const authStore = useAuthStore();

const userData = ref(authStore.getInfo);

const bankCode = ref(authStore.getInfo.payment?.bankCode || 'VCB')
const type = ref(authStore.getInfo.payment?.accountType || 'CARD')
const accountName = ref(authStore.getInfo.payment?.accountName || '')
const accountNo = ref(authStore.getInfo.payment?.accountNo || '')

const handleSaveChange = async () => {
  await addPayment({
    bankCode: bankCode.value,
    accountNo: accountNo.value,
    accountName: accountName.value,
    accountType: type.value
  });
}

</script>

<style scoped>
.bg-dark {
  background-color: #1e1e1e;
}
</style>
