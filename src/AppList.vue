<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import AppCheckbox from "./AppCheckbox.vue";
import AppRadio from "./AppRadio.vue";
import AppSelect from "./AppSelect.vue";
import AppText from "./AppText.vue";
import AppDate from "./AppDate.vue";
import trash from "./assets/trash.svg";
import eye from "./assets/eye.svg";

const emit = defineEmits(["headache-alert", "form-deleted"]);

const props = defineProps({
  updateCount: Function,
});

const initialFormState = {
  // name: "",
  date: "",
  intensity: "",
  headacheToday: "",
  aura: "",
  physicalActivity: "",
  nausea: "",
  vomiting: "",
  lightSensitivity: "",
  soundSensitivity: "",
  medication: "",
  drugName: "",
  drugMass: "",
  drugEffect: "",
  location: [],
  headacheType: [],
};

let form = reactive({ ...initialFormState });

let isOpenHistory = ref(true);
let isFormSaved = ref(false);

const allForms = ref(new Set());

onMounted(() => {
  const saved = localStorage.getItem("allForms");
  if (saved) {
    allForms.value = JSON.parse(saved);
    console.log("4. allForms после загрузки:", allForms.value);
  }
});

const errors = reactive({
  // name: null, // Блок убран, требуется при авторизации пользователя
  date: null,
  intensity: null,
  headacheToday: null,
  aura: null,
  location: null,
  headacheType: null,
  physicalActivity: null,
  nausea: null,
  vomiting: null,
  lightSensitivity: null,
  soundSensitivity: null,
  medication: null,
  drugName: null,
  drugMass: null,
  drugEffect: null,
});

function formIsValid() {
  let isValid = true;

  Object.keys(errors).forEach((key) => (errors[key] = null));

  // Блок убран, требуется при авторизации пользователя
  // if (!form.name.trim()) {
  //   errors.name = "Введите ваше имя";
  //   isValid = false;
  // }

  if (!form.date) {
    errors.date = "Выберите дату";
    isValid = false;
  }

  if (form.date) {
    const [year, month, day] = form.date.split("-").map(Number);
    const timestamp = new Date(year, month - 1, day).getTime();
    if (timestamp > new Date()) {
      errors.date = "Некорректный ввод даты: указанная дата еще не наступила";
      isValid = false;
    }
  }

  if (!form.headacheToday) {
    errors.headacheToday = "Ответьте на этот вопрос";
    isValid = false;
  }

  if (form.headacheToday === "no") {
    return isValid;
  }

  if (form.headacheToday === "yes") {
    let message =
      "⚠️ При наличии головной боли это поле обязательно для заполнения";

    if (!form.aura) {
      errors.aura = message;
      isValid = false;
    }
    if (!form.location?.length) {
      errors.location = message;
      isValid = false;
    }

    if (!form.headacheType || form.headacheType.length === 0) {
      errors.headacheType = message;
      isValid = false;
    }
    if (!form.intensity) {
      errors.intensity = message;
      isValid = false;
    }
    if (!form.physicalActivity) {
      errors.physicalActivity = message;
      isValid = false;
    }
    if (!form.nausea) {
      errors.nausea = message;
      isValid = false;
    }
    if (!form.vomiting) {
      errors.vomiting = message;
      isValid = false;
    }
    if (!form.lightSensitivity) {
      errors.lightSensitivity = message;
      isValid = false;
    }
    if (!form.soundSensitivity) {
      errors.soundSensitivity = message;
      isValid = false;
    }
  }

  if (!form.medication) {
    errors.medication = "⚠️ Укажите, требовались ли медикаменты";
    isValid = false;
  } else if (form.medication === "yes") {
    // Если выбрано "Да", проверяем поля про препараты
    if (!form.drugName || !form.drugName.trim()) {
      errors.drugName = "⚠️ Введите название препарата";
      isValid = false;
    }

    if (!form.drugMass || !form.drugMass.trim()) {
      errors.drugMass = "⚠️ Введите дозировку препарата";
      isValid = false;
    } else {
      const mass = Number(form.drugMass);
      if (isNaN(mass) || mass <= 0) {
        errors.drugMass = "⚠️ Введите корректную дозировку (число > 0)";
        isValid = false;
      }
    }

    if (!form.drugEffect) {
      errors.drugEffect = "⚠️ Оцените эффект препарата";
      isValid = false;
    }
  }

  return isValid;
}

function resetForm() {
  Object.assign(form, initialFormState);

  Object.keys(errors).forEach((key) => {
    errors[key] = null;
  });
}

function deleteForm(formId) {
  const formToDelete = allForms.value.find((item) => item.id === formId);

  console.log("Дата за которое число удаляем" + formToDelete.date);
  const dateToDelete = new Date(formToDelete.date + "T00:00:00Z");
  console.log("Дата за которе удаляем 2date- " + dateToDelete);

  const featureDay1 = dateToDelete.setDate(dateToDelete.getDate() + 1);
  console.log("1" + new Date(featureDay1).toLocaleString());
  const featureDay2 = dateToDelete.setDate(dateToDelete.getDate() + 1);
  console.log("2" + new Date(featureDay2).toLocaleString());
  const featureDay3 = dateToDelete.setDate(dateToDelete.getDate() + 1);
  console.log("3" + new Date(featureDay3).toLocaleString());

  const today = new Date();
  const dif = today - featureDay1;
  // today.setHours(0, 0, 0, 0);
  // console.log(today)

  // yesterday.setDate(yesterday.getDate() - 1)
  if (dif > 172800000) {
    alert("Вы не можете удалить запись за данный день");
  } else {
    allForms.value = allForms.value.filter((item) => item.id !== formId);

    localStorage.setItem("allForms", JSON.stringify(allForms.value));
    emit("form-deleted"); // Отправляем событие о удалении
  }
}

function  missedDay() {
  // 1. Исправлено: используем локальное время для today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let savedForms = localStorage.getItem("allForms");
  if (!savedForms) return;
  let formsArray = JSON.parse(savedForms);
  console.log(formsArray);

  let allDays = [];
  formsArray.forEach((el) => {
    allDays.push(el.date);
  });
  console.log(allDays);

  if (!Array.isArray(formsArray) || formsArray.length === 0) {
    return;
  }

  const sortedForms = [...formsArray].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  let firstForm = sortedForms[0];
  console.log("Первая форма:", firstForm.date);
  const firstDay = new Date(firstForm.date + "T00:00:00");


  const difFirstDayAndToday = today - firstDay

  let lastForm = sortedForms[sortedForms.length - 1];
  console.log("Последняя форма:", lastForm.date);

  const lastDay = new Date(lastForm.date + "T00:00:00");

  if (lastDay.getTime() === today.getTime()) {
    console.log("Сегодня - последняя запись");
    // return;
  }

  const existingDates = new Set();
  for (let i = 0; i < formsArray.length; i++) {
    existingDates.add(formsArray[i].date);
  }
  console.log("Существующие даты в Set:", Array.from(existingDates));

  const missedDays = [];

  let currentDate = new Date(lastDay);
  // currentDate.setDate(currentDate.getDate() + 1);
  currentDate.setHours(0, 0, 0, 0); // Обнуляем время для точного сравнения

  // console.log(currentDate.getTime() === today.getTime())
  if (currentDate.getTime() === today.getTime()) {
    if(difFirstDayAndToday ===  86400000 ){
      currentDate.setDate(today.getDate() - 1);
      console.loп('Вариант 1')
    }    
    if(difFirstDayAndToday ===  172800000  ){
      currentDate.setDate(today.getDate() - 2);
      console.loп('Вариант 2')
    }    
    if(difFirstDayAndToday ===   259200000  ){
      currentDate.setDate(today.getDate() - 3);
      console.loп('Вариант 3')
    }    
  } else {
    currentDate.setDate(currentDate.getDate() + 1);
  }

  function formatDateLocal(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  console.log("lastDay:", lastDay);
  console.log("currentDate:", currentDate);
  console.log("yesterday:", yesterday);
  console.log("today:", today);

  // 6. Исправлено: используем локальное форматирование
  console.log("Начинаем поиск с даты:", formatDateLocal(currentDate));

  // 7. Исправлено: цикл поиска пропущенных дней
  while (currentDate <= yesterday) {
    const dateStr = formatDateLocal(currentDate);

    if (!existingDates.has(dateStr)) {
      // missedDays.push(dateStr);
      console.log("Пропущенный день:", dateStr);
    }

    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    // currentDate.setDate(currentDate.getDate() + 1);

    const newForm = {
      date: dateStr,
      dateForm: `${day}.${month}.${year}`,
      id: `auto-${Date.now()}-${Math.random()}`,
      intensity: "",
      headacheToday: "no",
      aura: "",
      location: [],
      headacheType: [],
      physicalActivity: "",
      nausea: "",
      vomiting: "",
      lightSensitivity: "",
      soundSensitivity: "",
      medication: "",
      drugName: "",
      drugMass: "",
      drugEffect: "",
      isAutoGenerated: true, // Помечаем как автоматически созданную
    };
    currentDate.setDate(currentDate.getDate() + 1);
    missedDays.push(newForm);
  }

  console.log("Все пропущенные дни:", missedDays);

  if (missedDays.length === 0) {
    console.log("Пропущенных дат нет");
    return;
  }

  for (let i = 0; i < missedDays.length; i++) {
    formsArray.push(missedDays[i]);
  }

  formsArray.sort(function (a, b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  console.log(formsArray);
  // return formsArray;

  localStorage.setItem("allForms", JSON.stringify(formsArray));
  console.log("пропущенные даты сохранены в localStorage");

  if (typeof allForms !== "undefined") {
    // Если allForms - это ref() в Vue
    if (allForms.value !== undefined) {
      allForms.value = formsArray;
      console.log("Обновлена реактивная переменная allForms");
    } else {
      allForms = formsArray;
    }
  }
  if (props.updateCount) {
    props.updateCount(); // Эта функция уже передается из App.vue
  }
  //  return formsArray;
}

function submitForm() {
  if (formIsValid()) {
    const formData = {
      id: Date.now() + "-" + Math.random(), // Генерируем новый уникальный ID при каждой отправке
      dateForm: new Date().toLocaleDateString(), // Форматируем дату для читаемости
      // name: form.name,
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
      medication: form.medication,
      drugName: form.drugName,
      drugMass: form.drugMass,
      drugEffect: form.drugEffect,
    };

    console.log("Form Data:", formData);

    const savedForms = localStorage.getItem("allForms");
    if (savedForms) {
      const formsArray = JSON.parse(savedForms);
      if (Array.isArray(formsArray)) {
        const existingEntry = formsArray.find(
          (item) => item.date === formData.date
        );

        if (existingEntry) {
          alert(
            `Дневник за ${new Date(form.date).toLocaleDateString(
              "ru"
            )} уже создан!`
          );
          return;
        }
        allForms.value.push(formData);
      } else {
        allForms.value = [formData];
      }
    } else {
      allForms.value = [formData];
    }

    localStorage.setItem("allForms", JSON.stringify(allForms.value));
    console.log("10. Сохранено в localStorage");

    if (form.headacheToday) {
      emit("headache-alert", formData); // Отправляем событие родителю
    }

    resetForm();
    form.date = setCurrentDate();
    isFormSaved.value = true;
    setTimeout(() => {
      isFormSaved.value = false;
    }, 2000);
  }

  localStorage.setItem("allForms", JSON.stringify(allForms.value));
    
    const updatedForms = missedDay();
    if (updatedForms) {
      allForms.value = updatedForms; 
    }
    
    if (props.updateCount) {
      props.updateCount();
    }
}

const setCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const clearAllForms = () => {
  if (confirm("Удалить все формы?")) {
    allForms.value = [];
    Object.assign(form, initialFormState);
    localStorage.removeItem("allForms");
    props.updateCount();

    form.date = setCurrentDate();
  }
};

const generateTestData = () => {
  const testData = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const hasHeadache = Math.random() < 0.6;

    // Определяем данные о принятых лекарствах
    const medication = hasHeadache ? (Math.random() > 0.5 ? "yes" : "no") : "";
    let drugName = "";
    let drugMass = "";
    let drugEffect = "";

    if (medication === "yes") {
      if (Math.random() > 0.5) {
        drugName = "Ибупрофен";
        drugMass = "400";
      } else {
        drugName = "Парацетамол";
        drugMass = "1000";
      }
      drugEffect = Math.random() > 0.5 ? "yes" : "no";
    }

    const form = {
      id: `test-${Date.now()}-${i}`,
      dateForm: date.toLocaleDateString("ru-RU"),
      name: "Тестовый пользователь",
      date: date.toISOString().split("T")[0],
      intensity: hasHeadache ? String(Math.floor(Math.random() * 5) + 5) : "",
      headacheToday: hasHeadache ? "yes" : "no",
      aura: hasHeadache ? (Math.random() > 0.7 ? "yes" : "no") : "",
      physicalActivity: hasHeadache ? (Math.random() > 0.5 ? "yes" : "no") : "",
      nausea: hasHeadache ? (Math.random() > 0.5 ? "yes" : "no") : "",
      vomiting: hasHeadache ? (Math.random() > 0.5 ? "yes" : "no") : "",
      lightSensitivity: hasHeadache ? (Math.random() > 0.5 ? "yes" : "no") : "",
      soundSensitivity: hasHeadache ? (Math.random() > 0.5 ? "yes" : "no") : "",
      medication: medication,
      drugName: drugName,
      drugMass: drugMass,
      drugEffect: drugEffect,
      location: hasHeadache ? (Math.random() > 0.5 ? ["one"] : ["two"]) : [],
      headacheType: hasHeadache
        ? Math.random() > 0.5
          ? ["press"]
          : ["puls"]
        : [],
    };

    testData.push(form);
  }
  return testData;
};

const useTest = () => {
  const testData = generateTestData();
  allForms.value = testData;

  localStorage.setItem("allForms", JSON.stringify(testData));

  if (props.updateCount) {
    props.updateCount();
  }
};

const basicQuestions = reactive([
  // {
  //   id: 1,
  //   type: "text",
  //   label: "Как тебя зовут?",
  //   model: "name",
  //   placeholder: "Введите имя",
  //   required: true,
  // },
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
    label: "Была ли у Вас сегодня головная боль (ГБ) или аура?",
    model: "headacheToday",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
    required: true,
  },
]);

const headacheQuestions = reactive([
  {
    id: 4,
    type: "radio",
    label: "В течение часа ДО возникновения головной боли отмечали ли вы:",
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
    type: "radio",
    label: "Головная боль требовала использование медикаментов",
    model: "medication",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
]);

const drugQuestions = reactive([
  {
    id: 14,
    type: "text",
    label:
      "Заполните поля ниже, если головная боль требовала использование медикаментов",
    sublabels: ["Какой препарат Вы приняли?"],
    model: "drugName",
    placeholder: "Введите название препарата",
  },
  {
    id: 15,
    type: "text",
    label: "Какая дозировка (мг)?",
    model: "drugMass",
    placeholder: "Введите дозировку препарата",
  },
  {
    id: 16,
    type: "radio",
    label: "Был эффект от приема препарата?",
    model: "drugEffect",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
]);

const last30Forms = computed(() => {
  if (!allForms.value || allForms.value.length === 0) {
    return [];
  }
  const copyAllForms = [...allForms.value];
  copyAllForms.sort((a, b) => {
    return b.date.localeCompare(a.date);
  });
  return copyAllForms.slice(0, 30);
});
</script>

<template>
  <div class="container">
    <div class="forms-list" v-if="allForms.length > 0">
      <div class="header">
        <h2>
          Сохраненные формы ({{ allForms.length }}) <br />(за последние 30 дней
          в хронологическом порядке)
        </h2>
        <div class="saveForm">
          <button @click="isOpenHistory = !isOpenHistory" class="btn-history">
            <img class="eye" v-bind:src="eye" alt="Логотип глаза" />
            {{
              isOpenHistory
                ? "Показать историю записей"
                : "Скрыть историю записей"
            }}
          </button>

          <button @click="clearAllForms" class="btn-clear">
            <img class="trash" v-bind:src="trash" alt="Логотип корзины" />
            <div class="clear-history">Очистить историю</div>
          </button>
        </div>
      </div>
      <template v-if="!isOpenHistory">
        <div
          class="form-card"
          :class="{
            'has-headache': item.headacheToday === 'yes',
            'no-headache': item.headacheToday === 'no',
          }"
          v-for="item in last30Forms"
          :key="item.id"
        >
          <div class="form-info">
            <p>
              <strong>Запись создана:</strong>
              {{ new Date(item.date).toLocaleDateString("ru") }}
            </p>
            <div class="form-status">
              <span
                v-if="item.headacheToday === 'yes'"
                class="status has-headache"
              >
                ✓ Была головная боль
              </span>
              <span v-else class="status no-headache">
                ✗ Не было головной боли
              </span>

              <div
                v-if="item.headacheToday === 'yes' && item.intensity"
                class="intensity"
              >
                Интенсивность: {{ item.intensity }}/10
              </div>
            </div>
          </div>
          <button @click="deleteForm(item.id)" class="btn-delete">×</button>
        </div>
      </template>
      <template v-if="isFormSaved">
        <div class="form-card">Запись успешно создана</div>
      </template>
    </div>

    <div>
      <button @click="useTest" class="btn-test">
        Использовать тестовые данные
      </button>
    </div>

    <form class="card" @submit.prevent="submitForm">
      <h2>Список вопросов</h2>
      <ol>
        <!-- Вопросы 1-3 всегда показываются -->
        <li v-for="question in basicQuestions" :key="question.id">
          <AppText
            v-if="question.type === 'text'"
            v-model="form[question.model]"
            :label="question.label"
            :placeholder="question.placeholder"
            :error="errors[question.model]"
            :required="question.required"
          />

          <AppDate
            v-if="question.type === 'date'"
            v-model="form[question.model]"
            :label="question.label"
            :error="errors[question.model]"
            :required="question.required"
          />

          <AppRadio
            v-if="question.type === 'radio'"
            v-model="form[question.model]"
            :label="question.label"
            :options="question.options"
            :error="errors[question.model]"
            :required="question.required"
          />
        </li>

        <!-- Вопросы 4-13 показываются только если есть головная боль -->
        <div v-if="form.headacheToday === 'yes'">
          <li v-for="question in headacheQuestions" :key="question.id">
            <AppRadio
              v-if="question.type === 'radio'"
              v-model="form[question.model]"
              :label="question.label"
              :options="question.options"
              :error="errors[question.model]"
              :required="question.required"
              :sublabels="question.sublabels"
            />

            <AppCheckbox
              v-if="question.type === 'checkbox'"
              v-model="form[question.model]"
              :label="question.label"
              :options="question.options"
              :error="errors[question.model]"
              :required="question.required"
            />

            <AppSelect
              v-if="question.type === 'select'"
              v-model="form[question.model]"
              :label="question.label"
              :options="question.options"
              :error="errors[question.model]"
              :required="question.required"
            />
          </li>
        </div>

        <!-- Вопросы про препараты (14-16) показываются в случае приема препаратов-->
        <div v-if="form.medication === 'yes'">
          <li v-for="question in drugQuestions" :key="question.id">
            <AppText
              v-if="question.type === 'text'"
              v-model="form[question.model]"
              :label="question.label"
              :placeholder="question.placeholder"
              :error="errors[question.model]"
              :required="question.required"
            />

            <AppRadio
              v-if="question.type === 'radio'"
              v-model="form[question.model]"
              :label="question.label"
              :options="question.options"
              :error="errors[question.model]"
              :required="question.required"
            />
          </li>
        </div>
      </ol>

      <button type="submit" class="btn">Отправить</button>
    </form>
  </div>
</template>


<style scoped>
/* Список сохраненных форм */
.forms-list {
  background-color: var(--white);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-color);
}

.forms-list .header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--light-mint);
}

.forms-list h2 {
  color: var(--pink-accent-1);
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.saveForm {
  display: flex;
  gap: 10px;
}

.form-card.has-headache {
  border-left-color: var(--pink-accent-1);
  background-color: var(--soft-pink);
}

.form-card.no-headache {
  border-left-color: var(--dark-mint);
  background-color: rgba(129, 199, 132, 0.1);
}

/* Кнопка использования тестовых данных */
.btn-test {
  background-color: var(--light-pink);
  color: var(--text-dark);
  border: 1px solid var(--pink-accent);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 20px auto 20px;
}

.btn-test:hover {
  background-color: var(--pink-accent-1);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--shadow);
}

/* Кнопка очистки всех форм */
.btn-clear {
  background-color: var(--light-pink);
  color: var(--text-dark);
  border: 1px solid var(--pink-accent);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-clear:hover {
  background-color: var(--pink-accent-1);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--shadow);
}

/* Кнопка вывода истории сохраненных записей */
.btn-history {
  background-color: var(--mint-green);
  color: var(--text-dark);
  border: 1px solid var(--text-dark);
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-history:hover {
  background-color: var(--dark-mint);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--shadow);
}

/* Карточка отдельной формы */
.form-card {
  background-color: var(--light-mint);
  border-radius: 10px;
  padding: 15px 20px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid var(--mint-green);
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-out;
}

.form-card:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-info p {
  margin: 5px 0;
  color: var(--text-dark);
}

.form-info strong {
  color: var(--text-light);
}

.form-info small {
  color: var(--text-light);
  font-size: 14px;
}

/* Кнопка удаления отдельной формы */
.btn-delete {
  background-color: transparent;
  color: var(--pink-accent);
  border: 2px solid var(--pink-accent);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.form-card .btn-delete:hover {
  color: white;
  transform: scale(1.1);
}
.form-card.has-headache .btn-delete:hover {
  background-color: var(--pink-accent-1);
}

.form-card.no-headache .btn-delete:hover {
  background-color: var(--dark-mint);
}

/* Форма для ввода данных */
.card {
  background-color: var(--white);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px var(--shadow);
  border: 1px solid var(--border-color);
}

.card h2 {
  color: var(--pink-accent-1);
  margin-top: 0;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--light-mint);
  font-size: 22px;
  font-weight: 600;
}

/* Список вопросов */
ol {
  padding-left: 20px;
  margin-bottom: 30px;
}

ol li {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px dashed var(--border-color);
}

ol li:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

/* Кнопка отправки формы */
.btn {
  background-color: var(--mint-green);
  color: var(--text-dark);
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: block;
  margin: 20px auto 0;
  width: fit-content;
}

.btn:hover {
  background-color: var(--dark-mint);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Стили для условных блоков */
div[v-if="form.headacheToday === 'yes'"],
div[v-if="form.medication === 'yes'"] {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid var(--light-mint);
}

/* Анимации */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .forms-list,
  .card {
    padding: 20px;
  }

  .forms-list .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .form-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .btn-delete {
    align-self: flex-end;
  }

  .clear-history {
    display: none;
  }
}

.form-control small {
  color: var(--pink-accent-1);
  font-size: 14px;
  margin-top: 5px;
  display: block;
}

.form-control.inValid input,
.form-control.inValid select,
.form-control.inValid textarea {
  border-color: var(--pink-accent-1);
  background-color: #ffebee;
}

/* Темная тема */
.dark-theme .form-info strong[data-v-ec4c654f] {
  color: var(--pink-accent-1);
}

.dark-theme .form-control small {
  color: var(--pink-accent-1);
  text-decoration: underline;
}

.dark-theme .eye,
.dark-theme .trash {
  filter: invert(1);
}

.dark-theme .forms-list .header[data-v-ec4c654f] {
  border-bottom: 1px dashed var(--pink-accent-1);
}

.dark-theme .card h2[data-v-ec4c654f] {
  border-bottom: 1px solid var(--pink-accent-1);
}

.dark-theme .btn-clear:hover,
.dark-theme .btn-test:hover {
  background-color: var(--dark-mint);
}

.dark-theme .notes,
.dark-theme .card {
  background-color: var(--sun);
}

.dark-theme .btn:hover {
  box-shadow: 0 4px 8px var(--shadow);
}
</style>
