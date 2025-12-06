<script setup>
import { ref, reactive } from "vue";

const form = reactive({
  name: "",
  date: "",
  intensity: "",
  headacheToday: "",
  aura: "",
  physicalActivity: "",
  nausea: "",
  vomiting: "",
  lightSensitivity: "",
  soundSensitivity: "",
  drugName: "",
  drugMass: "",
  drugEffect: "",
  location: [],
  headacheType: [],
});

const errors = reactive({
  name: null,
  date: null,
  intensity: null,
  headacheToday: null,
  aura: null,
  physicalActivity: null,
  nausea: null,
  vomiting: null,
  lightSensitivitySensitivity: null,
  drugName: null,
  drugMass: null,
  drugdrugEffect: null,
  location: null,
});

function formIsValid() {
  let isValid = true;

  Object.keys(errors).forEach((key) => (errors[key] = null));

  if (!form.name.trim()) {
    errors.name = "Введите ваше имя";
    isValid = false;
  }
  
  if (!form.date) {
    errors.date = "Выберите дату";
    isValid = false;
  }
  

  // if (isNaN(drugMass.value) || drugMass.value === "") {
  //   errors.value.drugMass = "Введите корректное число";
  //   isValid = false;
  // } else if (Number(drugMass.value) <= 0) {
  //   errors.value.drugMass = "Дозировка должна быть больше 0";
  //   isValid = false;
  // } else {
  //   errors.value.drugMass = null;
  // }

  return isValid;
}

function submitForm() {
  if (formIsValid()) {
    const formData = {
      name: form.name,
      date: form.date,
      intensity: form.intensity,
      headacheToday: form.headacheToday,
      aura: form.aura,
      location: form.location,
      headacheType: form.headacheType,
      physicalActivity: form.physicalActivity,
      nausea: form.nausea,
      vomiting: form.vomiting,
      lightSensitivity: form.lightSensitivity,
      soundSensitivity: form.soundSensitivity,
      drugName: form.drugName,
      drugMass: form.drugMass,
      drugEffect: form.drugEffect,
    };

    console.log("Form Data:", formData);
  }
}

const questionList = reactive([
  {
    id: 1,
    type: "text",
    label: "Как тебя зовут?",
    model: "name",
    placeholder: "Введите имя",
    required: true,
  },
  {
    id: 2,
    type: "date",
    label: "Текущая дата",
    model: "date",
    required: true,
  },
  {
    id: 3,
    type: "radio",
    label: "Была ли у Вас сегодня головная боль (ГБ)?",
    model: "headacheToday",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
    required: true,
  },
  {
    id: 4,
    type: "radio",
    label: "В течение часа ДО возникновения головной боли отмечати ли вы:",
    sublabels: [
      "- зрительные нарушения (цветные вспышки, зигзаги, слепые пятна)",
      "- И/ИЛИ обонятельные (ощущение посторонних запахов)",
    ],
    model: "aura",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 5,
    type: "checkbox",
    label: "Где отмечалась головная боль?",
    model: "location",
    options: [
      { value: "one", label: "C одной стороны" },
      { value: "two", label: "С обеих сторон" },
    ],
  },
  {
    id: 6,
    type: "checkbox",
    label: "Характер ГБ",
    model: "headacheType",
    options: [
      { value: "press", label: "Давящая" },
      { value: "puls", label: "Пульсирующая" },
    ],
  },
  {
    id: 7,
    type: "select",
    label:
      "Интенсивность головной боли в баллах (Выберите интенсивность из списка)",
    model: "intensity",
    options: [
      { value: "0", label: "0 - Нет боли" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5 - Средняя боль" },
      { value: "6", label: "6" },
      { value: "7", label: "7" },
      { value: "8", label: "8" },
      { value: "9", label: "9" },
      { value: "10", label: "10 - Невыносимая боль" },
    ],
    placeholder: "Выберите значение от 0 до 10", // текст по умолчанию
  },
  {
    id: 8,
    type: "radio",
    label: "Усиливалась ли при физической нагрузке?",
    model: "physicalActivity",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 9,
    type: "radio",
    label: "Сопровождалась ли тошнотой?",
    model: "nausea",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 10,
    type: "radio",
    label: "Сопровождалась ли рвотой?",
    model: "vomiting",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 11,
    type: "radio",
    label: "Раздражал ли свет?",
    model: "lightSensitivity",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 12,
    type: "radio",
    label: "Раздражал ли звук?",
    model: "soundSensitivity",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 13,
    type: "text",
    label: "Какой препарат приняли?",
    model: "drugName",
    placeholder: "Введите название препарата",
  },
  {
    id: 14,
    type: "text",
    label: "Какая дозировка (мг) ?",
    model: "drugMass",
    placeholder: "Введите дозировку препарата",
  },
  {
    id: 15,
    type: "radio",
    label: "Был эффект от приема препарата?",
    model: "drugEffect",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
]);
</script>

<template>
  <div class="'container'">
    <form class="card" @submit.prevent="submitForm">
      <h2>Список вопросов</h2>
      <ol v-for="question in questionList" :key="question.id">
        <div v-if="question.type === 'text'" class="form-control">
          <label :for="question.model"
            >{{ question.id }}. {{ question.label }}</label
          >
          <input
            :type="question.type"
            :id="question.model"
            v-model.trim="form[question.model]"
            :placeholder="question.placeholder"
            :required="question.required"
          />
          <small v-if="errors[question.model]">{{
            errors[question.model]
          }}</small>
        </div>

        <div v-if="question.type === 'date'" class="form-control">
          <label :for="question.model"
            >{{ question.id }}. {{ question.label }}</label
          >
          <input
            :type="question.type"
            :id="question.model"
            v-model.trim="form[question.model]"
            :required="question.required"
          />
        </div>

        <div v-if="question.type === 'radio'" class="form-control">
          <div class="question-label">
            {{ question.id }}. {{ question.label }}
          </div>
          <div
            v-for="(sublabel, index) in question.sublabels"
            :key="index"
            class="question-sublabel"
          >
            {{ sublabel }}
          </div>
          <div v-for="option in question.options" :key="option.value">
            <label>
              <input
                type="radio"
                :name="question.model"
                :value="option.value"
                v-model="form[question.model]"
                :required="question.required"
              />
              {{ option.label }}
            </label>
          </div>
        </div>

        <div v-if="question.type === 'checkbox'" class="form-control">
          <div class="question-label">
            {{ question.id }}. {{ question.label }}
          </div>
          <div v-for="option in question.options" :key="option.value">
            <label>
              <input
                type="checkbox"
                :value="option.value"
                v-model="form[question.model]"
                :required="question.required"
              />
              {{ option.label }}
            </label>
          </div>
        </div>

        <div v-if="question.type === 'select'" class="form-control">
          <label :for="question.model"
            >{{ question.id }}. {{ question.label }}</label
          >
          <select
            :id="question.model"
            v-model="form[question.model]"
            :required="question.required"
          >
            <option value="" disabled selected>
              {{ question.placeholder || "-- Выберите --" }}
            </option>

            <option
              v-for="option in question.options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </ol>

      <button headacheType="submit" class="btn">Отправить</button>
    </form>
  </div>
</template>

<style scoped>
.form-control small {
  color: red;
}
.form-control.inValid input {
  border-color: red;
}
</style> 
