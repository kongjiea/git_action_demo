<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue';
// const logoUrl = new URL('../assets/image.png', import.meta.url).href;
</script>

<template>
    <main>
        <TheWelcome />
        111
        <div>
          <img width="500" src="../assets/image.png" alt="Logo" />
        </div>
        <!-- <img width="500" :src="logoUrl" alt="Logo"> -->
        <!-- <img width="500" src="/image.png" alt="Logo"> -->
    </main>
</template>
