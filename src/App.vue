<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <DogsHeader />
  <h1>Listado de razas y subrazas encontrados en la bd</h1>
  <div class="wrapper">
    <div class="container">
      <div>
        <p>Total de razas: {{ totalBreeds }} </p>
      </div>
      <div>
        <p>Total de subrazas: {{ totalSubBreeds }} </p>
      </div>
    </div>
  </div>
  <div class="container2">
    <button @click="toggleSortOrder">Cambiar orden</button>
    <ul>
      <li v-for="(subBreeds, breed) in sortedBreeds" :key="breed">
        {{ breed }}
        <span v-if="subBreeds.length > 0">
          subrazas: {{ subBreeds.join(', ') }}
        </span>
      </li>
    </ul>
  </div>
  <div>
    <select v-model="currentBreed">
      <option disabled value="">Selecciona una raza</option>
      <option v-for="breed in Object.keys(sortedBreeds)" :key="breed" :value="breed">{{ breed }}</option>
    </select>
  </div>
  <div class="container3">
    <div v-for="(subBreeds, breed) in images" :key="breed">
      <div v-if="currentBreed === breed">
        <h2>{{ breed }}</h2>
        <div v-for="(images, subBreed) in subBreeds" :key="subBreed">
          <h3 v-if="subBreed !== 'main'">{{ breed }} - {{ subBreed }}</h3>
          <div class="grid-container">
            <div class="grid-item" v-for="(image, index) in images" :key="index">
              <img :src="image" alt="" />
              <p>{{ breed }} {{ subBreed !== 'main' ? '- ' + subBreed : '' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import './assets/css/dogstyle.css'
import DogsHeader from './components/DogsHeader.vue'

export default {
  data() {
    return {
      breeds: {},
      images: {},
      isAscending: true,
      currentBreed: null
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
    },
    async fetchImages(breed, subBreed) {
      let url;
      if (subBreed) {
        url = `https://dog.ceo/api/breed/${breed}/${subBreed}/images`
      } else {
        url = `https://dog.ceo/api/breed/${breed}/images`
      }
      const response = await axios.get(url)
      this.images[breed] = this.images[breed] || {}
      this.images[breed][subBreed || 'main'] = response.data.message
    },
    async changeBreed() {

      const breed = this.currentBreed;

      if (this.breeds[breed].length > 0) {
        for (const subBreed of this.breeds[breed]) {
          await this.fetchImages(breed, subBreed)
        }
      } else {
        await this.fetchImages(breed)
      }
    }
  },
  watch: {
    currentBreed() {
      this.changeBreed()
    }
  },
  async created() {
    const response = await axios.get('https://dog.ceo/api/breeds/list/all')
    this.breeds = response.data.message

    for (const breed in this.breeds) {
      if (this.breeds[breed].length > 0) {
        for (const subBreed of this.breeds[breed]) {
          this.fetchImages(breed, subBreed)
        }
      } else {
        this.fetchImages(breed)
      }
    }
  }
 
}
</script>
