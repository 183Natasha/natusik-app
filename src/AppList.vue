<script setup>
import { ref } from "vue";

function submitForm() {
  console.log("submit");
}
// const questionList = ref([
//   { id: 1,
//     text: "Сегодняшняя дата" },
//   { id: 2,
//     text: "Была ли у Вас сегодня головная боль (ГБ)?" },
//   {
//     id: 3,
//     text: "В течение часа ДО возникновения головной боли отмечати ли вы зрительные нарушения (цветные вспышки, зигзаги, слепые пятна) <br/> или обонятельные ( ощущение посторонних запахов)",
//   },
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
// ]);
</script>

<template>
  <div class="'container'">
    <form class="card" @submit.prevent="submitForm">
      <h2>Список вопросов</h2>
      <ol>
        <li>
          <div class="form-control">
            <label for="date">Текущая дата</label>
            <input type="date" name="calendar" />
          </div>
        </li>
        <li>
          <div class="form-control">
            <div>Была ли у Вас сегодня головная боль (ГБ)?</div>
            <input type="radio" name="headacheCheck" />
            <label for="yes">Да</label>
            <input type="radio" name="headacheCheck" />
            <label for="no">Нет</label>
          </div>
        </li>
        <li>
          <div class="form-control">
            <div>
              В течение часа ДО возникновения головной боли отмечати ли вы
              зрительные нарушения (цветные вспышки, зигзаги, слепые пятна)
              <br />
              или обонятельные ( ощущение посторонних запахов)
            </div>
            <input type="radio" name="headacheAura" />
            <label for="yes">Да</label>
            <input type="radio" name="headacheAura" />
            <label for="no">Нет</label>
          </div>
        </li>
        <li>
          <div class="form-control">
            <div>Где отмечалась головная боль?</div>
            <input type="checkbox" name="headacheWhere" />
            <label for="one">C одной стороны</label>
            <input type="checkbox" name="headacheWhere" />
            <label for="two">С обеих сторон</label>
          </div>
        </li>
        <li>
          <div class="form-control">
            <div>Характер ГБ</div>
            <input type="checkbox" name="headacheType" />
            <label for="pressing">Давящая</label>
            <input type="checkbox" name="headacheType" />
            <label for="pulse">Пульсирующая</label>
          </div>
        </li>
        <li>
          <div class="form-control">
            <div>
              Интенсивность головной боли в баллах (Выберите интенсивность из
              списка)
            </div>
            <select id="strong" class="intensity-select">
              <option selected value="chois">-- Выберите --</option>
              <option v-for="n in 11" :key="n" :value="n - 1">
                {{ n - 1 }}
              </option>
            </select>
          </div>
        </li>
        <li>
          <div class="form-control">
            <div>Усиливалась ли при физической нагрузке?</div>
            <input type="radio" name="headacheSport" />
            <label for="yes">Да</label>
            <input type="radio" name="headacheSport" />
            <label for="no">Нет</label>
          </div>
        </li>
        <li>
          <div class="form-control">
            <div>Сопровождалась ли тошнотой?</div>
            <input type="radio" name="headacheNausea" />
            <label for="yes">Да</label>
            <input type="radio" name="headacheNausea" />
            <label for="no">Нет</label>
          </div>
        </li>
        <li>
          <div class="form-control">
            <div>Сопровождалась ли рвотой?</div>
            <input type="radio" name="headachePuke" />
            <label for="yes">Да</label>
            <input type="radio" name="headachePuke" />
            <label for="no">Нет</label>
          </div>
        </li>
        <li>
          <div class="form-control">
            <div>Раздражал ли свет?</div>
            <input type="radio" name="headacheLight" />
            <label for="yes">Да</label>
            <input type="radio" name="headacheLight" />
            <label for="no">Нет</label>
          </div>
        </li>
        <li>
          <div class="form-control">
            <div>Раздражал ли звук?</div>
            <input type="radio" name="headacheSound" />
            <label for="yes">Да</label>
            <input type="radio" name="headacheSound" />
            <label for="no">Нет</label>
          </div>
        </li>
        <li>
          <div class="form-control">
            <div>Препарат, доза, эффект</div>
            <input type="text" name="headacheDrug" />
          </div>
        </li>
      </ol>
      <button type="submit" class="btn">Отправить</button>
    </form>
  </div>
</template>

<style scoped>
/* .form-control {

} */
</style>
