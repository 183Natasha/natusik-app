<script setup>
import { ref, watch } from "vue";
import cranberryImage from "./assets/cranberry.png";
import lemonImage from "./assets/lemon.svg";
import AppList from "./AppList.vue";

let currentLogo = ref(cranberryImage);
let countDays = ref(0);
let countAura = ref(0);
let countNausea = ref(0);
let countVomiting = ref(0);
let countLigh = ref(0);
let countSound = ref(0);

const incrementCount = (formData) => {
  countDays.value++;
  
  if (formData.aura === "yes") countAura.value++;
  if (formData.nausea === "yes") countNausea.value++;
  if (formData.vomiting === "yes") countVomiting.value++;
  if (formData.lightSensitivity === "yes") countLigh.value++;
  if (formData.soundSensitivity === "yes") countSound.value++;
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
      <span>
        Количество дней с головной болью - {{ countDays }}, из них: <br />
        - с аурой - {{ countAura }} <br />
        - с тошнотой - {{ countNausea }} <br />
        - с рвотой - {{ countVomiting }} <br />
        - сопровождалась чувствительностью: 
        к свету - {{ countLigh }}, 
        звуку - {{ countSound }}

        <!-- <button @click="countDays++">Болит голова</button> -->
      </span>
      <AppList @headache-alert="incrementCount" />
      <div v-if="countDays >= 15" class="danger">Хроническая головная боль</div>
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
