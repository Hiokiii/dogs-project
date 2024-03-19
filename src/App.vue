<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <DogsHeader />
  <h1>Listado de razas y subrazas encontrados en la bd</h1>
  <button @click="toggleSortOrder">Cambiar orden</button>
  <div class="container">
    <div>
      <p>Total de razas: {{ totalBreeds }} </p>
    </div>
    <div>
      <p>Total de subrazas: {{ totalSubBreeds }} </p>
    </div>
  </div>
  <ul>
    <li v-for="(subBreeds, breed) in sortedBreeds" :key="breed">
      {{ breed }}
      <span v-if="subBreeds.length > 0">
        subrazas: {{ subBreeds.join(', ') }}
      </span>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'
import './assets/css/dogstyle.css'
import DogsHeader from './components/DogsHeader.vue'

export default {
  data() {
    return {
      breeds: {},
      isAscending: true
    }
  },
  computed: {
    totalBreeds() {
      return Object.keys(this.breeds).length
    },
    totalSubBreeds() {
      return Object.values(this.breeds).reduce((total, subBreeds) => total + subBreeds.length, 0)
    },
    sortedBreeds() {
      const breedsArray = Object.entries(this.breeds)
      const sortedBreedsArray = breedsArray.sort((a, b) => {
        const breedA = a[0].toUpperCase()
        const breedB = b[0].toUpperCase()
        if (this.isAscending) {
          return breedA < breedB ? -1 : breedA > breedB ? 1 : 0
        } else {
          return breedA > breedB ? -1 : breedA < breedB ? 1 : 0
        }
      })
      return Object.fromEntries(sortedBreedsArray)
    }
  },
  methods: {
    toggleSortOrder() {
      this.isAscending = !this.isAscending
    }
  },
  async created() {
    const response = await axios.get('https://dog.ceo/api/breeds/list/all')
    this.breeds = response.data.message
  }
}
</script>

./components/DogsHeader.vue
