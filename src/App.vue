<script setup>
import { ref, watch } from "vue";
import cranberryImage from "./assets/cranberry.png";
import lemonImage from "./assets/lemon.svg";
import AppList from "./AppList.vue";

let currentLogo = ref(cranberryImage);

let count = ref(0);
let day = ref('')
let countDays = ref(0);
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

if (count.value==0){day='дней'}

const incrementCount = (formData) => {
  count.value++;
  if (count.value%10==1 && count.value!=11){
    day='день'
  }else if (count.value>1 && count.value<=4){
    day='дня'
  } else if(count.value>20 && (count.value%10==2 || count.value%10==3 || count.value%10==4)){
    day='дня'
  } else {
    day='дней'
  }

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
      <span>
        Вы ведете данный дневник головной боли {{ count }} {{ day  }} <br />
        Количество дней с головной болью - {{ countDays }}, из них: <br />
        - с аурой - {{ countAura }} <br />
        - с одной стороны - {{ countLocOne }}, с двух - {{ countLocTwo }} <br />
        - пульсирующая - {{ countTypePuls }}, сжимающая - {{ countTypePress
        }}<br />
        - с тошнотой - {{ countNausea }} <br />
        - с рвотой - {{ countVomiting }} <br />
        - сопровождалась чувствительностью: к свету - {{ countLigh }}, звуку -
        {{ countSound }}

      </span>
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
      <AppList @headache-alert="incrementCount" />
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
