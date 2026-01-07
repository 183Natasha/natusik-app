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
      class="date-input" 
    />

    <small v-if="error" class="error-text">{{ error }}</small>
  </div>
</template>
<style scoped>
.form-control {
  margin-bottom: 20px; /* Отступ снизу */
}

label {
  display: block;
  margin-bottom: 8px; /* Отступ между label и input */
  font-weight: 500;
  color: #5d4037; /* Цвет из вашей палитры */
}

.date-input {
  margin-top: 10px; /* Дополнительный отступ сверху */
  padding: 12px;
  border: 1px solid rgba(244, 143, 177, 0.3); /* Ваш border-color */
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

.date-input:focus {
  outline: none;
  border-color: #f48fb1; /* Ваш pink-accent */
  box-shadow: 0 0 0 2px rgba(244, 143, 177, 0.2);
}

small {
  color: #f48fb1;
  font-size: 14px;
  margin-top: 5px;
  display: block;
}
</style>