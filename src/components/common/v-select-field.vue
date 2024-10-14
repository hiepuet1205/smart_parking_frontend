<template>
  <div class="select-field">
    <label v-if="label" :for="id">{{ label }} <span v-if="required" class="text-red">*</span></label>
    <select :id="id" v-model="selected" @change="handleChange">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, onMounted } from 'vue';

interface Option {
  label: string;
  value: string | number;
}

const props = defineProps<{
  modelValue: string | number | null;
  options: Option[];
  label?: string;
  id?: string;
  required?: boolean
}>();

const emits = defineEmits(['update:modelValue']);

const selected = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  selected.value = newValue;
});

onMounted(() => {
  if (selected.value === null && props.options.length > 0) {
    selected.value = props.options[0].value;
    emits('update:modelValue', selected.value);
  }
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emits('update:modelValue', target.value);
};
</script>
