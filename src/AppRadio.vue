<script setup>
const props = defineProps({
  id: Number,
  type: String,
  label: String,
  modelValue: String,
  options: Array,
  error: String,
  required: Boolean,
  sublabels: Array,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="form-control" :class="{ inValid: error }">
    <div class="question-label">{{ label }}</div>

    <div v-if="sublabels" class="sublabels">
      <div v-for="(sublabel, index) in sublabels" :key="index">
        {{ sublabel }}
      </div>
    </div>
    
    <small v-if="error" class="inValid">{{ error }}</small>
    <div v-for="option in options" :key="option.value" class="radio-option">
      <label>
        <input
          type="radio"
          :name="label"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="emit('update:modelValue', option.value)"
          :required="required"
        />
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<style  >
.form-control {
  margin-bottom: 20px; /* Отступ снизу */
}

.question-label {
  display: block;
  margin-bottom: 8px; /* Отступ между label и input */
  font-weight: 500;
  color: var(--pink-accent-1)
}

.label{
  color: #f48fb1
}
.radio-option {
  accent-color: var(--mint-green);
}
.radio-option :hover {
  accent-color: #3c8e40;
}

small {
  color: #f48fb1;
  font-size: 14px;
  margin-top: 5px;
  display: block;
}

/* Темная тема */
.dark-theme .radio-option{
  accent-color: var(--check); 
}

.dark-theme .radio-option :hover {
  accent-color: #0c44c8; 
}
</style>