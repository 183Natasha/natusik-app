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
                    <div class="card-title">{{ point.title }}</div>
                </div>
                <!-- <img :src-'currentPoint.image'/> -->
                <div class="card-text">{{ point.text }}</div>
                <button @click="nextSlide">
                    {{ counter === 5 ? 'Завершить' : 'Далее' }}
                </button>
            </div>
        </template>
    </div>
</template>

<style scoped>
.welcomeCard__title{
    display: flex;
    gap: 20px
}
</style>