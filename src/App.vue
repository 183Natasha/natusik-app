<script setup>
import { ref, watch } from "vue";
import cranberryImage from "./assets/cranberry.png";
import lemonImage from "./assets/lemon.svg";


let currentLogo = ref(cranberryImage);
let count = ref(0);

watch(count,(newCount) => {
  if(count.value>=15){
    currentLogo.value = lemonImage
  } else{
    currentLogo.value = cranberryImage
  }
})

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
        Количество дней с головной болью - {{ count }}
        <button @click="count++">Болит голова</button>
      </span>
      <div v-if="count >= 15" class="danger">Хроническая головная боль</div>
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
