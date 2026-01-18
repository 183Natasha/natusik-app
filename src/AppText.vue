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

const emit = defineEmits(["update:modelValue"]);

const updateInput = (event) => {
  const trimmedValue = event.target.value.trim();
  emit("update:modelValue", trimmedValue);
};
</script>

<template>
  <div class="form-control" :class="{ inValid: error }">
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
.form-control small {
  color: var(--pink-accent-1);
}
.form-control.inValid input {
  border-color: var(--dark-mint);
  background-color: var(--light-mint);
}

label {
  display: block;
  margin-bottom: 8px; /* Отступ между label и input */
  font-weight: 500;
  color: var(--pink-accent-1)
}

</style>
