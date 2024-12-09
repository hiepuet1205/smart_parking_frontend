<template>
  <div class="input-single-image">
    <p>{{ label }}</p>
    <label :for="id" className="custom-file-upload-cir">
      <div className="img-wrap-cir img-upload-cir" >
        <img :for="id" :src="srcImg || src"/>
      </div>
      <input :id="id" type="file" @change="onChange" class="hidden"/> 
    </label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

defineProps<{
  modelValue: File | null;
  label?: string;
  id?: string;
  required?: boolean
  srcImg?: string
}>();

const src = ref('https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg');

const emits = defineEmits(['update:modelValue']);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onChange = (event: any) => {
  event.preventDefault();
  const reader = new FileReader();
  const file = event.target.files[0];
  reader.onloadend = () => {
    src.value = reader.result as string;
  }
  reader.readAsDataURL(file);

  emits('update:modelValue', file);
};

</script>
