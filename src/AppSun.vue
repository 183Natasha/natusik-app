<script setup>
import { ref } from "vue";
import sunDark from "./assets/sunDark.svg";
import sunLight from "./assets/sunLight.svg";

const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add("dark-theme");
  } else {
    document.documentElement.classList.remove("dark-theme");
  }
};
</script>

<template>
  <div>
    <button @click="toggleTheme" class="theme-toggle">
      <img 
      class="sun"
        v-if="isDark" 
        :src="sunLight" 
        alt="Переключить на светлую тему" 
      />
      <img 
        v-else 
        class="sun"
        :src="sunDark" 
        alt="Переключить на темную тему" 
      />
    </button>
  </div>
</template>

<style scoped>
.theme-toggle {
  background: var(--sun);
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.theme-toggle:hover {
  background-color:   var(--sun-hover);
  transform: translateY(-2px);
}

.theme-toggle img {
  width: 32px;
  height: 32px;
  display: block;
}

/* Темная тема */
.dark-theme .theme-toggle:hover {
  box-shadow: 0 4px 8px var(--shadow)
}

.dark-theme .sun{
  filter: invert(1);
}

</style>