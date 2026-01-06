<script setup>
import { ref, watch, onMounted } from "vue";
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

const loadStatisticsFromStorage = () => {
  try {
    const savedForms = localStorage.getItem("allForms");
    if (savedForms) {
      const formsArray = JSON.parse(savedForms);
      if (!Array.isArray(formsArray)) return;

      countDaysWithAche.value = 0;
      countAura.value = 0;
      countLocOne.value = 0;
      countLocTwo.value = 0;
      countTypePress.value = 0;
      countTypePuls.value = 0;
      countActivity.value = 0;
      countNausea.value = 0;
      countVomiting.value = 0;
      countLigh.value = 0;
      countSound.value = 0;
      countDaysWithAcheMedication.value = 0;
      drugsName.value = [];

      formsArray.forEach((form) => {
        if (form.headacheToday === "yes") {
          countDaysWithAche.value++;
          if (form.aura === "yes") countAura.value++;
          if (form.location && form.location.includes("one"))
            countLocOne.value++;
          if (form.location && form.location.includes("two"))
            countLocTwo.value++;
          if (form.headacheType && form.headacheType.includes("press"))
            countTypePress.value++;
          if (form.headacheType && form.headacheType.includes("puls"))
            countTypePuls.value++;
          if (form.physicalActivity === "yes") countActivity.value++;
          if (form.nausea === "yes") countNausea.value++;
          if (form.vomiting === "yes") countVomiting.value++;
          if (form.lightSensitivity === "yes") countLigh.value++;
          if (form.soundSensitivity === "yes") countSound.value++;
          if (
            form.medication === "yes" &&
            form.drugName &&
            form.drugName.trim()
          ) {
            countDaysWithAcheMedication.value++;
            if (!drugsName.value.includes(form.drugName.trim())) {
              drugsName.value.push(form.drugName.trim());
            }
          }
        }
      });
      // Проверяем, что это массив и возвращаем его длину
    }
  } catch (error) {
    console.error("Ошибка при чтении из LocalStorage:", error);
  }
  // updateLogo()
};

let currentLogo = ref(cranberryImage);

let isOpen = ref(true);

let count = ref(getLocalStorageCount()); // кол-во дней ведения дневника
let day = ref("");
let daysDairy = ref(0); // из count ДНЕЙ ведения
let countDaysWithAche = ref(0); // кол-во дней с головной болью
let countAura = ref(0);
let countLocOne = ref(0);
let countLocTwo = ref(0);
let countTypePress = ref(0);
let countTypePuls = ref(0);
let countActivity = ref(0);
let countNausea = ref(0);
let countVomiting = ref(0);
let countLigh = ref(0);
let countSound = ref(0);
let countDaysWithAcheMedication = ref(0);
let drugsName = ref([]);
let chronicWarning = ref("");

const checkCount = () => {
  chronicWarning.value = "";
  count.value = getLocalStorageCount();
  loadStatisticsFromStorage();

  try {
    const savedForms = localStorage.getItem("allForms");
    if (savedForms) {
      const formsArray = JSON.parse(savedForms);
      if (!Array.isArray(formsArray)) {
        count.value = 0;
        return;
      }

      const arrayLength = formsArray.length;
      count.value = getLocalStorageCount();

      // Проверяем на хроническую головную боль
      // if (arrayLength >= 2) {
      const last30Days = formsArray.slice(-30);
      const headacheDays = last30Days.filter(
        (item) => item.headacheToday === "yes"
      ).length;

      if (headacheDays >= 1) {
        currentLogo.value = lemonImage;
        chronicWarning.value =
          "Голова болела чаще 15 дней за последние 30 дней. Хроническая головная боль!";
      } else {
        currentLogo.value = cranberryImage;
      }
      //   }
      // } else {
      //   count.value = 0;
      // }
    }
  } catch (error) {
    console.error("Ошибка при чтении из LocalStorage:", error);
    count.value = 0;
  }
  updateDayText();
};

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

  // из count ДНЕЙ ведения
  if (count.value % 10 == 1) {
    daysDairy.value = "дня";
  } else {
    daysDairy.value = "дней";
  }
};

onMounted(() => {
  count.value = getLocalStorageCount();
  loadStatisticsFromStorage();
  updateDayText();
  checkCount();
});

const incrementCount = (formData) => {
  checkCount();

  // if (formData && formData.headacheToday === "yes") {
  //   if (formData.headacheToday === "yes") countDaysWithAche.value++;
  //   if (formData.aura === "yes") countAura.value++;
  //   if (formData.location && formData.location.includes("one"))
  //     countLocOne.value++;
  //   if (formData.location && formData.location.includes("two"))
  //     countLocTwo.value++;

  //   if (formData.headacheType && formData.headacheType.includes("press"))
  //     countTypePress.value++;
  //   if (formData.headacheType && formData.headacheType.includes("puls"))
  //     countTypePuls.value++;

  //   if (formData.nausea === "yes") countNausea.value++;
  //   if (formData.vomiting === "yes") countVomiting.value++;
  //   if (formData.lightSensitivity === "yes") countLigh.value++;
  //   if (formData.soundSensitivity === "yes") countSound.value++;
  //   if (formData.medication === "yes" && formData.drugName.trim()) {
  //     countDaysWithAcheMedication.value++;
  //     drugsName.value.push(formData.drugName);
  //   }
  // }
};

// const updateLogo = () => {
//   if (countDaysWithAche.value >= 15) {
//     currentLogo.value = lemonImage;
//   } else {
//     currentLogo.value = cranberryImage;
//   }
// };

// watch(countDaysWithAche, updateLogo);
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
           {{ isOpen ? 'Показать статистику' : 'Скрыть статистику' }}
        </button>

        <div v-if="!isOpen && count > 0" class="notes">
          Количество дней с головной болью - {{ countDaysWithAche }} из
          {{ count }} {{ daysDairy }} ведения. Из них: <br />
          - с аурой - {{ countAura }} <br />
          - с одной стороны - {{ countLocOne }}, с двух - {{ countLocTwo }}
          <br />
          - пульсирующая - {{ countTypePuls }}, сжимающая - {{ countTypePress
          }}<br />
          - усиливалась при физической нагрузке - {{ countActivity }} <br />
          - с тошнотой - {{ countNausea }} <br />
          - с рвотой - {{ countVomiting }} <br />
          - сопровождалась чувствительностью: к свету - {{ countLigh }}, звуку -
          {{ countSound }}
        </div>
      </div>
      <!-- <div>
        <button @click="countDaysWithAche++">Болит голова</button>
      </div>
       -->
      <div v-if="drugsName.length > 0">
        Из них требовало использование лекарственных средств -
        {{ countDaysWithAcheMedication }} ({{ drugsName.join(", ") }})
      </div>
      <div v-if="chronicWarning" class="danger">
        ⚠️ {{ chronicWarning }}
        Требуется посетить невролога
      </div>
      <AppList
        @headache-alert="incrementCount"
        @form-deleted="incrementCount"
        :update-count="incrementCount"
      />
    </div>
    <footer>Natusik, 2025</footer>
  </div>
</template>

<!-- <style scoped>
  
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
</style> -->
<style scoped>
/* Убрать :root из scoped стилей и использовать обычные переменные */
.app {
  --soft-pink: #ffebee;      /* Нежно-розовый фон */
  --light-pink: #fce4ec;     /* Светло-розовый */
  --pink-accent: #f48fb1;    /* Розовый акцент */
  --mint-green: #c8e6c9;     /* Салатный/мятный */
  --light-mint: #e8f5e9;     /* Светло-салатный */
  --dark-mint: #81c784;      /* Темно-салатный */
  --text-dark: #5d4037;      /* Темный текст */
  --text-light: #795548;     /* Светлый текст */
  --white: #ffffff;
  --shadow: rgba(244, 143, 177, 0.2);
  
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--text-dark);
  background: linear-gradient(135deg, var(--soft-pink) 0%, var(--light-mint) 100%);
  min-height: 100vh;
  padding: 20px;
  line-height: 1.6;
}

/* Header стили */
header {
  background-color: var(--white);
  border-radius: 15px;
  padding: 20px 30px;
  margin-bottom: 25px;
  box-shadow: 0 4px 15px var(--shadow);
  border-left: 5px solid var(--pink-accent);
}

.header_logo {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  padding: 5px;
  background-color: var(--light-mint);
  border: 2px solid var(--dark-mint);
  object-fit: contain;
}

h1 {
  color: var(--pink-accent);
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

/* Основной контентный блок */
.app > div {
  background-color: var(--white);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Первый div внутри основного контента */
.app > div > div:first-child {
  font-size: 16px;
  margin-bottom: 15px;
  color: var(--text-light);
}

/* Кнопка */
.btn {
  background-color: var(--mint-green);
  color: var(--text-dark);
  border: none;
  padding: 10px 20px;
  margin: 10px 0 15px 10px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: inline-block;
}

.btn:hover {
  background-color: var(--dark-mint);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Блок статистики */
.notes {
  background-color: var(--light-pink);
  border-radius: 12px;
  padding: 20px;
  margin: 15px 0;
  border-left: 4px solid var(--mint-green);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.5s ease-out;
}

/* Блок лекарств */
div + div[v-if="drugsName.length > 0"] {
  background-color: var(--light-mint);
  padding: 15px 20px;
  border-radius: 10px;
  margin: 20px 0;
  border: 1px dashed var(--dark-mint);
}

/* Предупреждение */
.danger {
  color: #d32f2f;
  background-color: #ffebee;
  border: 2px solid #ffcdd2;
  padding: 15px 20px;
  border-radius: 10px;
  margin: 20px 0;
  font-weight: bold;
  box-shadow: 0 3px 10px rgba(211, 47, 47, 0.1);
  animation: fadeIn 0.5s ease-out;
}

/* Footer */
footer {
  margin-top: 30px;
  padding-top: 20px;
  text-align: center;
  color: var(--text-light);
  font-size: 14px;
  border-top: 1px solid rgba(244, 143, 177, 0.3);
}

/* Переносы строк в статистике */
.notes br {
  margin-bottom: 5px;
  display: block;
}

/* Адаптивность */
@media (max-width: 768px) {
  .app {
    padding: 15px;
  }
  
  header {
    padding: 15px 20px;
  }
  
  h1 {
    font-size: 20px;
  }
  
  .logo {
    width: 50px;
    height: 50px;
  }
  
  .app > div {
    padding: 20px;
  }
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
</style>