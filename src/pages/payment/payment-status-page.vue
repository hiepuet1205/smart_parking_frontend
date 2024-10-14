<template>
  <div class="container">
    <div v-if="vnpResponseCode === '00'" class="row justify-center">
      <div class="col-md-5">
        <div class="message-box _success">
          <i class="fa fa-check-circle" aria-hidden="true"></i>
          <h2>Your payment was successful</h2>
          <p>Thank you for your payment. We will <br> be in contact with more details shortly.</p>
        </div>
      </div>
    </div>
    
    <div v-else class="row justify-center">
      <div class="col-md-5">
        <div class="message-box _success _failed">
          <i class="fa fa-times-circle" aria-hidden="true"></i>
          <h2>Your payment failed</h2>
          <p>Try again later</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.query)

const vnpResponseCode = ref(route.query.vnp_ResponseCode)

</script>

<style scoped>
._failed {
  border-bottom: solid 4px red !important;
}
._failed i {
  color: red !important;
}
._success {
  box-shadow: 0 15px 25px #00000019;
  padding: 45px;
  width: 100%;
  text-align: center;
  margin: 40px auto;
  border-bottom: solid 4px #28a745;
}
._success i {
  font-size: 55px;
  color: #28a745;
}
._success h2 {
  margin-bottom: 12px;
  font-size: 40px;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 10px;
}
._success p {
  margin-bottom: 0px;
  font-size: 18px;
  color: #495057;
  font-weight: 500;
}
</style>
