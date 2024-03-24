<template>

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
  <div class="container2" v-if="!isLoading">
    <div class="button-container">
      <button @click="toggleSortOrder">
        <span :style="{ color: isAscending ? 'black' : 'lightgray' }">↑</span>
        <span :style="{ color: isAscending ? 'lightgray' : 'black' }">↓</span>
      </button>
      <button @click="toggleSubBreedSortOrder">
        <span :style="{ color: isSubBreedAscending ? 'black' : 'lightgray' }">↑</span>
        <span :style="{ color: isSubBreedAscending ? 'lightgray' : 'black' }">↓</span>
      </button>
    </div>
    <div class="list-container">
      <ul>
        <li v-for="(subBreeds, breed) in sortedBreeds" :key="breed">
          <router-link :to="`/dogs/${breed}`">{{ breed }}</router-link>
        </li>
      </ul>
      <ul class="subbreeds-list">
        <ul v-for="(subBreeds, breed) in sortedSubBreeds" :key="breed">
          <li v-for="subBreed in subBreeds" :key="subBreed">
            <router-link :to="`/dogs/${breed}/${subBreed}`">{{ breed }} - {{ subBreed }}</router-link>
          </li>
        </ul>
      </ul>
    </div> 
  </div>
  <div v-else>
    Cargando...
  </div>

</template>


<script>
import axios from 'axios'
import '@/assets/css/dogstyle.css'

export default {
  data() {
    return {
      breeds: {},
      isAscending: true,
      isSubBreedAscending: true,
      isLoading: true,
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
    },
    sortedSubBreeds() {
      const subBreedsArray = Object.entries(this.breedsWithSubBreeds)
      const sortedSubBreedsArray = subBreedsArray.sort((a, b) => {
        const subBreedA = a[0].toUpperCase()
        const subBreedB = b[0].toUpperCase()
        if (this.isSubBreedAscending) {
          return subBreedA < subBreedB ? -1 : subBreedA > subBreedB ? 1 : 0
        } else {
          return subBreedA > subBreedB ? -1 : subBreedA < subBreedB ? 1 : 0
        }
      })
      return Object.fromEntries(sortedSubBreedsArray)
    },
    breedsWithSubBreeds() {
      return Object.entries(this.breeds)
        .filter(([breed, subBreeds]) => subBreeds.length > 0)
        .reduce((obj, [breed, subBreeds]) => {
          obj[breed] = subBreeds;
          return obj;
        }, {});
    }
  },
  methods: {
    toggleSortOrder() {
      this.isAscending = !this.isAscending
    },
    toggleSubBreedSortOrder() {
      this.isSubBreedAscending = !this.isSubBreedAscending
    },
  },
  async created() {
    const response = await axios.get('https://dog.ceo/api/breeds/list/all')
    this.breeds = response.data.message
    
    this.isLoading = false
  }
 
}
</script>
