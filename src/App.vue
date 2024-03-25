<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <DogsHeader />
  <router-view />
  <DogsFooter />
</template>

<script>
import DogsHeader from './components/DogsHeader.vue'
import DogsFooter from './components/DogsFooter.vue'
</script>

<style src="@/assets/css/base.css"></style>