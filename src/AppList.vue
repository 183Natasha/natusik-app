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

// const name = ref("");
// const date = ref("");
// const intensity = ref("");
// const headacheToday = ref("");
// const aura = ref("");
// const physicalActivity = ref("");
// const nausea = ref("");
// const vomiting = ref("");
// const lightSensitivity = ref("");
// const soundSensitivity = ref("");
// const drugName = ref("");
// const drugMass = ref("");
// const drugEffect = ref("");
// const location = ref([]);
// const headacheType = ref([]);

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

  if (obj.name.value.length === 0) {
    errors.value.name = "Введите ваше имя";
    isValid = false;
  } else {
    errors.value.name = null;
  }

  if (isNaN(drugMass.value) || drugMass.value === "") {
    errors.value.drugMass = "Введите корректное число";
    isValid = false;
  } else if (Number(drugMass.value) <= 0) {
    errors.value.drugMass = "Дозировка должна быть больше 0";
    isValid = false;
  } else {
    errors.value.drugMass = null;
  }

  return isValid;
}

function submitForm() {
  if (formIsValid()) {
    const formData = {
      name: name.value,
      date: date.value,
      intensity: intensity.value,
      headacheToday: headacheToday.value,
      aura: aura.value,
      location: location.value,
      headacheType: headacheType.value,
      physicalActivity: physicalActivity.value,
      nausea: nausea.value,
      vomiting: vomiting.value,
      lightSensitivity: lightSensitivity.value,
      soundSensitivity: soundSensitivity.value,
      drugName: drugName.value,
      drugMass: drugMass.value,
      drugEffect: drugEffect.value,
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
    option: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
    required: true,
  },
  {
    id: 4,
    type: "radio",
    label:
      "В течение часа ДО возникновения головной боли отмечати ли вы              зрительные нарушения (цветные вспышки, зигзаги, слепые пятна) или обонятельные ( ощущение посторонних запахов)",
    model: "aura",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
    required: true,
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
    required: true,
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
    required: true,
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
    required: true,
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
    required: true,
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
    required: true,
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
    required: true,
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
    required: true,
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
    required: true,
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
          <label :for="question.model">{{ question.id }}. {{ question.label }}</label>
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
      <!-- <ol>
        <li>
          <div class="form-control" :class="{ inValid: errors.name }">
            <label for="name">Как тебя зовут?</label>
            <input
              headacheType="text"
              id="name"
              placeholder="Введите имя"
              v-model.trim="name"
            />
            <small v-if="errors.name">{{ errors.name }}</small>
          </div>
        </li>
        <li>
          <div class="form-control">
            <label for="date">Текущая дата</label>
            <input
              headacheType="date"
              id="date"
              name="calendar"
              v-model="date"
            />
          </div>
        </li>
        <li>
          <div class="form-control">
            <label>Была ли у Вас сегодня головная боль (ГБ)?</label>
            <label for="yes"
              ><input
                headacheType="radio"
                name="headacheToday"
                v-model="headacheToday"
                value="yes"
              />
              Да</label
            >
            <label for="no"
              ><input
                headacheType="radio"
                name="headacheToday"
                v-model="headacheToday"
                value="no"
              />Нет</label
            >
          </div>
        </li>
        <li>
          <div class="form-control">
            <label>
              В течение часа ДО возникновения головной боли отмечати ли вы
              зрительные нарушения (цветные вспышки, зигзаги, слепые пятна)
              <br />
              или обонятельные ( ощущение посторонних запахов)
            </label>
            <label for="yes"
              ><input
                headacheType="radio"
                name="aura"
                v-model="aura"
                value="yes"
              />
              Да</label
            >
            <label for="no"
              ><input
                headacheType="radio"
                name="aura"
                v-model="aura"
                value="no"
              />Нет</label
            >
          </div>
        </li>
        <li>
          <div class="form-control">
            <label>Где отмечалась головная боль?</label>

            <label for="one"
              ><input
                headacheType="checkbox"
                name="headachelocation"
                v-model="location"
                value="one"
              />C одной стороны</label
            >

            <label for="two"
              ><input
                headacheType="checkbox"
                name="headachelocation"
                v-model="location"
                value="two"
              />С обеих сторон</label
            >
          </div>
        </li>
        <li>
          <div class="form-control">
            <label>Характер ГБ</label>

            <label for="pressing"
              ><input
                headacheType="checkbox"
                name="headacheheadacheType"
                v-model="headacheType"
                value="press"
              />Давящая</label
            >

            <label for="pulse"
              ><input
                headacheType="checkbox"
                name="headacheheadacheType"
                v-model="headacheType"
                value="puls"
              />Пульсирующая</label
            >
          </div>
        </li>
        <li>
          <div class="form-control">
            <label>
              Интенсивность головной боли в баллах (Выберите интенсивность из
              списка)
            </label>
            <select id="intensity" class="intensity-select" v-model="intensity">
              <option v-for="n in 11" :key="n" :value="n - 1">
                {{ n - 1 }}
              </option>
            </select>
          </div>
        </li>
        <li>
          <div class="form-control">
            <label>Усиливалась ли при физической нагрузке?</label>
            <label for="yes"
              ><input
                headacheType="radio"
                name="physicalActivity"
                v-model="physicalActivity"
                value="yes"
              />
              Да</label
            >
            <label for="no"
              ><input
                headacheType="radio"
                name="physicalActivity"
                v-model="physicalActivity"
                value="no"
              />Нет</label
            >
          </div>
        </li>
        <li>
          <div class="form-control">
            <label>Сопровождалась ли тошнотой?</label>
            <label for="yes"
              ><input
                headacheType="radio"
                name="Nausea"
                v-model="nausea"
                value="yes"
              />
              Да</label
            >
            <label for="no"
              ><input
                headacheType="radio"
                name="Nausea"
                v-model="nausea"
                value="no"
              />Нет</label
            >
          </div>
        </li>
        <li>
          <div class="form-control">
            <label>Сопровождалась ли рвотой?</label>
            <label for="yes"
              ><input
                headacheType="radio"
                name="vomiting"
                v-model="vomiting"
                value="yes"
              />
              Да</label
            >
            <label for="no"
              ><input
                headacheType="radio"
                name="vomiting"
                v-model="vomiting"
                value="no"
              />Нет</label
            >
          </div>
        </li>
        <li>
          <div class="form-control">
            <label>Раздражал ли свет?</label>
            <label for="yes"
              ><input
                headacheType="radio"
                name="lightSensitivity"
                v-model="lightSensitivity"
                value="yes"
              />
              Да</label
            >
            <label for="no"
              ><input
                headacheType="radio"
                name="lightSensitivity"
                v-model="lightSensitivity"
                value="no"
              />Нет</label
            >
          </div>
        </li>
        <li>
          <div class="form-control">
            <label>Раздражал ли звук?</label>
            <label for="yes"
              ><input
                headacheType="radio"
                name="soundSensitivity "
                v-model="soundSensitivity"
                value="yes"
              />
              Да</label
            >
            <label for="no"
              ><input
                headacheType="radio"
                name="soundSensitivity "
                v-model="soundSensitivity"
                value="no"
              />Нет</label
            >
          </div>
        </li>
        <li>
          <div class="form-control">
            <div>
              <div class="form-drug">
                <div>
                  <label for="drug-name"> Какой препарат приняли?</label>
                  <input
                    headacheType="text"
                    id="drug-name"
                    placeholder="Введите название препарата"
                    v-model.trim="drugName"
                  />
                </div>
                <div class="form-control" :class="{ inValid: errors.drugMass }">
                  <label for="drug-mass"> Какая дозировка (мг) ?</label>
                  <input
                    headacheType="text"
                    id="drug-mass"
                    placeholder="Введите дозировку препарата"
                    v-model.number="drugMass"
                  />
                  <small v-if="errors.drugMass">{{ errors.drugMass }}</small>
                </div>
                <div>
                  <label>Эффект от приема препарата был?</label>
                  <label for="yes"
                    ><input
                      headacheType="radio"
                      name="drugEffect"
                      v-model="drugEffect"
                      value="yes"
                    />
                    Да</label
                  >
                  <label for="no"
                    ><input
                      headacheType="radio"
                      name="drugEffect"
                      v-model="drugEffect"
                      value="no"
                    />Нет</label
                  >
                </div>
              </div>
            </div>
          </div>
        </li>
      </ol> -->
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
</style> -->
