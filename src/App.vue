<script setup lang="ts">
import {onMounted} from 'vue';
import {RouterLink, RouterView} from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import {getTopicsInfo} from './api/user';

onMounted(() => {
    // https://cnodejs.org/api/v1/get/topics
    // fetch('/api/topics')
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   fetch('/api/topic/61f69e4aa08b39f75309c2a8')
    //   .then(response => response.json())
    //   .then(data => console.log(data))

    // getTopicsInfo().then((data) => {
    //     console.log(data.data);
    // });
});
</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="60" />
    </header>
    <div class="wrapper">
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </nav>
    </div>

    <RouterView />
</template>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
    width:100%;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}
</style>
