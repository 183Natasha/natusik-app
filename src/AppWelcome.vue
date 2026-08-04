<script setup>
import { ref } from 'vue'
import { welcomePoints } from './data/welcometype';

const counter = ref(1)
</script>

<template>
    <div class="welcomeCard">
        <template v-for="point in welcomePoints" :key="point.id">
            <div v-if="counter === point.id">
                <div class="welcomeCard__title">
                    <div class="card-number">{{ point.id }}</div>
                    <div class="card-title">{{ point.title }}</div>
                </div>
                <div class="card-text">{{ point.text }}</div>
                <button @click="counter++">
                    Далее
                </button>
            </div>
        </template>
    </div>
</template>

<style scoped></style>