<script setup>
const props = defineProps({
  id: Number,
  type: String,
  label: String,
  modelValue: String,
  placeholder: String,
  required: Boolean,
  error: String, 
});

const emit = defineEmits(['update:modelValue']);

const updateInput = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<template>
  <div class="form-control" :class="{ 'is-invalid': error }">
    <label :for="props.id"> {{ label }}</label>

    <input
      :type="type"
      :id="props.id"
      :value="modelValue"
      @input="updateInput"
      :placeholder="placeholder"
      :required="required"
    />
    <small v-if="error" class="error-text">{{ error }}</small>
  </div>
</template>

<style>
</style>
