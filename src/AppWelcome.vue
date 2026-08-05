<script setup>
import { ref } from 'vue'
import { welcomePoints } from './data/welcometype';


const counter = ref(1)

const emit = defineEmits(['finish'])

function nextSlide() {
    if (counter.value < 5) {
        counter.value++
    } else {
        emit('finish')
    }
}
</script>

<template>
    <div class="welcomeCard">
        <template v-for="point in welcomePoints" :key="point.id">
            <div v-if="counter === point.id">
                <div class="welcomeCard__title">
                    <div class="card-number">{{ point.id }}</div>
                    <h3 class="card-title">{{ point.title }}</h3>
                </div>
                <div class="welcome__content">
                    <div class="left-panel">
                        <img class="welcome-image" :src='point.image' />
                    </div>

                    <div class="right-panel">
                        <div class="card-text" style="white-space: pre-line;">{{ point.text }}</div>
                        <div class="btn-container">
                            <button @click="nextSlide" class="btn">
                                {{ counter === 5 ? 'Завершить' : 'Далее' }}
                            </button>
                        </div>
                    </div>



                </div>


            </div>

        </template>
    </div>
</template>

<style scoped>
.welcomeCard__title {
    display: flex;
    gap: 20px;
    align-items: center;
}

/* .welcomeCard {
    height: 300px;
} */

.card-number {
    display: flex;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--light-pink);
    border: var(--pink-accent-1) 1px solid;
    justify-content: center;
    align-items: center;
}

.welcome__content {
    display: flex;
    gap: 20px;
}

.card-text {
    height: 250px;
    width: 600px;
    /* margin-left: 50px; */
}

.btn-container {
    display: flex;
    justify-self: center;
    margin: 50px 100px 0 0;
}



.left-panel {
    flex: 0 0 45%;
    max-width: 45%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 12px;
}

.welcome-image {
    width: 100%;
    height: 105%;
    object-fit: contain; /* Сохраняет пропорции */
    object-position: center;
}


/* .right-panel{
    width: 500px;
} */

/* .h2{} */
</style>