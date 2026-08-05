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
    font-size: 25px;

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
    font-size: 20px;
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


@media (max-width: 480px) {
    .welcomeCard {
        padding: 15px;
        margin: 10px;
        border-radius: 15px;
    }

    .welcomeCard__title {
        font-size: 18px;
        gap: 12px;
        margin-bottom: 20px;
    }

    .card-number {
        width: 28px;
        height: 28px;
        font-size: 14px;
    }

    .card-title {
        font-size: 18px;
    }

    .welcome__content {
        flex-direction: column;
        gap: 20px;
    }

    .left-panel {
        flex: none;
        max-width: 100%;
        width: 100%;
        height: 200px;
    }

    .right-panel {
        width: 100%;
    }

    .card-text {
        font-size: 14px;
        line-height: 1.6;
        min-height: 120px;
        padding: 5px 0;
        width: 300px;
    }

    .btn-container {
        justify-content: center;
        margin-top: 20px;
    }

    .btn {
        padding: 10px 30px;
        font-size: 14px;
        width: 100%;
        max-width: 280px;
    }
}


@media (min-width: 481px) and (max-width: 768px) {
    .welcomeCard {
        padding: 25px;
        margin: 15px;
    }

    .welcomeCard__title {
        font-size: 22px;
        gap: 15px;
        margin-bottom: 25px;
    }

    .card-number {
        width: 30px;
        height: 30px;
        font-size: 16px;
    }

    .card-title {
        font-size: 22px;
    }

    .welcome__content {
        flex-direction: column;
        gap: 25px;
    }

    .left-panel {
        flex: none;
        max-width: 100%;
        width: 100%;
        height: 250px;
    }

    .right-panel {
        width: 100%;
    }

    .card-text {
        font-size: 18px;
        line-height: 1.7;
        min-height: 100px;
        width: 400px;
    }

    .btn-container {
        justify-content: center;
        margin-top: 25px;
    }

    .btn {
        padding: 12px 35px;
        font-size: 16px;
    }
}


@media (min-width: 769px) and (max-width: 1024px) {
    .welcomeCard {
        padding: 30px;
        margin: 20px auto;
        max-width: 90%;
    }

    .welcomeCard__title {
        font-size: 24px;
        gap: 18px;
        margin-bottom: 28px;
    }

    .card-number {
        width: 32px;
        height: 32px;
        font-size: 17px;
    }

    .card-title {
        font-size: 24px;
    }

    .welcome__content {
        gap: 25px;
    }

    .left-panel {
        flex: 0 0 40%;
        max-width: 40%;
        height: 300px;
    }

    .right-panel {
        flex: 1;
    }

    .card-text {
        font-size: 19px;
        line-height: 1.8;
        min-height: 150px;
        width: 400px;
    }

    .btn-container {
        justify-content: flex-end;
        margin-top: 30px;
    }

    .btn {
        padding: 12px 35px;
        font-size: 16px;
    }
}

</style>