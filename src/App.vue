<script setup>
import { ref, watch } from "vue";
import cranberryImage from "./assets/cranberry.png";
import lemonImage from "./assets/lemon.svg";
import AppList from "./AppList.vue";
// import pluralize from 'pluralize-ru';

const getLocalStorageCount = () => {
   try {
    const savedForms = localStorage.getItem("allForms");
    if (savedForms) {
      const formsArray = JSON.parse(savedForms);
      // Проверяем, что это массив и возвращаем его длину
      return Array.isArray(formsArray) ? formsArray.length : 0;
    }
  } catch (error) {
    console.error("Ошибка при чтении из LocalStorage:", error);
  }
  return 0;
};


let currentLogo = ref(cranberryImage);

let isOpen = ref(true)

let count = ref(getLocalStorageCount()); // кол-во дней ведения дневника
let day = ref("");
let daysWithAche = ref(0); // из count ДНЕЙ ведения
let countDays = ref(0); // кол-во дней с головной болью
let countAura = ref(0);
let countLocOne = ref(0);
let countLocTwo = ref(0);
let countTypePress = ref(0);
let countTypePuls = ref(0);
let countNausea = ref(0);
let countVomiting = ref(0);
let countLigh = ref(0);
let countSound = ref(0);
let countDaysMedication = ref(0);
let drugsName = ref([]);

// const checkCount = () => {
//   count.value = getLocalStorageCount();
//   updateDayText();
// };

// if (
//   count.value == 0 ||
//   // count.value == 1 ||
//   (count.value > 10 && count.value % 10 == 1)
// ) {
//   daysWithAche.value = "дней";
// } else {
//   daysWithAche.value = "дня";
// }

// if (count.value == 0) {
//   day.value = "дней";
// }

const updateDayText = () => {
  // Логика для day (сколько дней ведете дневник)
  if (count.value % 10 == 1 && count.value != 11) {
    day.value = "день";
  } else if (count.value > 1 && count.value <= 4) {
    day.value = "дня";
  } else if (
    count.value > 20 &&
    (count.value % 10 == 2 || count.value % 10 == 3 || count.value % 10 == 4)
  ) {
    day.value = "дня";
  } else {
    day.value = "дней";
  }
  
  // Логика для daysWithAche (дней с головной болью)
  // if (
  //   count.value == 0 ||
  //   count.value % 10 == 1 && count.value != 11
  // ) {
  //   daysWithAche.value = "дней";
  // } else {
  //   daysWithAche.value = "дня";
  // }

 if (
    count.value % 10 == 1 
  ) {
    daysWithAche.value = "дня";
  } else {
    daysWithAche.value = "дней";
  }
};

updateDayText()

const incrementCount = (formData) => {
  // count.value++;
  count.value = getLocalStorageCount();
  updateDayText()

  // if (count.value % 10 == 1 && count.value != 11) {
  //   day.value = "день";
  // } else if (count.value > 1 && count.value <= 4) {
  //   day.value = "дня";
  // } else if (
  //   count.value > 20 &&
  //   (count.value % 10 == 2 || count.value % 10 == 3 || count.value % 10 == 4)
  // ) {
  //   day.value = "дня";
  // } else {
  //   day.value = "дней";
  // }

  if (formData.headacheToday === "yes") {
    if (formData.headacheToday === "yes") countDays.value++;
    if (formData.aura === "yes") countAura.value++;
    if (formData.location && formData.location.includes("one"))
      countLocOne.value++;
    if (formData.location && formData.location.includes("two"))
      countLocTwo.value++;

    if (formData.headacheType && formData.headacheType.includes("press"))
      countTypePress.value++;
    if (formData.headacheType && formData.headacheType.includes("puls"))
      countTypePuls.value++;

    if (formData.nausea === "yes") countNausea.value++;
    if (formData.vomiting === "yes") countVomiting.value++;
    if (formData.lightSensitivity === "yes") countLigh.value++;
    if (formData.soundSensitivity === "yes") countSound.value++;
    if (formData.medication === "yes" && formData.drugName.trim()) {
      countDaysMedication.value++;
      drugsName.value.push(formData.drugName);
    }
  }
};



watch(countDays, (newCount) => {
  if (newCount >= 15) {
    currentLogo.value = lemonImage;
  } else {
    currentLogo.value = cranberryImage;
  }
});
</script>

<template>
  <div class="app">
    <header>
      <div class="header_logo">
        <img class="logo" v-bind:src="currentLogo" alt="Лого" />
        <h1>Дневник головной боли</h1>
      </div>
    </header>
    <div>
      <div>
        Вы ведете данный дневник головной боли {{ count }} {{ day }}
        <button v-if="count > 0" class="btn" @click="isOpen = !isOpen">
          Показать статистику
        </button>

        <div v-if="!isOpen && count > 0" class="notes" >
          Количество дней с головной болью - {{ countDays }} из {{ count }}
          {{ daysWithAche }} ведения. Из них: <br />
          - с аурой - {{ countAura }} <br />
          - с одной стороны - {{ countLocOne }}, с двух - {{ countLocTwo }}
          <br />
          - пульсирующая - {{ countTypePuls }}, сжимающая - {{ countTypePress
          }}<br />
          - с тошнотой - {{ countNausea }} <br />
          - с рвотой - {{ countVomiting }} <br />
          - сопровождалась чувствительностью: к свету - {{ countLigh }}, звуку -
          {{ countSound }}
        </div>
      </div>
      <!-- <div>
        <button @click="countDays++">Болит голова</button>
      </div>
       -->
      <div v-if="drugsName.length > 0">
        Из них требовало использование лекарственных средств -
        {{ countDaysMedication }} ({{ drugsName.join(", ") }})
      </div>
      <div v-if="countDays >= 15" class="danger">
        У вас отмечается головная боль с частотой более 15 раз в месяц.
        Требуется посетить невролога
      </div>
      <AppList @headache-alert="incrementCount" @form-deleted="incrementCount" :update-count="incrementCount" />
    </div>
    <footer>Natusik, 2025</footer>
  </div>
</template>

<style scoped>
.danger {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
.logo {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin-right: 10px;
}
.h1 {
  font-size: 16px;
}
.header_logo {
  display: flex;
  gap: 10px;
}
</style>
