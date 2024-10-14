<template>
  <div class="input-single-image">
    <p>{{ label }}</p>
    <label :for="id" className="custom-file-upload">
      <div className="img-wrap img-upload" >
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

const src = ref('https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true');

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
