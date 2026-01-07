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
/* .form-control small {
  color: red;
}
.form-control.inValid input {
  border-color: red;
} */

.form-control {
  margin-bottom: 20px; /* Отступ снизу */
}

.question-label {
  display: block;
  margin-bottom: 8px; /* Отступ между label и input */
  font-weight: 500;
  color: #5d4037; /* Цвет из вашей палитры */
}

.label{
  color: #f48fb1
}

small {
  color: #f48fb1;
  font-size: 14px;
  margin-top: 5px;
  display: block;
}
</style>