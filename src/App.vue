<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <DogsHeader />
  <router-view />
</template>

<script>
import DogsHeader from './components/DogsHeader.vue'
</script>
