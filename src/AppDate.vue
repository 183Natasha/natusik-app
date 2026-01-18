<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  id: String, 
  modelValue: String,
  label: String,
  error: String,
  required: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const setCurrentDate = () =>{
  const today = new Date();
  const formData = today.toISOString().split('T')[0]
  emit("update:modelValue", formData)
}
const updateInput = (event) => {
  emit("update:modelValue", event.target.value);
};


onMounted(()=>{
  if(!props.modelValue){
    setCurrentDate()
  }
})


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
      min="2026-01-01"
      max="2126-01-01"
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
  color: var(--pink-accent-1)
}

.date-input {
  margin-top: 10px; 
  padding: 12px;
  border: 1px solid rgba(244, 143, 177, 0.3); 
  border-radius: 8px;
  font-size: 16px;
  width: 46%;
  box-sizing: border-box;
}

.date-input:focus {
  outline: none;
  border-color: #f48fb1; 
  box-shadow: 0 0 0 2px rgba(244, 143, 177, 0.2);
}

small {
  color: #f48fb1;
  font-size: 14px;
  margin-top: 5px;
  display: block;
  text-decoration: underline;
}

/* Темная тема */
.dark-theme input[type=date] {
  background-color: var(--color-date__input);
}

.dark-theme .date-input {
  border: 2px solid var(--pink-accent); 
}

.dark-theme .date-input:focus {
  border-color: var(--check); 
  box-shadow: var(--shadow);
}

@media(max-width: 768px){
  .date-input {
  width: 100%;
}
}

</style>