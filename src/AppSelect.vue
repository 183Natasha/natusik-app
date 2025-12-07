<script setup>
const props = defineProps({
  id: Number,
  type: String,
  label: String,
  modelValue: String,
  options: Array,
  placeholder: String,
  error: String,
  required: Boolean,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="form-control" :class="{ inValid: error }">
    <div class="question-label">{{ label }}</div>
    <small v-if="error" class="inValid">{{ error }}</small>
    <div>
      <select
        :id="props.id"
        :value="modelValue"
        @change="emit('update:modelValue', $event.target.value)"
        :required="required"
      >
        <option value="" disabled selected>
          {{ placeholder || "-- Выберите --" }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<style>
</style>