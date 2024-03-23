<template>
    <div>
      <button @click="getRandomDog">Obtener raza al azar</button>
      <div v-if="dog">
        <h2>{{ dog.breed }} {{ dog.subBreed ? '- ' + dog.subBreed : '' }}</h2>
        <img :src="dog.image" alt="" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        dog: null
      }
    },
    methods: {
      async getRandomDog() {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random')
        const imageUrl = response.data.message
        const parts = imageUrl.split('/')
        const breedPart = parts[parts.length - 2]
        const [breed, subBreed] = breedPart.split('-').reverse()
        this.dog = {
          breed,
          subBreed,
          image: imageUrl
        }
      }
    }
  }
  </script>