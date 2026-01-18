<script setup>
const props = defineProps({
  id: Number,
  type: String,
  label: String,
  modelValue: Array,
  options: Array,
  error: String,
  required: Boolean,
});

const emit = defineEmits(["update:modelValue"]);
const updateValue = (optionValue, isChecked) => {
  const currentValue = props.modelValue || [];
  let newValue;

  if (isChecked) {
    newValue = [...currentValue, optionValue];
  } else {
    newValue = currentValue.filter((val) => val !== optionValue);
  }

  emit("update:modelValue", newValue);
};
</script>

<template>
  <div class="form-control" :class="{ inValid: error }">
    <div class="question-label">{{ label }}</div>
    <small v-if="error" class="inValid">{{ error }}</small>
    <div v-for="option in options" :key="option.value" class="checkbox-option">
      <label>
        <input
          type="checkbox"
          :value="option.value"
          :checked="modelValue && modelValue.includes(option.value)"
          @change="updateValue(option.value, $event.target.checked)"
        />
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<style>
.form-control small {
  color: var(--pink-accent-1);
  text-decoration: underline;
}
.form-control.inValid input {
  border-color: var(--pink-accent-1);
}
.checkbox-option {
  accent-color: var(--mint-green); 
}

.checkbox-option :hover {
  accent-color: #3c8e40;
}

/* Темная тема */
.dark-theme .checkbox-option {
  accent-color: var(--check); 
  /* Changes the color to green when checked */
}

.dark-theme .checkbox-option :hover {
  accent-color: #0c44c8; 
}
</style>