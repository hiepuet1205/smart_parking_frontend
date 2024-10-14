<template>
  <div class="input-field">
    <label v-if="label" :for="id">{{ label }} <span v-if="required" class="text-red">*</span></label>
    <input :id="id" v-model="model" :type="type" :placeholder="placeholder" @change="handleChange" @blur="handleBlur" :disabled="disabled"/>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string | number | null;
  label?: string;
  id?: string;
  placeholder?: string
  required?: boolean
  type?: string
  disabled?: boolean
}>();

const emits = defineEmits(['update:modelValue']);

const model = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  model.value = newValue;
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emits('update:modelValue', target.value);
};

const handleBlur = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emits('update:modelValue', target.value);
};
</script>
