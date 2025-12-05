<script setup>
import { ref } from "vue";

const name = ref("");
const date = ref("");
const strong = ref("");
const headacheCheck = ref("null");
const headacheAura = ref("null");
const sport = ref("null");
const nausea = ref("null");
const puke = ref("null");
const light = ref("null");
const sound = ref("null");
const drugName = ref("");
const drugMass = ref("");
const effect = ref("");
const where = ref([]);
const type = ref([]);
const errors = ref({
  name: null
})

function formIsValid(){
  let isValid= true
  if (name.value.length===0){
    errors.value.name = 'Введите ваше имя'
    isValid=false
  } else{
    errors.value.name = null
  }

   if (isNaN(drugMass.value) || drugMass.value === '') {
    errors.value.drugMass = 'Введите корректное число';
    isValid = false;
  } else if (Number(drugMass.value) <= 0) {
    errors.value.drugMass = 'Дозировка должна быть больше 0';
    isValid = false;
  } else {
    errors.value.drugMass = null;
  }

  return isValid
};


function submitForm() {
  if (formIsValid()) {
    console.group("Form Data");
    console.log("Name:", name.value);
    console.log("Date:", date.value);
    console.log("Where:", where.value);
    console.log("Type:", type.value);
    console.log("strong:", strong.value);
    console.log("headacheCheck:", headacheCheck.value);
    console.log("headacheAura:", headacheAura.value);
    console.log("Sport:", sport.value);
    console.log("Nausea:", nausea.value);
    console.log("Puke:", puke.value);
    console.log("Light:", light.value);
    console.log("Sound:", sound.value);
    console.log("drugName:", drugName.value);
    console.log("drugMass:", drugMass.value);
    console.log("effect:", effect.value);

    console.groupEnd();
  }
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
          <div class="form-control" :class="{inValid : errors.name }">
            <label for="name">Как тебя зовут?</label>
            <input
              type="text"
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
            <input type="date" id="date" name="calendar" v-model="date" />
          </div>
        </li>
        <li>
          <div class="form-control">
            <label>Была ли у Вас сегодня головная боль (ГБ)?</label>
            <label for="yes"
              ><input
                type="radio"
                name="headacheCheck"
                v-model="headacheCheck"
                value="yes"
              />
              Да</label
            >
            <label for="no"
              ><input
                type="radio"
                name="headacheCheck"
                v-model="headacheCheck"
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
                type="radio"
                name="headacheAura"
                v-model="headacheAura"
                value="yes"
              />
              Да</label
            >
            <label for="no"
              ><input
                type="radio"
                name="headacheAura"
                v-model="headacheAura"
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
                type="checkbox"
                name="headacheWhere"
                v-model="where"
                value="one"
              />C одной стороны</label
            >

            <label for="two"
              ><input
                type="checkbox"
                name="headacheWhere"
                v-model="where"
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
                type="checkbox"
                name="headacheType"
                v-model="type"
                value="press"
              />Давящая</label
            >

            <label for="pulse"
              ><input
                type="checkbox"
                name="headacheType"
                v-model="type"
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
            <select id="strong" class="intensity-select" v-model="strong">
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
              ><input type="radio" name="sport" v-model="sport" value="yes" />
              Да</label
            >
            <label for="no"
              ><input
                type="radio"
                name="sport"
                v-model="sport"
                value="no"
              />Нет</label
            >
          </div>
        </li>
        <li>
          <div class="form-control">
            <label>Сопровождалась ли тошнотой?</label>
            <label for="yes"
              ><input type="radio" name="Nausea" v-model="nausea" value="yes" />
              Да</label
            >
            <label for="no"
              ><input
                type="radio"
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
              ><input type="radio" name="Puke" v-model="puke" value="yes" />
              Да</label
            >
            <label for="no"
              ><input
                type="radio"
                name="Puke"
                v-model="puke"
                value="no"
              />Нет</label
            >
          </div>
        </li>
        <li>
          <div class="form-control">
            <label>Раздражал ли свет?</label>
            <label for="yes"
              ><input type="radio" name="Light" v-model="light" value="yes" />
              Да</label
            >
            <label for="no"
              ><input
                type="radio"
                name="Light"
                v-model="light"
                value="no"
              />Нет</label
            >
          </div>
        </li>
        <li>
          <div class="form-control">
            <label>Раздражал ли звук?</label>
            <label for="yes"
              ><input type="radio" name="sound" v-model="sound" value="yes" />
              Да</label
            >
            <label for="no"
              ><input
                type="radio"
                name="sound"
                v-model="sound"
                value="no"
              />Нет</label
            >
          </div>
        </li>
        <li>
          <div class="form-control" >
            <div>
              <div class="form-drug">
                <div>
                  <label for="drug-name"> Какой препарат приняли?</label>
                  <input
                    type="text"
                    id="drug-name"
                    placeholder="Введите название препарата"
                    v-model.trim="drugName"
                  />
                </div>
                <div class="form-control" :class="{inValid : errors.drugMass }">
                  <label for="drug-mass"> Какая дозировка (мг) ?</label>
                  <input
                    type="text"
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
                      type="radio"
                      name="effect"
                      v-model="effect"
                      value="yes"
                    />
                    Да</label
                  >
                  <label for="no"
                    ><input
                      type="radio"
                      name="effect"
                      v-model="effect"
                      value="no"
                    />Нет</label
                  >
                </div>
              </div>
            </div>
          </div>
        </li>
      </ol>
      <button type="submit" class="btn">Отправить</button>
    </form>
  </div>
</template>

<style scoped>
.form-control small{
  color: red
}
.form-control.inValid input{
  border-color: red
}
</style>
