<script setup>
import { ref, watch, onMounted } from "vue";
import cranberryImage from "./assets/cranberry.png";
import lemonImage from "./assets/lemon.svg";
import AppList from "./AppList.vue";
import AppSun from "./AppSun.vue";
import AppWelcome from "./AppWelcome.vue";

const getLocalStorageCount = () => {
  try {
    const savedForms = localStorage.getItem("allForms");
    if (savedForms) {
      const formsArray = JSON.parse(savedForms);
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
    }
  } catch (error) {
    console.error("Ошибка при чтении из LocalStorage:", error);
  }
};

let currentLogo = ref(cranberryImage);

let isOpen = ref(true);
// let headacheDays = ref(0);


let hasReg = ref(false)


onMounted(() => {
  const savedHasReg = localStorage.getItem("hasReg");
  if (savedHasReg === "true") {
    hasReg.value = true;
  }
  
  count.value = getLocalStorageCount();
  loadStatisticsFromStorage();
  updateDayText();
  checkCount();
});

const finishWelcome = () => {
  hasReg.value = true;
  localStorage.setItem("hasReg", "true");
};


let count = ref(getLocalStorageCount()); // кол-во дней ведения дневника
let day = ref("");
let daysDairy = ref(0); // из count ДНЕЙ ведения
let countDaysWithAche = ref(0); // кол-во дней с головной болью за веь период ведения
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
    if (!savedForms) {
      count.value = 0;
      currentLogo.value = cranberryImage;
      chronicWarning.value = "";
      updateDayText();
      return;
    }

    if (savedForms) {
      const formsArray = JSON.parse(savedForms);
      if (!Array.isArray(formsArray)) {
        count.value = 0;
        return;
      }

      // const arrayLength = formsArray.length;
      count.value = getLocalStorageCount();

      // Проверяем на хроническую головную боль
      const last30Days = formsArray.slice(-30);
      let headacheDays = last30Days.filter(
        (item) => item.headacheToday === "yes"
      ).length;
      if (headacheDays >= 15) {
        chronicWarning.value =
          "Голова болела чаще 15 раз за последние 30 дней. Хроническая головная боль!";
        currentLogo.value = lemonImage;
      } else {
        currentLogo.value = cranberryImage;
      }
    }
  } catch (error) {
    console.error("Ошибка при чтении из LocalStorage:", error);
    count.value = 0;
  }
  // console.log("🔄 countDaysWithAche изменился:", countDaysWithAche.value);
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

// onMounted(() => {
//   count.value = getLocalStorageCount();
//   loadStatisticsFromStorage();
//   updateDayText();
//   checkCount();
// });

const incrementCount = (formData) => {
  checkCount();
};
</script>

<template>
  <div class="app">
    <header>
      <div class="header_logo">
        <img class="logo" v-bind:src="currentLogo" alt="Лого" />
        <h1>Дневник головной боли</h1>
      </div>
      <AppSun />
    </header>
    <div v-if="hasReg === false">
      <AppWelcome @finish="finishWelcome" />
    </div>
    <div v-if="hasReg === true">
      <div class="stat">
        Вы ведете данный дневник головной боли {{ count }} {{ day }}
        <button v-if="count > 0" class="btn" @click="isOpen = !isOpen">
          {{ isOpen ? "Показать статистику" : "Скрыть статистику" }}
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
          {{ countSound }} <br />
          - Из них требовало использование лекарственных средств -
          {{ countDaysWithAcheMedication }} ({{ drugsName.join(", ") }})
        </div>
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


<style>
:root {
  --soft-pink: #ffebee; /* Нежно-розовый фон */
  --light-pink: #fce4ec; /* Светло-розовый */
  --pink-accent-1: #f48fb1; /* Розовый акцент */
  --mint-green: #c8e6c9; /* Салатный/мятный */
  --light-mint: #e8f5e9; /* Светло-салатный */
  --dark-mint: #81c784; /* Темно-салатный */
  --text-dark: #5d4037; /* Темный текст */
  --text-light: #795548; /* Светлый текст */
  --white: #ffffff;
  --shadow: rgba(244, 143, 177, 0.2);
  --sun: #e8f5e9;
  --sun-hover: #c8e6c9;
}
.app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: var(--text-dark);
  background: linear-gradient(
    135deg,
    var(--soft-pink) 0%,
    var(--light-mint) 100%
  );
  min-height: 100vh;
  padding: 20px;
  line-height: 1.6;
  font-size: 14px;
}

/* Header стили */
header {
  background-color: var(--white);
  border-radius: 15px;
  padding: 20px 30px;
  margin-bottom: 25px;
  box-shadow: 0 4px 15px var(--shadow);
  border-left: 5px solid var(--pink-accent);
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-size: 18px;
  margin-bottom: 15px;
  color: var(--text-light);
}

.stat{
  font-size: 16px;
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
  display: inline-block;
  font-size: 16px;
}

.btn:hover {
  background-color: var(--dark-mint);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--shadow);
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


/* Темная тема */
.dark-theme {
  --soft-pink: #030712;
  --light-pink: #222f4d;
  --pink-accent-1: #d7ccc8;
  --pink-accent: #2b3b61;
  --mint-green: #222f4d;
  --light-mint: #191b20;
  --dark-mint: #1c2740;
  --text-dark: #e8d5d0;
  --text-light: rgba(255, 255, 255, 0.3);
  --white: #141c2e;
  --shadow: rgb(255, 255, 255, 0.2);
  --sun: #222f4d;
  --sun-hover: #1c2740;
  --border-color: rgba(255, 255, 255, 0.3);
  --color-date__input: rgba(255, 255, 255, 0.6);
  --check: rgba(12, 61, 176, 1);;
}


.dark-theme .btn:hover {
  box-shadow: 0 4px 8px var(--shadow)
}

.dark-theme .app > div > div:first-child {
  font-size: 16px;
  margin-bottom: 15px;
  color: var(--pink-accent-1);
}

.dark-theme h1 {
  color: var(--pink-accent-1);
}

.dark-theme footer {
  border-top: 1px solid var(--pink-accent-1);
}


.dark-theme .danger {
  color: var(--check);
  background-color: var(--pink-accent-1);
  border: 2px solid var(--pink-accent);
  box-shadow: var(--shadow);
}


.dark-theme .form-control.inValid input {
  border: 3px solid var(--check);
  background-color: rgba(12, 61, 176, 0.226);;
}
</style>