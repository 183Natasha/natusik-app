<script setup>
const props = defineProps({
  id: String, 
  modelValue: String,
  label: String,
  error: String,
  required: Boolean,
});

const emit = defineEmits(["update:modelValue"]);
const updateInput = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div class="form-control" :class="{ 'has-error': error }">
    <label :for="id">{{ label }}</label>

    <input
      type="date"
      :id="props.id"
      :value="modelValue"
      @input="updateInput"
      :required="required"
    />

    <small v-if="error" class="error-text">{{ error }}</small>
  </div>
</template>
<style>
</style>