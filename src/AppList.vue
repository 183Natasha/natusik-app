<script setup>
import { ref } from "vue";



const questionList = ref([
  { id: 1, 
    text: "Сегодняшняя дата" },
  { id: 2, 
    text: "Была ли у Вас сегодня головная боль (ГБ)?" },
  {
    id: 3,
    text: "В течение часа ДО возникновения головной боли отмечати ли вы зрительные нарушения (цветные вспышки, зигзаги, слепые пятна) <br/> или обонятельные ( ощущение посторонних запахов)",
  },
//   { id: 4, 
//     text: "Где отмечалась головная боль" },
//   { id: 5, 
//     text: "Характер ГБ" },
//   { id: 6, 
//     text: "Интенсивность головной боли" },
//   { id: 7, 
//     text: "Усиливалась ли при физической нагрузке" },
//   { id: 8, 
//     text: "Интенсивность" },
//   { id: 9, 
//     text: "Сопровождалась ли тошнотой" },
//   { id: 10, 
//     text: "Сопровождалась ли рвотой" },
//   { id: 11, 
//     text: "Раздражал ли свет" },
//   { id: 12, 
//     text: "Раздражал ли звук" },
//   {
//     id: 13,
//     text: "Могло ли что-то спровоцировать приступ головной боли (стресс, продукты питания и тд)",
//   },
//   { id: 14, 
//     text: "Препарат, доза, эффект" },
]);
</script>

<template>
  <div>Список вопросов</div>
  <ol>
    <li v-for="question in questionList" :key="question.id">
      <span v-html="question.text"></span>
      
      <div>
        <div>Выбрано: {{ picked }}</div>

<input type="radio" id="one" value="Один" v-model="picked" />
<label for="one">Один</label>

<input type="radio" id="two" value="Два" v-model="picked" />
<label for="two">Два</label>
      </div>
    </li>
  </ol>
</template>

<style scoped>
</style>
